import { Request, Response } from 'express';
import { ProductScrapingService } from '../services/ProductScrapingService.js';

interface ProductScrapingControllerInterface {
	service: ProductScrapingService;
}

export class ProductScrapingController
	implements ProductScrapingControllerInterface
{
	service: ProductScrapingService;

	constructor({ service }: { service: ProductScrapingService }) {
		this.service = service;
	}

	async helloWorld(_: Request, response: Response) {
		try {
			const helloMessage = await this.service.hello();

			response.status(200).json({ message: helloMessage });
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Internal Server Error' });
		}
	}

	// initialize
	static async initialize(
		dependencies: any,
	): Promise<ProductScrapingController> {
		const controller = new ProductScrapingController(dependencies);
		return controller;
	}
}
