import { ScrapingController } from '../controllers/scrapingController.js';
import { Scraper } from '../interfaces/scraper.js';
import { AmazonScraper } from '../scrapers/amazonScraper.js';
import { MagazineLuizaScraper } from '../scrapers/magazineLuizaScraper.js';
import { ShopeeScraper } from '../scrapers/shopeeScraper.js';
import { ScrapingService } from '../services/scrapingService.js';

export const scrapers: Scraper[] = [
	new AmazonScraper(),
	new MagazineLuizaScraper(),
	new ShopeeScraper(),
];

export const scrapingFactory = {
	async initialize(): Promise<ScrapingController> {
		return ScrapingController.initialize({
			service: new ScrapingService({
				scrapers,
			}),
		});
	},
};
