//Presentation Content (the visual content) is inside of the App.js file
import React, {Component} from "react";
import Main from "./components/MainComponent"; //importing the Main Component
import {BrowserRouter} from "react-router-dom"; //Importing the BrowserRouter. BrowserRouter is the top-level parent component that wraps around all other React-Router components. React Router is needed to build a Single Page Application (SPA).
import './App.css';


class App extends Component {
  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    return (
      <BrowserRouter> {/*BrowserRouter is the top-level parent component that wraps around all other React-Router components. React Router is needed to build a Single Page Application (SPA). */}
        <div className= "App">
          <Main /> {/*Rendering (displaying) the Main Component on the web page. */}
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
