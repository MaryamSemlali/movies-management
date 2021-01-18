import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Users from "./pages/users";
import Movies from "./pages/movies";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/movies" component={Movies} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
