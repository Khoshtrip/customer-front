import api from "../utils/api";

export const HistoryApi = {
    getPurchaseHistory: async () => {
        try {
            const response = await api.get(`customer/purchase-history/`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};
