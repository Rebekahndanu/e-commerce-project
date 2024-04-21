import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:5505"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "products",
        }),   
    }),
});

export const { useGetAllProductsQuery} = productsApi;