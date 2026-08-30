import type { IProductUser, IVariant } from "./products";

export default interface ICart {
	_id: string; // Unique identifier for the cart
	cartId: string; // Unique identifier for the cart
	products: ICartProduct[]; // Array of products in the cart
	orderPlaced: boolean; // Whether the order has been placed
}

export interface ICartProduct {
	_id?: string; // Unique identifier for the cart product
	productId: string | IProductUser; // Identifier for the product in the cart
	quantity: number; // Quantity of the product in the cart
	variant: string | IVariant; // Variant details of the product in the cart
	size: string; // Size of the product in the cart
}
