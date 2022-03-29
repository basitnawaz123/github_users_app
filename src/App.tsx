import React, { FC, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./Components/templates/Main";

const App: FC = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
