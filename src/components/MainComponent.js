//MainComponent.js is a Container component that will sit below the App.js component.
//Presentation Content (the visual content) is now in the MainComponent.js file. Remember that we don't have to have strictly Presentational and Container Components, they can be a blend of both.
import React, {Component} from "react";
import Directory from "./DirectoryComponent"; //importing the Directory Component. The ./ means to stay in the same folder.
import CampsiteInfo from "./CampsiteInfoComponent"; //Importing the CampsiteInfo component into this MainComponent
import Header from "./HeaderComponent"; //Importing the Header Component
import Footer from "./FooterComponent"; //Importing the Footer Component
import Home from "./HomeComponent"; //Importing the Home Component
import Contact from "./ContactComponent";//Importing the Contact Component
import About from "./AboutComponent"; //Importing the About Component
import {Switch, Route, Redirect, withRouter} from "react-router-dom"; //Importing Switch (Groups the <Route> components together), Route (renders the UI for a matching path), and Redirect (Redirects the user to a new URL) (these are React Router Components, used to make a Single Page App). These components redirects users when they click on a link in the website.
import {connect} from "react-redux"; //connection
import {actions} from "react-redux-form"; //actions from the react-redux-form that will make an action creator named actions.reset available to us which will be used to the mapDispatchToProps
//Making the fetchCampsites Action Creator available to MainComponent.js in the code below
import {postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners, postFeedback} from "../redux/ActionCreators"; //Adding the addComment from the ActionCreators 
import { TransitionGroup, CSSTransition } from "react-transition-group";


//Application data is no longer stored in the Main Component state, it will be transfered to the Redux Store. This is why the data below is commented out.
//import {CAMPSITES} from "../shared/campsites"; //The ../ means to go down one directory. Import the CAMPSITES array into this file
//import {COMMENTS} from "../shared/comments"; //The ../ means to go down one directory. Import the COMMENTS array into this file
//import {PARTNERS} from "../shared/partners"; //The ../ means to go down one directory. Import the PARTNERS array into this file
//import {PROMOTIONS} from "../shared/promotions"; //The ../ means to go down one directory. Import the PROMOTIONS array into this file

//We are getting the State data from Redux by setting up the mapstateToProps function
//Anything outside of the mapstateToProps function will now go from state.name to props.name. The Redux Store contains all the State Data. Every component outside of the Redux Store will now be changed to props and no longer be State data.
const mapStateToProps= state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  }
}

//Setting up mapDispatchToProps, which will call the Redux Store's dispatch method for us
//You can setup mapDispatchToProps as an object or as a function. The recommended way is to set it up as an object
//setting up the mapDispatchToProps makes it easy to dispatch actions to the Redux Store
const mapDispatchToProps=  {
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)), //We are calling the Action Creator in this arrow function's body. We are passing in the campsiteId, rating, author and text.
  //For the code below, we don't pass in anything in the parameter, but we will let it call the fetchCamspites Action Creator in the body of this fetchCampsites method. 
  //This fetchCampsites Action Creator is now available to the Main Component to be passed into elements/components as a prop
  fetchCampsites: () => (fetchCampsites()), //We are adding the fetchCampsites Action Creator (which is a method, thus a function (this is why we are using arrow function to create it here)) to the mapDispatchToProps, that way fetchCampsites can be used as a prop to different elements/components and fetchCampsites will be called to work whenever a user does something to the elements/components
  resetFeedbackForm: () => (actions.reset("feedbackForm")), //We are using the model name that is being used for the entire Contact Us form. That model name was feedbackForm
  fetchComments: () => (fetchComments()), //Calling in the fetchComments Action Creator
  fetchPromotions: () => (fetchPromotions()),
  fetchPartners: () => (fetchPartners()),
  postFeedback: (response) => (postFeedback(response)), //You need to pass in the response object, otherwise you won't be able to see the values written by the user in the alert after the user submits the information in the form.
};

class Main extends Component {
  
