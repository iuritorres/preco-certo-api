import { Router } from 'express';
import { scrapingFactory } from '../factories/scrapingFactory.ts';

const controller = await scrapingFactory.initialize();
export const scrapingRouter = Router();

scrapingRouter.get('/hello', controller.helloWorld.bind(controller));
