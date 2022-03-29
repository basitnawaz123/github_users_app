import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import ResultComponent from "../../../ResultComponent";
import SearchComponent from "../../../SearchComponent";

const MainLayout = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<SearchComponent />}></Route>
        <Route path='/result' element={<ResultComponent />}></Route>
      </Routes>
    </Fragment>
  );
};

export default MainLayout;
