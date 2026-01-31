
import { env } from "../../env";


const categoriesService = {
    getallcategories: async () => {
        try {
            const response = await fetch(`${env.BACKEND_URL}/api/categories/getAll`);
            const data = await response.json();

            return { data: data, error: null };
        } catch (error) {
            return { data: error, error: "get api not working" }
        }
    },
    getcategorybyid: async (id: string) => {
        try {
            const response = await fetch(`${env.BACKEND_URL}/api/categories/${id}`)
            const data = await response.json();

            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: "get api not working" }
        }
    }


}

export default categoriesService