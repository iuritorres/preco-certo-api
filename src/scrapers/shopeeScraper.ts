import { StoresUrls } from '../constants/storesUrls.js';
import { Product } from '../dtos/product.js';
import { Scraper } from '../interfaces/scraper.js';

export class ShopeeScraper implements Scraper {
	readonly baseUrl = StoresUrls.SHOPEE;

	async searchProduct(product: Product): Promise<Product> {
		product.name;
		return null;
	}
}
