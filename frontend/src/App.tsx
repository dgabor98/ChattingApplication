import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegisterPage from "./components/RegisterPage";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import FriendPage from "./components/FriendPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/friends" element={<FriendPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
