import { test, expect } from '@playwright/test';
import { Header } from './pages/Header';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';


test.describe('Cart追加機能', () => {

  test('商品を追加できること（iPhone）', async ({ page }) => {
    const header = new Header(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await page.getByTestId('password').fill('aaa');
    await page.getByTestId('login-button').click();
    await expect(productsPage.title).toBeVisible();

    await test.step('カートの空確認' , async() => {
      await header.goToCart();
      await expect(cartPage.emptyMsg).toBeVisible();
      await header.goToProducts();
      await expect(productsPage.title).toBeVisible();
    });

    await test.step('追加ボタン押下' , async() => {
      await productsPage.addProduct('iPhone');
    });

    await test.step('追加のメッセージが出ること' , async() => {
      await expect(productsPage.addMsg1).toBeVisible();
    });
    
    await test.step('追加メッセージが消えること', async () => {
      await expect(productsPage.addMsg1).not.toBeVisible({ timeout: 3000 });
    });

    await test.step('Cart画面へ遷移' , async() => {
      await productsPage.goToCart(1);
      await expect(cartPage.title).toBeVisible();
    });
    await test.step('カートに商品（iPhone）が表示されていること' , async() => {
      await expect(cartPage.product1).toBeVisible();
    });
  });

  test('商品を追加できること（MacBook）', async ({ page }) => {
    const header = new Header(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await page.getByTestId('password').fill('aaa');
    await page.getByTestId('login-button').click();
    await expect(productsPage.title).toBeVisible();

    await test.step('カートの空確認' , async() => {
      await header.goToCart();
      await expect(cartPage.emptyMsg).toBeVisible();
      await header.goToProducts();
      await expect(productsPage.title).toBeVisible();
    });
    await test.step('追加ボタン押下' , async() => {
      await productsPage.addProduct('MacBook');
    });
    await test.step('追加のメッセージが出ること' , async() => {
      await expect(productsPage.addMsg2).toBeVisible();
    });
    await test.step('追加メッセージが消えること', async () => {
      await expect(productsPage.addMsg2).not.toBeVisible({ timeout: 3000 });
    });
    await test.step('Cart画面へ遷移' , async() => {
      await productsPage.goToCart(2);
      await expect(cartPage.title).toBeVisible();
    });
    await test.step('カートに商品（MacBook）が表示されていること' , async() => {
      await expect(cartPage.product2).toBeVisible();
    });
  });

  test('商品を追加できること（AirPods）', async ({ page }) => {
    const header = new Header(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await page.getByTestId('password').fill('aaa');
    await page.getByTestId('login-button').click();
    await expect(productsPage.title).toBeVisible();

    await test.step('カートの空確認' , async() => {
      await header.goToCart();
      await expect(cartPage.emptyMsg).toBeVisible();
      await header.goToProducts();
      await expect(productsPage.title).toBeVisible();
    });
    await test.step('追加ボタン押下' , async() => {
      await productsPage.addProduct('AirPods');
    });
    await test.step('追加のメッセージが出ること' , async() => {
      await expect(productsPage.addMsg3).toBeVisible();
    });
    await test.step('追加メッセージが消えること', async () => {
      await expect(productsPage.addMsg3).not.toBeVisible({ timeout: 3000 });
    });
    await test.step('Cart画面へ遷移' , async() => {
      await productsPage.goToCart(3);
      await expect(cartPage.title).toBeVisible();
    });
    await test.step('カートに商品（AirPods）が表示されていること' , async() => {
      await expect(cartPage.product3).toBeVisible();
    });
  });

  test('同一商品を追加できること', async ({ page }) => {
    const header = new Header(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await page.getByTestId('password').fill('aaa');
    await page.getByTestId('login-button').click();
    await expect(productsPage.title).toBeVisible();

    await test.step('カートの空確認' , async() => {
      await header.goToCart();
      await expect(cartPage.emptyMsg).toBeVisible();
      await header.goToProducts();
      await expect(productsPage.title).toBeVisible();
    });
    await test.step('追加ボタン押下（iPhone）' , async() => {
      await productsPage.addProduct('iPhone');
      await productsPage.addProduct('iPhone');
      await expect(productsPage.addMsg1).toBeVisible();
    });
    await test.step('追加ボタン押下（MacBook）' , async() => {
      await productsPage.addProduct('MacBook');
      await productsPage.addProduct('MacBook');
      await productsPage.addProduct('MacBook');
      await expect(productsPage.addMsg2).toBeVisible();
    });
    await test.step('追加ボタン押下（AirPods）' , async() => {
      await productsPage.addProduct('AirPods');
      await productsPage.addProduct('AirPods');
      await productsPage.addProduct('AirPods');
      await productsPage.addProduct('AirPods');
      await expect(productsPage.addMsg3).toBeVisible();
    });
    await test.step('Cart画面へ遷移' , async() => {
      await header.goToCart();
      await expect(cartPage.title).toBeVisible();
    });
    await test.step('Cartに反映されていること' , async() => {
      await cartPage.expectCartItem( 'iPhone', 2,240000);
      await cartPage.expectCartItem( 'MacBook', 3,720000);
      await cartPage.expectCartItem( 'AirPods', 4,120000);
      await expect(cartPage.cartTotal).toContainText('Total: ¥1080000');
    });
  });
});