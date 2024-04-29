import { Router } from 'express';
import { productScrapingFactory } from '../factories/ProductScrapingFactory.js';

const controller = await productScrapingFactory.initialize();
export const scrapingRouter = Router();

scrapingRouter.get('/hello', controller.helloWorld.bind(controller));
