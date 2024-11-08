import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export const API = {
    LoginAPI: async (formData) => {
        return await api.post('/APIlogin', formData);
    },
    RegisterAPI: async (formData) => {
        return await api.post('/register', formData);
    },
    CreateProfileAPI: async (formData) => {
        return await api.post('/profile', formData);
    },
    UpdateProfileAPI: async (username, formData) => {
        return await api.put(`/profile/${username}`, formData);
    },
    GetProfileAPI: async (username) => {
        try {
            const response = await api.get(`/profile/${username}`);
            return response.data.profile;
        } catch (error) {
            throw error.response ? error.response.data : new Error('An error occurred');
        }
    },
    GetLogoutAPI: async () => {
        return await api.get('/APIlogout');
    },
    GetProductAPI: async () => {
        try {
            const response = await api.get('/product');
            return response;
        } catch (error) {
            throw error.response ? error.response.data : new Error('An error occurred');
        }
    },
    CreateCart: async (orderData) => {
        return await api.post('/cart', orderData);
    },
    CreateDetailCart: async (orderDetails) => {
        return await api.post('/detailCart', orderDetails);
    },
    GetOrderCart: async (username) => {
        try {
            return await api.get(`/orderCart/${username}`);
        } catch (error) {
            throw error.response ? error.response.data : new Error('An error occurred');
        }
    },
    GetOrderId: async (selectedOrderId) => {
        try {
            return await api.get(`/orders/${selectedOrderId}`);
        } catch (error) {
            throw error.response ? error.response.data : new Error('An error occurred');
        }
    }
};
