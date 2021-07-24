import React, {Component} from "react"; //Importing React and Component
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from "reactstrap"; //Importing ReactStrap Card component
//Creating the Directory Component (which is a React component). This is a child class because we have typed "extends Component", meaning this is a child class for Component.
class Directory extends Component {
    //Constructor is not required for Class Component. Constructor is needed for 
    constructor(props) { //props is an import keyword in React. Whenever you create a Class Component in React, you must include the argument "props", which is short for properties
        super(props); //super(props) takes the properties from the parent class and imports in into this child class. Whenever you have constructor(props), you must have super(props) as the very first line in the constructor method (this is required in React).
        this.state= { //This is a property named state. The state property is a special property in React that only needs to hold an Object.
            selectedCampsite: null, //Will keep track of whatever campsite was selected by the user. Null represents that nothing was selected.
        }; 
    }

    //This method that will run whenever a campsite is clicked on. campsite object will get passed into this method.
    onCampsiteSelect(campsite) {
        //this.setState will change the value of the campsite's property of state (default it is null)
        this.setState({selectedCampsite: campsite}); //In React, we never want to update the state directly
    }
    
    //This method will display the selected campsite details to be viewed on the web page 
    renderSelectedCampsite(campsite) {
        if (campsite) {//Makes sure that the campsite has an Object in it because campsite=true if there is an Object in campsite and camspte=false if there is no Object in campsite.
            return (
                <Card> {/*If there is an Object in Campsite, campsite=true, then a Card will be displayed that shows the campsite and its descriptions*/}
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        //Outside of the if() block, a return will return an empty <div/> if the campsite = false (null) because campsite didn't have an object in it.
        return <div />;
    }

    //In a Class Component, you need to wrap your return statement in a render() method
    render() { //Render method must have a return inside of it and the return must have a single React element. 
        //Creating a directory variable that will contain an array of elements. directory variable is going to get the Objects from the CAMPSITES array. Since the CAMPSITES array is being passed in as props (it is no longer data located in the constructor of the Directory Component), we have to change the "state" into "props". 
        const directory= this.props.campsites.map(campsite => { //This Map Array Method will go through all of the campsites from the local state (campsites array) and make a new array where each array item will contains the campsite.image, campsite.name and campsite.director (seen in lines 49-51) 
            return ( //This return is only used for this arrow function. What it will do is get each campsite object from the campsites array and return it.
                //To render an array of elements most efficiently, add a unique key attribute to the topmost element in each array item.
                <div key={campsite.id} className="col-md-5 m-1"> {/*This is JSX, so we use "className" */}
                    <Card onClick={() => this.onCampsiteSelect(campsite)}> {/*When the user clicks on the Card element, the onCampsiteSelect will start running. This is an event handler. We use an onClick handler, which is a React component, to do this. */}
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>

                        </CardImgOverlay>
                    </Card>
                </div>           
            );
        });

        //The final return will send data back to the Parent Component (in our project, this is the App component in App.js)
        return (
            <div className="container"> {/*JSX div*/}
                <div className="row">
                    {/*This directory variable is the array of the campsite information from the directory constant in lines 46-54. */}
                    {directory} {/*Using a JavaScript variable. To do this in JSX, you must use curly braces, {}. This {directory} variable is different than the Directory component (remember, JavaScript is case-sensitive) */}
                </div>

                {/*This will display the selected campsite inside of a Card component in the actual website since this information will go to the App Component (parent component) */}
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderSelectedCampsite(this.state.selectedCampsite)} {/*Passing in the campsite object that is stored in the selected campsite projerty of state. */}
                    </div>
                </div>
            </div>
        );
    }
}


export default Directory;
