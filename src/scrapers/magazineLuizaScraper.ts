import { StoresUrls } from '../constants/storesUrls.js';
import { Product } from '../dtos/product.js';
import { Scraper } from '../interfaces/scraper.js';

export class MagazineLuizaScraper implements Scraper {
	readonly baseUrl = StoresUrls.MAGAZINE_LUIZA;

	async searchProduct(product: Product): Promise<Product> {
		product.name;
		return {
			name: 'Teclado Mecânico Preto RGB Retroiluminado 2',
			price: 289.09,
			storeBaseURL: this.baseUrl,
		};
	}
}
