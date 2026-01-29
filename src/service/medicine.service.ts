import { env } from "../../env";

const API_URL = env.BACKEND_URL
const medicineService = {
    getMedicines: async () => {
        const response = await fetch(`${API_URL}/medicines`);
        return response.json();
    },
    getMedicineById: async (id: string) => {
        const response = await fetch(`${API_URL}/medicines/${id}`);
        return response.json();
    },
};

export default medicineService;