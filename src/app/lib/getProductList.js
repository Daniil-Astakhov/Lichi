import axios from "axios";
export const fetchData = async (limit, page) => {
  try {
    const response = await axios.post(
      "https://api.lichi.com/category/get_category_product_list",
      {
        category: "clothes",
        lang: 1,
        shop: 1,
        limit: limit,
        page: page,
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    return response.data.api_data.aProduct;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
