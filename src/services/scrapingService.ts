import { Product } from '../dtos/product.js';
import { Scraper, ScrapingServiceInterface } from '../interfaces/scraper.js';

export class ScrapingService implements ScrapingServiceInterface {
	readonly scrapers: Scraper[];

	constructor({ scrapers }: { readonly scrapers: Scraper[] }) {
		this.scrapers = scrapers;
	}

	async searchProduct(productData: { name: string }): Promise<Array<Product>> {
		try {
			const products: Product[] = await Promise.all(
				this.scrapers.map(
					async (scraper) => await scraper.searchProduct(productData),
				),
			);

			const notNullProducts = products.filter((product) => product !== null);
			return notNullProducts;
		} catch (error) {
			console.error('Erro ao buscar produtos.');
			throw error;
		}
	}
}
