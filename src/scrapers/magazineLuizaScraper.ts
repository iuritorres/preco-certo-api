import { StoresUrls } from '../constants/storesUrls.js';
import { Product } from '../dtos/product.js';
import { Scraper } from '../interfaces/scraper.js';

export class MagazineLuizaScraper implements Scraper {
	readonly baseUrl = StoresUrls.MAGAZINE_LUIZA;

	async searchProduct(productData: { name: string }): Promise<Product> {
		try {
			const token = await this.#getRequestData();
			const productName = this.#formatProductName(productData.name);
			const requestURL = `${this.baseUrl}/_next/data/${token}/busca/${productName}.json?path1=${productName}`;

			const response = await fetch(requestURL, {
				method: 'GET',
				headers: {
					Accept: '*/*',
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

	async #getRequestData(): Promise<string> {
		const html = await this.#getStoreHTML();

		const tokenLength = 21;
		const indexOfScriptEnd = html.indexOf('/_buildManifest.js', 15000);

		const scriptContent = html.substring(
			indexOfScriptEnd - tokenLength,
			indexOfScriptEnd,
		);

		return scriptContent;
	}

	async #getStoreHTML(): Promise<string> {
		const response = await fetch(this.baseUrl);

		if (!response.ok) {
			throw new Error(`Erro ao fazer requisição para ${this.baseUrl}`);
		}

		return await response.text();
	}

	#formatProductName(productName: string): string {
		return productName
			.toLowerCase()
			.replace('/', '')
			.replace('\\', '')
			.replace('-', '')
			.replace('_', '')
			.replaceAll(' ', '%2B');
	}
}
