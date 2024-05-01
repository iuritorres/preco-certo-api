import { Router } from 'express';
import { scrapingFactory } from '../factories/scrapingFactory.js';

const controller = await scrapingFactory.initialize();
export const scrapingRouter = Router();

scrapingRouter.post(
	'/search-product',
	controller.searchProduct.bind(controller),
);
