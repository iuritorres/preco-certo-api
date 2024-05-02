export interface Product {
	name: string;
	price: number;
	url: string;
	rating: {
		count: number;
		score: number;
	};
}
