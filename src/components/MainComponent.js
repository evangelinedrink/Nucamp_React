//MainComponent.js is a Container component that will sit below the App.js component.
//Presentation Content (the visual content) is now in the MainComponent.js file. Remember that we don't have to have strictly Presentational and Container Components, they can be a blend of both.
import React, {Component} from "react";
import Directory from "./DirectoryComponent"; //importing the Directory Component. The ./ means to stay in the same folder.
import CampsiteInfo from "./CampsiteInfoComponent"; //Importing the CampsiteInfo component into this MainComponent
import Header from "./HeaderComponent"; //Importing the Header Component
import Footer from "./FooterComponent"; //Importing the Footer Component
import Home from "./HomeComponent"; //Importing the Home Component
import {Switch, Route, Redirect} from "react-router-dom"; //Importing Switch (Groups the <Route> components together), Route (renders the UI for a matching path), and Redirect (Redirects the user to a new URL) (these are React Router Components, used to make a Single Page App). These components redirects users when they click on a link in the website.
import {CAMPSITES} from "../shared/campsites"; //The ../ means to go down one directory. Import the CAMPSITES array into this file

class Main extends Component {
  constructor(props) {
    super(props);
    this.state= {
      campsites: CAMPSITES, //The data from CAMPSITES is now in the App Component and can be used by other components (like children components of the App component)
      
    };
  }


  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    //Locally Scoped Component called HomePage. HomePage is only accessible in the Main Class Component because it is defined here (this is what it means for it to be locally scoped, only accessible in the component it was created in). 
    const HomePage= () => {
      return (
        <Home />
      );
    }

    return (
      <div>
        {/*Rendering the Header Component*/}
        <Header />
        
        {/*Any Router Request will go through this Switch Statement until it finds a matching route */}
        <Switch>
            <Route path="/home" component={HomePage} />
            {/*Directory Component is getting the campsites data from the CAMPSITES array as an attribute (by using campsites={this.state.campsites} ) */}
            <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites} />} /> {/*The render function returns the Directory Component */}
            <Redirect to="/home" /> {/*Redirect component acts as a catch all (so it is like a Default statement in a JavaScript Switch statement) */}
        </Switch>

         {/*Rendering the Footer Component */}     
         <Footer />  
      </div>
    );
  }
}


export default Main;