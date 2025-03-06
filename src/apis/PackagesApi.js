import api from "../utils/api";

export const PackagesApi = {
    getPackages: async (filters = {}, offset = 0, limit = 10) => {
        try {
            const response = await api.get("/packages/", {
                params: { ...filters, offset, limit },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getPackageById: async (packageId) => {
        try {
            const response = await api.get(`/packages/${packageId}/`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    generateTransaction: async (packageId, quantity) => {
        try {
            const response = await api.post(
                `/packages/${packageId}/generate-transaction/`,
                { quantity: quantity }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    ratePackage: async (packageId, amount) => {
        try {
            const response = await api.post(`/packages/${packageId}/rate/`, {
                rating: amount,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};
