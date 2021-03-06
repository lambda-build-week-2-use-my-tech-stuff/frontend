import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import PostPage from "./components/postpage/PostPage";
import CatalogGrid from "./components/CatalogGrid";
import ProfilePage from "./components/ProfilePage";
import PostForm from "./components/postpage/PostForm";
import EditForm from "./components/postpage/EditForm";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PrimarySearchAppBar />
        <Route exact path="/" component={CatalogGrid} />
        <Route path="/postpages/:id" component={PostPage} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/postform" component={PostForm} />
        <Route path="/editform" component={EditForm} />
      </div>
    );
  }
}

export default App;
