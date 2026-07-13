import { test, expect } from './fixtures/auth.fixture';
import { Header } from './pages/Header';
import { CartPage } from './pages/CartPage';

test.describe('Cart削除機能', () => {

  test('商品を増やせること', async ({ page, productsPage }) => {
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
    
    await test.step('商品を削除できること' , async() => {
      await expect(cartPage.cartTotal).toContainText('Total: ¥390000');
      await cartPage.removeProduct('iPhone');
      await expect(await cartPage.getCartItem('iPhone')).not.toBeVisible();
      await cartPage.removeProduct('MacBook');
      await expect(await cartPage.getCartItem('MacBook')).not.toBeVisible();
      await cartPage.removeProduct('AirPods');
      await expect(await cartPage.getCartItem('AirPods')).not.toBeVisible();
      await expect(cartPage.emptyMsg).toBeVisible();
    });
  });
});