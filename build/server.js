import express, { Router } from 'express';
import { scrapingRouter } from './routes/scraping.js';
export const server = express();
server.use(express.json());
// Routers
const mainRouter = Router();
server.use('/api', mainRouter);
mainRouter.use('/scraping', scrapingRouter);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server started! Listening on PORT: ${port}.`);
});
