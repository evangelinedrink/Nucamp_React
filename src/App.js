//Presentation Content (the visual content) is inside of the App.js file
import React, {Component} from "react";
import Main from "./components/MainComponent"; //importing the Main Component
import './App.css';


class App extends Component {
  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    return (
      <div className= "App">
        <Main /> {/*Rendering (displaying) the Main Component on the web page. */}
      </div>
    );
  }
}


export default App;
