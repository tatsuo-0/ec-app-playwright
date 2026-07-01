import { Page, Locator } from '@playwright/test';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';

export class Header{
    readonly page: Page;
    readonly shopButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
    readonly logoutButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.shopButton = this.page.getByRole('navigation').getByRole('link', { name: 'Shop' });
        this.productsButton = this.page.getByRole('navigation').getByRole('link', { name: 'Products' });
        this.cartButton = this.page.getByRole('navigation').getByRole('link', { name: 'Cart' });
        this.logoutButton = this.page.getByRole('navigation').getByRole('link', { name: 'Logout' });
    }

    // shopボタンの押下
    async goToTop(){
        await this.shopButton.click();
        return new ProductsPage(this.page);
    }

    // productsボタンの押下
    async goToProducts(){
        await this.productsButton.click();
        return new ProductsPage(this.page);
    }

    // cartボタンの押下
    async goToCart(){
        await this.cartButton.click();
        return new CartPage(this.page);
    }

    // logoutボタンの押下
    async goToLogout(){
        return await this.logoutButton.click();
    }
}