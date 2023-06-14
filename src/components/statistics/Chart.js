import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getStatistics } from "../../APIs/Statistics";
import { getCategories } from "../../APIs/CategoryAPI";
import "../../components/statistics/ChartComponent.css";

const ChartComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      async function fetchData() {
        try {
          const response = await getStatistics(selectedCategory);
          setProducts(response);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const options = {
    title: "The Most Sold Products",
    is3D: true,
  };

  const data = products.map((product) => [product.productName, product.count]);

  console.log(data);

  return (
    <div className="chart-container">
      <h1 className="chart-heading text-danger">Chart Component</h1>
      {/* {loading ? ( */}
      <p>Loading categories...</p>
      {/* // ) : ( */}
      <select
        className="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {/* // )} */}
      {!loading && (
        <Chart
          chartType="PieChart"
          data={[["Product Name", "Count"], ...data]}
          // data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )}
    </div>
  );
};

export default ChartComponent;
