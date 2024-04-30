import { Request, Response } from 'express';
import { ScrapingService } from '../services/scrapingService.ts';

interface ScrapingControllerInterface {
	service: ScrapingService;
}

export class ScrapingController implements ScrapingControllerInterface {
	service: ScrapingService;

	constructor({ service }: { service: ScrapingService }) {
		this.service = service;
	}

	async helloWorld(_: Request, response: Response): Promise<void> {
		try {
			const helloMessage = await this.service.hello();

			response.status(200).json({ message: helloMessage });
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
