import { Page, Locator, expect } from '@playwright/test';
import { Product , productMap } from '../types/Product';

export class CartPage{
    readonly page: Page;
    readonly title: Locator;
    readonly product1: Locator;
    readonly product2: Locator;
    readonly product3: Locator;
    readonly cartTotal: Locator;
    readonly emptyMsg: Locator;

    constructor(page:Page){
        this.page = page;
        this.title = this.page.getByTestId('cart-title')
        this.product1 = this.page.getByText('iPhone');
        this.product2 = this.page.getByText('MacBook');
        this.product3 = this.page.getByText('AirPods');
        this.cartTotal = this.page.getByTestId('total-price');
        this.emptyMsg = this.page.getByTestId('empty-cart');
    }

    // ページを開く
    async open(){
        await this.page.goto('/');
    }

    // +(追加)ボタン押下
    async increaseProduct( product : Product ){
        await this.page.getByTestId(`increase-${ productMap[product] }`).click();
    }

    // -(削減)ボタン押下
    async decreaseProduct( product : Product ){
        await this.page.getByTestId(`decrease-${ productMap[product] }`).click();
    }

    // remove(削除)ボタン押下
    async removeProduct( product : Product ){
        await this.page.getByTestId(`remove-${ productMap[product] }`).click();
    }

    // cart-itemの取得
    async getCartItem(product : Product){
        return this.page.getByTestId(`cart-item-${productMap[product]}`);
    }

    // cart-itemのアサート
    async expectCartItem( product : Product ,quantity : number ,price : number){
        const text = await this.getCartItem(product);
        await expect(text).toContainText(`${product}× ${quantity}¥${price}`);
    };
}