import { StoresUrls } from '../constants/storesUrls.js';
import { Product } from '../dtos/product.js';
import { Scraper } from '../interfaces/scraper.js';

export class AmazonScraper implements Scraper {
	readonly baseUrl = StoresUrls.AMAZON;

	async searchProduct(product: Product): Promise<Product> {
		product.name;

		return {
			name: 'Teclado Mecânico Preto RGB Retroiluminado',
			price: 250.09,
			storeBaseURL: this.baseUrl,
		};
	}
}
