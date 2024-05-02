import { StoresUrls } from '../constants/storesUrls.js';
import { Product } from '../dtos/product.js';
import { Scraper } from '../interfaces/scraper.js';

export class AmazonScraper implements Scraper {
	readonly baseUrl = StoresUrls.AMAZON;

	async searchProduct(productData: { name: string }): Promise<Product> {
		productData.name;
		return null;
	}
}
