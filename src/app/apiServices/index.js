import axios from "axios"
import { apiConstants } from "../utils/apiConstants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const notebookLmApi = axios.create({
    baseURL: API_URL,
    timeout: 20000,
});

export const upload = async(payload, config = {}) => {
    try {
        const data = await notebookLmApi.post(apiConstants.UPLOAD, payload, {
            headers: { "Content-Type": "multipart/form-data" },
            ...config
        })
        return data
    } catch (error) {
        throw error
    }
}

export const ask = async(payload) => {
    try {
        const data = await notebookLmApi.post(apiConstants.ASK, payload)
        return data
    } catch (error) {
        throw error
    }
}
