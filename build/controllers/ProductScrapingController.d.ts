import { Request, Response } from 'express';
import { ProductScrapingService } from '../services/ProductScrapingService.js';
interface ProductScrapingControllerInterface {
    service: ProductScrapingService;
}
export declare class ProductScrapingController implements ProductScrapingControllerInterface {
    service: ProductScrapingService;
    constructor({ service }: {
        service: ProductScrapingService;
    });
    helloWorld(_: Request, response: Response): Promise<void>;
    static initialize(dependencies: any): Promise<ProductScrapingController>;
}
export {};
