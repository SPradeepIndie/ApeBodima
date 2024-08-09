import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MainLayout from "./mainLayout/MainLayout";
import Register from "./pages/Register";
<<<<<<< HEAD
import SearchingAlertComponent from "./component/SearchingAlertComponent"
import  Login  from "./pages/Login";
import HeaderComponent from "./component/HeaderComponent";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import FilterBarComponent from "./component/FilterBarComponent";
const App = () => {  
  return (
    <div>
      {/* <Register></Register> */}
      
      <HeaderComponent/>
      <FilterBarComponent/>
    </div>
=======
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import AddBodim from "./pages/AddBodim";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/addBodim" element={<AddBodim />} />
          <Route path="/a" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
>>>>>>> f1f27a44a2ab8b3822535d5db4253d1c34a6a657
  );
};

export default App;
