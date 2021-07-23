import React, {Component} from "react";
import {Navbar, NavbarBrand} from "reactstrap";
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    return (
      <div className= "App">
        <Navbar dark color="primary"> {/*Creating a Navbar to be seen on the website. */}
          <div className="container">
            <NavbarBrand href="/">NuCamp</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}


export default App;
