import puppeteer, { ElementHandle } from 'puppeteer';
import { StoresUrls } from '../constants/storesUrls.js';
import { Product } from '../dtos/product.js';
import { Scraper } from '../interfaces/scraper.js';

export class MagazineLuizaScraper implements Scraper {
	readonly baseUrl = StoresUrls.MAGAZINE_LUIZA;

	async searchProduct(productData: { name: string }): Promise<Product> {
		// Setup Browser
		const browser = await puppeteer.launch({
			headless: true,
		});

		try {
			const page = await browser.newPage();
			await page.goto(this.baseUrl);
			await page.setViewport({ width: 1080, height: 1024 });

			await page.type('#input-search', productData.name);
			const searchButton = await page.$('svg[data-testid="search-submit"]');

			if (!searchButton) return;
			searchButton.click();
			await page.waitForSelector('span[title="Resultados para "]');

			// Getting Data
			const productNameUnknown = await page
				.$('h2[data-testid="product-title"]')
				.then(async (element: ElementHandle) =>
					(await element.getProperty('innerText')).jsonValue(),
				);

			const productPriceUnknown = await page
				.$(
					'a[data-testid="product-card-container"] p[data-testid="price-value"]',
				)
				.then(async (element: ElementHandle) =>
					(await element.getProperty('innerText')).jsonValue(),
				);

			const productName = productNameUnknown.toString();
			const productPrice = parseFloat(
				(productPriceUnknown as string)
					.replace('R$', '')
					.replace('.', '')
					.replace(',', '.'),
			);

			return {
				name: productName,
				price: productPrice,
				storeBaseURL: this.baseUrl,
			};
		} catch (error) {
			console.log(`Erro ao acessar o site ${this.baseUrl}`);
			throw error;
		} finally {
			await browser.close();
		}
	}
}
