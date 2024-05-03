import { Request, Response } from 'express';
import { ScrapingControllerInterface } from '../interfaces/scraper.js';
import { ScrapingService } from '../services/scrapingService.js';

export class ScrapingController implements ScrapingControllerInterface {
	service: ScrapingService;

	constructor({ service }: { service: ScrapingService }) {
		this.service = service;
	}

	async searchProduct(request: Request, response: Response): Promise<void> {
		const productData = request.body;

		try {
			const returnedProducts = await this.service.searchProduct(productData);

			response.status(200).json({ products: returnedProducts });
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Internal Server Error' });
		}
	}

	// initialize
	static async initialize(dependencies: {
		service: ScrapingService;
	}): Promise<ScrapingController> {
		const controller = new ScrapingController(dependencies);
		return controller;
	}
}
