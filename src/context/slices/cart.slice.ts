import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ICart from "../../types/cart";

const initialState: ICart = {
    _id: "",
    cartId: "",
    products: [],
    orderPlaced: false
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (_state, action: PayloadAction<ICart>) => {
            return action.payload;
        },
        appendProduct: (state, action: PayloadAction<ICart["products"][0]>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<ICart["products"][0]>) => {
            const productIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (productIndex !== -1) {
                state.products[productIndex] = action.payload;
            }
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product._id !== action.payload);
        },
        removeCart: () => {
            return initialState;
        }
    }
});

export const { setCart, appendProduct, updateProduct, removeProduct, removeCart } = cartSlice.actions;
export default cartSlice.reducer;