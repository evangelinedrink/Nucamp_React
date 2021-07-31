//MainComponent.js is a Container component that will sit below the App.js component.
//Presentation Content (the visual content) is now in the MainComponent.js file. Remember that we don't have to have strictly Presentational and Container Components, they can be a blend of both.
import React, {Component} from "react";
import Directory from "./DirectoryComponent"; //importing the Directory Component. The ./ means to stay in the same folder.
import CampsiteInfo from "./CampsiteInfoComponent"; //Importing the CampsiteInfo component into this MainComponent
import Header from "./HeaderComponent"; //Importing the Header Component
import Footer from "./FooterComponent"; //Importing the Footer Component
import Home from "./HomeComponent"; //Importing the Home Component
import Contact from "./ContactComponent";//Importing the Contact Component
import {Switch, Route, Redirect} from "react-router-dom"; //Importing Switch (Groups the <Route> components together), Route (renders the UI for a matching path), and Redirect (Redirects the user to a new URL) (these are React Router Components, used to make a Single Page App). These components redirects users when they click on a link in the website.
import {CAMPSITES} from "../shared/campsites"; //The ../ means to go down one directory. Import the CAMPSITES array into this file
import {COMMENTS} from "../shared/comments"; //The ../ means to go down one directory. Import the COMMENTS array into this file
import {PARTNERS} from "../shared/partners"; //The ../ means to go down one directory. Import the PARTNERS array into this file
import {PROMOTIONS} from "../shared/promotions"; //The ../ means to go down one directory. Import the PROMOTIONS array into this file

class Main extends Component {
  constructor(props) {
    super(props);
    this.state= {
      campsites: CAMPSITES, //The data from CAMPSITES is now in the App Component and can be used by other components (like children components of the App component)
      //Pulling the arrays of COMMENTS, PARTNERS, and PROMOTIONS to the state property of this Main Component (the data in these arrays will be used in other Components on this website)
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS,
    };
  }


  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    //Locally Scoped Component called HomePage. HomePage is only accessible in the Main Class Component because it is defined here (this is what it means for it to be locally scoped, only accessible in the component it was created in). 
    //HomePage component is written as an arrow function instead of a function declaration because it is a feature of arrow functions with the "this" keyword.
    //Arrow Functions inherit the "this" of their parent scope. If we used the function declaration instead of the arrow function, then when we use "this" inside of it, it would not point to the parent state of the class, it would not be able to access the campsites, promotions and partners' arrays of objects/the data ("this" would be undefined) 
    const HomePage= () => {
      return (
        //The web page displays the Home Component when the user clicks on Home
        //3 props are being passed in the Home Component, one for each item that we would like to feature on the Home Page. 
        //We are using the filtered method because the items to be featured have a "feature: true" property in their Object. We want the computer to only display the data for the Objects that have a "feature: true" property. 
        //Only the featured object will be in a new array after going through the Filter Array Method. We use index number 0, [0], to pull the object from the array and then the object is passed into the Home Component as props
        <Home 
            campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
            promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
            partner={this.state.partners.filter(partner => partner.featured)[0]}
        />
      );
    }

    return (
      <div>
        {/*Rendering the Header Component*/}
        <Header />
        
        {/*Any Router Request will go through this Switch Statement until it finds a matching route */}
        <Switch>
            <Route path="/home" component={HomePage} /> {/*HomePage is an arrow function (lines 33-45) that filters and obtains the featured campsite, partner and promotion's objects (includes the name, image and description for each) */}
            
            {/*Directory Component is getting the campsites data from the CAMPSITES array as an attribute (by using campsites={this.state.campsites} ) */}
            {/*In the Directory Component, we are pasing in state data (this is the campsites data), which is why the directory component uses this render arrow function syntax (this render arrow function is normally done when passing in state data as props) */}
            <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites} />} /> {/*The render function returns the Directory Component */}
            
            {/*Routing the Contact Component. This line below is telling our app to watch the browser address bar. Whenever the route in the address bar matches /contactus, then the Contact Component will be shown in the webpage */}
            <Route exact path="/contactus" component={Contact} />
            
            <Redirect to="/home" /> {/*Redirect component acts as a catch all (so it is like a Default statement in a JavaScript Switch statement) */}
        </Switch>

         {/*Rendering the Footer Component */}     
         <Footer />  
      </div>
    );
  }
}

//Routing the Contact Component

export default Main;