import { API_BASE_URL } from "@config/config"
import { api } from "@utils/axios"
import axios, { AxiosError } from "axios"
type TerrorAxios = {
    msg: string
}

type ApiError = {
    message: string,
    statusCode: number
}
class ProducStoreService {
    constructor(){}


    async create(data) {
        try {
            const response = await api.post("/products", data)

            return response
        } catch (error) {
            const apiError: ApiError = error.response.data;
            throw new Error(apiError.message);
        }
    }
    async add(productsId: number[]) {
        try {
            const { data } = await api.post("/products-store", {
                productsId: productsId
            })
            return data
        } catch (error) {
            const apiError: ApiError = error.response.data;
            throw new Error(apiError.message);
        }
    }

     async update (productId: number, product) {
        try {
            const {data} = await api.put(`/products/${productId}`, product)
            return data
        } catch (error) {
            const apiError: ApiError = error.response.data;
            throw new Error(apiError.message);
        }
    }
    async bestProductsStore(storeId: number) {
        try {
            const products = axios.get(`${API_BASE_URL}/products-store/bestproducts/${storeId}`)
    
            return (await products).data
        } catch (error) {
            const apiError: ApiError = error.response.data;
            throw new Error(apiError.message);
        }
    
    }
    async delete(productId: number) {
        try {
            const {data} = await api.delete(`/products/${productId}`)
            return data
        } catch (error) {
            const apiError: ApiError = error.response.data;
            throw new Error(apiError.message);
        }
    }
}


export default ProducStoreService

