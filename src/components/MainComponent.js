//MainComponent.js is a Container component that will sit below the App.js component.
//Presentation Content (the visual content) is now in the MainComponent.js file. Remember that we don't have to have strictly Presentational and Container Components, they can be a blend of both.
import React, {Component} from "react";
import {Navbar, NavbarBrand} from "reactstrap";
import Directory from "./DirectoryComponent"; //importing the Directory Component. The ./ means to stay in the same folder.
import CampsiteInfo from "./CampsiteInfoComponent"; //Importing the CampsiteInfo component into this MainComponent
import {CAMPSITES} from "../shared/campsites"; //The ../ means to go down one directory. Import the CAMPSITES array into this file

class Main extends Component {
  constructor(props) {
    super(props);
    this.state= {
      campsites: CAMPSITES, //The data from CAMPSITES is now in the App Component and can be used by other components (like children components of the App component)
      selectedCampsite: null, //Will keep track of whatever campsite was selected by the user. Null represents that nothing was selected.
    };
  }

//This method that will run whenever a campsite is clicked on. campsite object will get passed into this method.
onCampsiteSelect(campsiteId) {
    //this.setState will change the value of the campsite's property of state (default it is null)
    this.setState({selectedCampsite: campsiteId}); //In React, we never want to update the state directly. slectedCampsite: campsiteId is not an Object, it is a Property.
}

  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    return (
      <div>
        <Navbar dark color="primary"> {/*Creating a Navbar to be seen on the website. */}
          <div className="container">
            <NavbarBrand href="/">NuCamp</NavbarBrand>
          </div>
        </Navbar>
        
        {/*In the line below for calling the Directory component, we are taking the onClick event handler and passing it in as a prop to the Directory Component. React lets us pass event handlers as props. */}
        {/*The original onClick event handler was written like this: onClick={() => this.onCampsiteSelect(campsite)}. The empty parameter list , (), meant we would get the entire campsite object, but for our purposes we just need the campsiteId */}
        <Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/> {/*Rendering (displaying) the Directory Component on the web page. Directory Component is getting the campsites data from the CAMPSITES array as an attribute (by using campsites={this.state.campsites} ) */}
        {/*The CampsiteInfo component is expecting an object, not an array (the Filter Method will return an array). To get an Object, we use the index number [0] to get that one campsite object to the CampsiteInfo component.*/}
        <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}/> {/*Calling the CampsiteInfo component. Passing in the attribute campsite as props to this CampsiteInfo component. With the Filter method, we are making sure that the campsite that was selected by the user has the same campsiteId as the campsite object in the CAMPSITES array. If they have the same id, then the campsite in the CAMPSITES array will display its data in the webpage. */}
                
      </div>
    );
  }
}


export default Main;