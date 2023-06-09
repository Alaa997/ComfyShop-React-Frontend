import axios from "axios";

const STATISTICS_API = "http://localhost:8081/statistics";

export const getStatistics = async (categoryId) => {
    const response = await axios.get(`${STATISTICS_API}/${categoryId}`);
    return response.data;
};


