import { Page, Locator } from '@playwright/test';
import { CartPage } from './CartPage';
import { Product , productMap } from '../types/Product';

export class ProductsPage{
    readonly page: Page;
    readonly title: Locator;
    readonly addMsg1: Locator;
    readonly addMsg2: Locator;
    readonly addMsg3: Locator;

    constructor(page:Page){
        this.page = page;
        this.title = this.page.getByTestId('page-title')
        this.addMsg1 = this.page.getByText('iPhone をカートに追加しました！');
        this.addMsg2 = this.page.getByText('Macbook をカートに追加しました！');
        this.addMsg3 = this.page.getByText('AirPods をカートに追加しました！');
    }

    // ページを開く
    async open(){
        await this.page.goto('/');
    }

    // 引数で渡された商品追加
    async addProduct( product : Product ){
        await this.page.getByTestId(`add-cart-${productMap[product]}`).click();
    }

    // Cart画面への遷移
    async goToCart( productId : number ){
        await this.page.getByTestId(`product-${ productId }`).getByTestId('cart-link').click();
        return new CartPage(this.page);
    }
}