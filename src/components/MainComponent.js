//MainComponent.js is a Container component that will sit below the App.js component.
import React, {Component} from "react";
import {Navbar, NavbarBrand} from "reactstrap";
import Directory from "./DirectoryComponent"; //importing the Directory Component. The ./ means to stay in the same folder.
import {CAMPSITES} from "../shared/campsites"; //The ../ means to go down one directory. Import the CAMPSITES array into this file

class Main extends Component {
  constructor(props) {
    super(props);
    this.state= {
      campsites: CAMPSITES //The data from CAMPSITES is now in the App Component and can be used by other components (like children components of the App component)
    };
  }

  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    return (
      <div>
        <Navbar dark color="primary"> {/*Creating a Navbar to be seen on the website. */}
          <div className="container">
            <NavbarBrand href="/">NuCamp</NavbarBrand>
          </div>
        </Navbar>
        <Directory campsites={this.state.campsites}/> {/*Rendering (displaying) the Directory Component on the web page. Directory Component is getting the campsites data from the CAMPSITES array as an attribute (by using campsites={this.state.campsites} ) */}
      </div>
    );
  }
}


export default Main;