import { ScrapingController } from '../controllers/scrapingController.ts';
import { ScrapingService } from '../services/scrapingService.ts';

export const scrapingFactory = {
	async initialize(): Promise<ScrapingController> {
		return ScrapingController.initialize({
			service: new ScrapingService(),
		});
	},
};
