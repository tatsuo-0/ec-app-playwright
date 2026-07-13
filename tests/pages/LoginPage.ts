import { Page, Locator } from '@playwright/test';
import { ProductsPage } from './ProductsPage';

export class LoginPage{
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.email = this.page.getByTestId('email')
        this.password = this.page.getByTestId('password')
        this.loginButton = this.page.getByTestId('login-button');
       }

    // ページを開く
    async open(){
        await this.page.goto('/');
    }

    // ログイン処理
    async login( email : string , password : string ){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
        return new ProductsPage(this.page);
    }

}