import { test, expect } from './fixtures/auth.fixture';
import { Header } from './pages/Header';
import { CartPage } from './pages/CartPage';

test.describe('Cart増減機能', () => {

  test('商品の量を変更できること', async ({ page, productsPage }) => {
    const header = new Header(page);
    const cartPage = new CartPage(page);
    
    await expect(productsPage.title).toBeVisible();

    await test.step('カートの空確認' , async() => {
      await header.goToCart();
      await expect(cartPage.emptyMsg).toBeVisible();
      await header.goToProducts();
      await expect(productsPage.title).toBeVisible();
    });

    await test.step('追加ボタン押下' , async() => {
      await productsPage.addProduct('iPhone');
      await productsPage.addProduct('MacBook');
      await productsPage.addProduct('AirPods');
    });

    await test.step('Cart画面へ遷移' , async() => {
      await header.goToCart();
      await expect(cartPage.title).toBeVisible();
    });
    
    await test.step('商品を増やせること' , async() => {
      await expect(cartPage.cartTotal).toContainText('Total: ¥390000');
      await cartPage.increaseProduct('iPhone');
      await cartPage.expectCartItem( 'iPhone', 2,240000);
      await cartPage.increaseProduct('MacBook');
      await cartPage.expectCartItem( 'MacBook', 2,480000);
      await cartPage.increaseProduct('AirPods');
      await cartPage.expectCartItem( 'AirPods', 2,60000);
      await expect(cartPage.cartTotal).toContainText('Total: ¥780000');
    });

    await test.step('商品を減らせること' , async() => {
      await expect(cartPage.cartTotal).toContainText('Total: ¥780000');
      await cartPage.decreaseProduct('iPhone');
      await cartPage.expectCartItem( 'iPhone', 1,120000);
      await cartPage.decreaseProduct('MacBook');
      await cartPage.expectCartItem( 'MacBook', 1,240000);
      await cartPage.decreaseProduct('AirPods');
      await cartPage.expectCartItem( 'AirPods', 1,30000);
      await expect(cartPage.cartTotal).toContainText('Total: ¥390000');
    });

    await test.step('商品を削除できること' , async() => {
      await expect(cartPage.cartTotal).toContainText('Total: ¥390000');
      await cartPage.decreaseProduct('iPhone');
      await expect(await cartPage.getCartItem('iPhone')).not.toBeVisible();
      await cartPage.decreaseProduct('MacBook');
      await expect(await cartPage.getCartItem('MacBook')).not.toBeVisible();
      await cartPage.decreaseProduct('AirPods');
      await expect(await cartPage.getCartItem('AirPods')).not.toBeVisible();
      await expect(cartPage.emptyMsg).toBeVisible();
    });
  });
});