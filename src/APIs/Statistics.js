import axios from "axios";

const STATISTICS_API = "http://localhost:8081/statistics";

export const getStatistics = async (categoryId) => {
  try {
    const response = await axios.get(`${STATISTICS_API}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


