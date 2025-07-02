export const getBeautyProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Failed to fetch beauty products:", error);
    throw error;
  }
};
