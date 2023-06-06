import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import UpdateProduct from "./components/product/UpdateProduct"
import AddProduct from "./components/product/AddProduct";
import AddCategory from "./components/category/AddCategory";
import MyCart from "./components/customer/MyCart";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "bootstrap/dist/css/bootstrap.css";
import Order from "./components/customer/Order";
import ChartComponent from "./components/statistics/Chart";


function App() {
  return (
    <div className="font">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/all/product/categories" element={<HomePage />} />
          <Route
            path="/home/all/product/category/:categoryId/:categoryName"
            element={<HomePage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/statistics" element={<ChartComponent />} />
          <Route path="/addcategory" element={<AddCategory />} />
          {/* <Route path="/addcategory" element={<UpdateProduct />} /> */}
          <Route path="/addproduct" element={<AddProduct />} />
          <Route
            path="/update-product/:productId"
            element={<UpdateProduct />}
          />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
