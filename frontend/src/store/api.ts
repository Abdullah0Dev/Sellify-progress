import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';

const PLATFORM_MAIN_URL = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const BASE_URL = `http://${PLATFORM_MAIN_URL}:4000/api/`;
// Type for the product item
export type ProductType = {
  _id?: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  average_rating: number | string;
  images: string[];
  prices: { size: 'S' | 'M' | 'L'; price: number | string }[];
  quantity: number;
};

export const productsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => 'products/',
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Product' as const,
                id: _id,
              })),
              'Product',
            ]
          : ['Product'],
    }),
    getProductById: builder.query<ProductType, string>({
      query: id => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
