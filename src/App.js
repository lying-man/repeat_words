import React from "react";
import "./styles/main.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import AddWord from "./components/AddWord/AddWord";
import Loader from "./components/Loader/Loader";
import Edit from "./components/Edit/Edit";

function App() {  
  return (
    <React.Fragment>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<AddWord />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
      <Loader />
    </React.Fragment>
  );
}

export default App;
