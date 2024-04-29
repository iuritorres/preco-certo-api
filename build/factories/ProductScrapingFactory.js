import { ProductScrapingController } from '../controllers/ProductScrapingController.js';
import { ProductScrapingService } from '../services/ProductScrapingService.js';
export const productScrapingFactory = {
    async initialize() {
        return ProductScrapingController.initialize({
            service: new ProductScrapingService(),
        });
    },
};