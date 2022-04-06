import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { HomePage, PremierPage, SecondPage, Resultat } from "../pages/index";
import { Navbar } from ".";

const Navigation = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/premier-tour" element={<PremierPage />} />
        <Route exact path="/second-tour" element={<SecondPage />} />
        <Route exact path="/resultat" element={<Resultat />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
