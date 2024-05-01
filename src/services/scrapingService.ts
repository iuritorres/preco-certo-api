import { Product } from '../dtos/product.js';
import { Scraper, ScrapingServiceInterface } from '../interfaces/scraper.js';

export class ScrapingService implements ScrapingServiceInterface {
	readonly scrapers: Scraper[];

	constructor({ scrapers }: { readonly scrapers: Scraper[] }) {
		this.scrapers = scrapers;
	}

	async searchProduct(product: Product): Promise<Array<Product>> {
		const products: Product[] = [];

		this.scrapers.forEach(async (scraper) => {
			const returnedProduct = await scraper.searchProduct(product);

			if (returnedProduct) products.push(returnedProduct);
		});

		return products;
	}
}
