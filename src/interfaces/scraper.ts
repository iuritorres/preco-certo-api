import { Product } from '../dtos/product.js';
import { ScrapingService } from '../services/scrapingService.js';

export interface Scraper {
	readonly baseUrl: string;
	searchProduct: (productData: { name: string }) => Promise<Product>;
}

export interface ScrapingControllerInterface {
	service: ScrapingService;
}

export interface ScrapingServiceInterface {
	readonly scrapers: Scraper[];
}