  //We are getting the State data from Redux by setting up the mapStateToProps function
  //This is why this section below is commented out because the data isn't obtained from here anymore, we get the State data from the Redux store.
  /*
  constructor(props) {
    super(props);
    this.props= {
      campsites: CAMPSITES, //The data from CAMPSITES is now in the App Component and can be used by other components (like children components of the App component)
      //Pulling the arrays of COMMENTS, PARTNERS, and PROMOTIONS to the props property of this Main Component (the data in these arrays will be used in other Components on this website)
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS,
    };
  }
  */

  //As soon as the Main Component is rendered (displaying) in the DOM, we would like to display (fetch) the Campsites data by using the fetchCampsites() Action Creator
  //To do this, we are going to use a special React method called componentDidMount()
  //componentDidMount() is a Lifecycle Method. Every React Component has a lifecycle, which means there are certain points where it gets created and inserted in the DOM, when it gets updated and when it gets removed from the DOM. There are certain methods when each of these steps occur 
  //componentDidMount() is called right after a React Component is created and inserted in the DOM
  componentDidMount() {
      this.props.fetchCampsites();
      this.props.fetchComments();
      this.props.fetchPromotions();
      this.props.fetchPartners();
  }


  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    //Locally Scoped Component called HomePage. HomePage is only accessible in the Main Class Component because it is defined here (this is what it means for it to be locally scoped, only accessible in the component it was created in). 
    //HomePage component is written as an arrow function instead of a function declaration because it is a feature of arrow functions with the "this" keyword.
    //Arrow Functions inherit the "this" of their parent scope. If we used the function declaration instead of the arrow function, then when we use "this" inside of it, it would not point to the parent props of the class, it would not be able to access the campsites, promotions and partners' arrays of objects/the data ("this" would be undefined) 
    const HomePage= () => {
      return (
        //The web page displays the Home Component when the user clicks on Home
        //3 props are being passed in the Home Component, one for each item that we would like to feature on the Home Page. 
        //We are using the filtered method because the items to be featured have a "feature: true" property in their Object. We want the computer to only display the data for the Objects that have a "feature: true" property. 
        //Only the featured object will be in a new array after going through the Filter Array Method. We use index number 0, [0], to pull the object from the array and then the object is passed into the Home Component as props
        //We have to change the campsites object because it is not just holding the campsites: [] array, but also the isLoading: false, and errMess: null (this is seen in the campsites.js file inside of the redux folder). This is why it is this.props.campsites.campsites, which will just access the campsites array not the errMess and isLoading properties.
        <Home 
            campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
            campsitesLoading= {this.props.campsites.isLoading} //We are passing in the isLoading property of the campsite's state object
            campsitesErrMess= {this.props.campsites.errMess} //We are passing in the errMess property of the campsite's state object
            promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} //The first promotions points to the promotions object, the second promotions points to the promotions array inside of that promotions object
            promotionLoading={this.props.promotions.isLoading}
            promotionErrMess={this.props.promotions.errMess}
            //We are passing in all the properties that are inside of the partners state (partners array, isLoading and errMess)
            partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
            partnersLoading= {this.props.partners.isLoading}
            partnersErrMess = {this.props.partners.errMess}
        />
      );
    }

    //Create the CampsiteWithId component. Code in the CampsiteWithId component will run when the url matches what is inside of the path, path="directory/:campsiteId"
    //CampsiteWithId receives props from the root component (since it is receiving a match object, the root component is from React Router. React Router gives match objects) and destructures the match object out from props
    const CampsiteWithId= ({match}) => {
      return (
        //Rendering the CampsiteInfo Component and passing in a couple of things as props. One of the props is the selected campsite object and the other is an array of all the comments in the campsite.
        //We have the full list of campsites in the Main Component props (this line of code is within the constructor and it is this.props = {campsites: CAMPSITES})
        //We have to change the campsites object because it is not just holding the campsites: [] array, but also the isLoading: false, and errMess: null (this is seen in the campsites.js file inside of the redux folder). This is why it is this.props.campsites.campsites, which will just access the campsites array not the errMess and isLoading properties.
        //We can access the full list of campsites with this.props.campsites.campsites, however we want to get only the campsite object that has the id that matches what is stored in the match.parems.campsiteId. This is why we are using Filter Method to get only that campsite
        //The value of match.parems.campsiteId is stored as a string, it needs to be converted into a number to do the comparison in the Filter method. To do the comparison, unary plus operator is used here (+match.params.campsiteId) 
        //When you have a number stored as a string and you want to convert it to a number, the unary plus operator is a way to convert it to a number. 
        //campsite.id is a number and +match.params.campsiteId was a string but is then converted as a number. Index 0 is getting the object inside of the array obtained from the Filter Method
        //For the comments, use Filter Method to get the comments that match the campsiteId. We want the entire array of comments for the campsite, which is why the zero index isn't used here. 
        <CampsiteInfo 
          campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          isLoading= {this.props.campsites.isLoading} //We are passing in the isLoading property of the campsite's state object
          errMess= {this.props.campsites.errMess} //We are passing in the errMess property of the campsite's state object
          comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} 
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment} //We are now passing in the Add_Comment function to the CampsiteInfo component as a prop.
          />
      );
    };

    return (
      /*CSS Transition requires a unique key. classNames is an attribute for CSS Transition (it is used for the CSS classes in App.css) */
      /*Transition Group that will help us use React Transition Group components to the Routes in our application */
      <div>
        {/*Rendering the Header Component*/}
        <Header />   
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}> 
            
            {/*Any Router Request will go through this Switch propsment until it finds a matching route */}
            <Switch>
                <Route path="/home" component={HomePage} /> {/*HomePage is an arrow function (lines 33-45) that filters and obtains the featured campsite, partner and promotion's objects (includes the name, image and description for each) */}
                
                {/*Directory Component is getting the campsites data from the CAMPSITES array as an attribute (by using campsites={this.props.campsites} ) */}
                {/*In the Directory Component, we are pasing in props data (this is the campsites data), which is why the directory component uses this render arrow function syntax (this render arrow function is normally done when passing in props data as props) */}
                <Route exact path="/directory" render={() => <Directory campsites={this.props.campsites} />} /> {/*The render function returns the Directory Component */}
                
                {/*Routing a path for when the url has "/directory/campsiteId", so when the website sees this url it will show information for that campsite with that id */}
                {/*The colon in path tells the web browser that what  follows the forward slash, after the colon, is going to be a parameter. It will take whatever that paramater is and puts it in this property called campsite ID*/}
                {/*campsiteId gets stored as a property of that parems object */}
                {/*This Route's matched object gets passed to the campsite with the id component as a prop automically, we don't have to specify it. */}
                <Route path="/directory/:campsiteId" component={CampsiteWithId} />

                {/*Routing the About Us Component. We are passing in the partners data from the Main Component to the About Component. Since the partners data is props data, we have to use the render arow function syntax, which was used for the Directory component above */}
                <Route exact path="/aboutus" render={() => <About partners={this.props.partners} />} /> 
                
                {/*Routing the Contact Component. This line below is telling our app to watch the browser address bar. Whenever the route in the address bar matches /contactus, then the Contact Component will be shown in the webpage */}
                {/*Passing in the the Reset Feedback Form function the contact component as a prop. Since we are passing in a prop to Contact, we will need to change the attribute to a render attribute and set it up as an error function*/}
                <Route exact path="/contactus" render={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                
                <Redirect to="/home" /> {/*Redirect component acts as a catch all (so it is like a Default propsment in a JavaScript Switch propsment) */}
            </Switch>
            
            </CSSTransition>
          </TransitionGroup>

         {/*Rendering the Footer Component */}     
         <Footer />  
      </div>
    );
  }
}

//connect() generates a container component that wraps around other components to subscribe them to the store
//connect() allows the Main component to take its State data from the Redux Store
//withRouter() will work with these changes to our export.
//Adding the mapDispatchToProps inside of the connect function as the second argument.
//mapDispatchToProps makes the Add_Comment Action Creator function available inside of the MainComponent as a prop.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));