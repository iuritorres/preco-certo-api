export class ProductScrapingController {
    service;
    constructor({ service }) {
        this.service = service;
    }
    async helloWorld(_, response) {
        try {
            const helloMessage = await this.service.hello();
            response.status(200).json({ message: helloMessage });
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
    // initialize
    static async initialize(dependencies) {
        const controller = new ProductScrapingController(dependencies);
        return controller;
    }
}
