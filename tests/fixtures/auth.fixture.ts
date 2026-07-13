import { test as base} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

type Fixtures = {
    productsPage : ProductsPage;
};

export const test = base.extend<Fixtures>({
    productsPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        const productsPage = await loginPage.login('ShopMail@test.com','ShopPass');
        await use(productsPage);
        console.log('test終了')
    },
})
export { expect } from '@playwright/test';