import { StoresUrls } from '../constants/storesUrls.js';
import { Product } from '../dtos/product.js';
import { Scraper } from '../interfaces/scraper.js';

export class MagazineLuizaScraper implements Scraper {
	readonly baseUrl = StoresUrls.MAGAZINE_LUIZA;

	// Scraping Method
	// async searchProduct(productData: { name: string }): Promise<Product> {
	// 	// Setup Browser
	// 	const browser = await puppeteer.launch({
	// 		headless: true,
	// 	});

	// 	try {
	// 		const page = await browser.newPage();
	// 		await page.goto(this.baseUrl);
	// 		await page.setViewport({ width: 1080, height: 1024 });

	// 		await page.type('#input-search', productData.name);
	// 		const searchButton = await page.$('svg[data-testid="search-submit"]');

	// 		if (!searchButton) return;
	// 		searchButton.click();
	// 		await page.waitForSelector('span[title="Resultados para "]');

	// 		// Getting Data
	// 		const productNameUnknown = await page
	// 			.$('h2[data-testid="product-title"]')
	// 			.then(async (element: ElementHandle) =>
	// 				(await element.getProperty('innerText')).jsonValue(),
	// 			);

	// 		const productPriceUnknown = await page
	// 			.$(
	// 				'a[data-testid="product-card-container"] p[data-testid="price-value"]',
	// 			)
	// 			.then(async (element: ElementHandle) =>
	// 				(await element.getProperty('innerText')).jsonValue(),
	// 			);

	// 		const productName = productNameUnknown.toString();
	// 		const productPrice = parseFloat(
	// 			(productPriceUnknown as string)
	// 				.replace('R$', '')
	// 				.replace('.', '')
	// 				.replace(',', '.'),
	// 		);

	// 		const product: Product = {
	// 			name: productName,
	// 			price: productPrice,
	// 			url: `${this.baseUrl}`,
	// 			rating: {
	// 				count: 42,
	// 				score: 4.8,
	// 			},
	// 		};

	// 		return product;
	// 	} catch (error) {
	// 		console.log(`Erro ao acessar o site ${this.baseUrl}`);
	// 		throw error;
	// 	} finally {
	// 		await browser.close();
	// 	}
	// }

	// Direct Request Method
	async searchProduct(productData: { name: string }): Promise<Product> {
		try {
			const formattedProductName = productData.name
				.toLowerCase()
				.replace('/', '')
				.replace('\\', '')
				.replace('-', '')
				.replace('_', '')
				.replaceAll(' ', '%2B');

			const requestURL = `${this.baseUrl}/_next/data/acHHjHhw1lbQAs_d190V1/busca/${formattedProductName}.json?path1=${formattedProductName}`;
			const cookieHeader =
				'FCCDCF=1; FCNEC=1; MLPARCEIRO=0; mixer_hub_shipping=true; mixer_shipping=AUTO; ml2_redirect_8020=0; noe_freight=AUTO; noe_hub_shipping_enabled=1; toggle_ads=true; toggle_agatha=true; toggle_new_service_page=true; toggle_pdp_seller_score=true; toggle_search_ads=true; toggle_vwo=true; toggle_wishlist=false; __uzma=a06fa7ad-0a61-4d3e-843e-4b3aed259db5; __uzmb=1714683493; __uzmc=675681942700; __uzmd=1714684882; __uzme=1999';

			const response = await fetch(requestURL, {
				method: 'GET',
				headers: {
					Accept: '*/*',
					Cookie: cookieHeader,
					Connection: 'keep-alive',
					'Accept-Encoding': 'gzip, deflate, br',
				},
			}).then((result) => result.json());

			const firstProductResult = response.pageProps.data.search.products[0];

			const product: Product = {
				name: firstProductResult.title,
				price: parseFloat(firstProductResult.price.bestPrice),
				url: `https://www.magazinevoce.com.br/magazineextprecocerto/${firstProductResult.path}`,
				rating: {
					count: firstProductResult.rating.count,
					score: firstProductResult.rating.score,
				},
			};

			return product;
		} catch (error) {
			console.error(`Erro ao fazer requisição para ${this.baseUrl}`);
			throw error;
		}
	}
}
