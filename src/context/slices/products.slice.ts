import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type IProductAdmin from "../../types/products";
import type { IProductSupplier, IProductUser } from "../../types/products";

type Product = IProductAdmin | IProductUser | IProductSupplier;

interface ProductsState {
	products: Product[];
	totalProducts: number;
	currentPage: number;
	totalPages: number;
	limit: number;
}

const initialState: ProductsState = {
	products: [],
	totalProducts: 0,
	currentPage: 1,
	totalPages: 0,
	limit: 10
};

const productsSlice = createSlice({
	name: "products",
	initialState: initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
		setTotalProducts: (state, action: PayloadAction<number>) => {
			state.totalProducts = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		appendProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = [...state.products, ...action.payload];
		}
	}
});

export const { setProducts, setTotalProducts, setCurrentPage, appendProducts } = productsSlice.actions;
export default productsSlice.reducer;
