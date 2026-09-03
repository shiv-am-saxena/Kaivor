import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HomepageState {
    announcement: object | null;
    carousel: object | null;
    featuredProduct: object | null;
    category: object | null;
    whyWe: object | null;
    editorialProduct: object | null;
    community: object | null;
    faqs: object | null;
}

const initialState: HomepageState = {
    announcement: null,
    carousel: null,
    featuredProduct: null,
    category: null,
    whyWe: null,
    editorialProduct: null,
    community: null,
    faqs: null,
};

const homepageSlice = createSlice({
    name: "homepage",
    initialState,
    reducers: {
        clearData: (state) => {
            state.announcement = null;
            state.carousel = null;
            state.featuredProduct = null;
            state.category = null;
            state.whyWe = null;
            state.editorialProduct = null;
            state.community = null;
            state.faqs = null;
        },
        setData: (state, action: PayloadAction<Partial<HomepageState>>) => {
            const { announcement, carousel, featuredProduct, category, whyWe, editorialProduct, community, faqs } = action.payload;
            if (announcement !== undefined) state.announcement = announcement;
            if (carousel !== undefined) state.carousel = carousel;
            if (featuredProduct !== undefined) state.featuredProduct = featuredProduct;
            if (category !== undefined) state.category = category;
            if (whyWe !== undefined) state.whyWe = whyWe;
            if (editorialProduct !== undefined) state.editorialProduct = editorialProduct;
            if (community !== undefined) state.community = community;
            if (faqs !== undefined) state.faqs = faqs;
        },
    },
});

export const { setData, clearData } = homepageSlice.actions;

export default homepageSlice.reducer;