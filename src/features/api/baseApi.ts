import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "filmsApi",
    // tagTypes: [],
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            // VITE_ACCESS_TOKEN должен содержать ваш токен доступа (v4 auth), а не API ключ.
            const token = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
            headers.set("Authorization", `Bearer ${token}`)
        },
    }),
    endpoints: () => ({}),
})