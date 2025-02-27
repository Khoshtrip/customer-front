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
            const response = await api.get(`/packages/${packageId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    generateTransaction: async (packageId, quantity) => {
        try {
            const response = await api.post(
                `/packages/${packageId}/generate-transaction`,
                { quantity: quantity }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    purchaseTransaction: async (transactionId, credentials) => {
        try {
            //   card_number:
            //     type: string
            //     example: "1234567890123456"
            //     description: The card number for payment
            //   expiration_date:
            //     type: string
            //     example: "12/25"
            //     description: The expiration date of the card (MM/YY)
            //   cvv2:
            //     type: string
            //     example: "123"
            //     description: The CVV2 code of the card
            //   pin:
            //     type: string
            //     example: "1234"
            //     description: The PIN for the card

            const response = await api.post(
                `/transactions/${transactionId}/purchase`,
                credentials
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    cancelTransaction: async (transactionId) => {
        try {
            const response = await api.post(
                `/transactions/${transactionId}/cancel`
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};
