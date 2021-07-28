//Directory Component is going to be a Presentational Component (it will not hold any State Data)
import React from "react"; //Importing React and Component
import {Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap"; //Importing ReactStrap Card component

//The Directory Class Component will be turned into two smaller Functional Components
//RenderDirectoryItem Functional Component will be responsible for rendering each card with different campsite details
//Functional Components always receive any data passed to them as properties of a single props object. In that props object, is passed in as the only argument. In the example below, we are destructuring the props object (seen in the code below). 
function RenderDirectoryItem({campsite,onClick}) {
    //Functional Component has no constructor method, nor a render method. Functional Components only have a return statement.
    return (
        /*Since we destructured campsite and onClick in the function's parameter list, we don't use this.props in the line below */
        <Card onClick={() => onClick(campsite.id)}> {/*When the user clicks on the Card element, the onCampsiteSelect will start running. This is an event handler. We use an onClick handler, which is a React component, to do this. Since we passed in the onClick event handler as a prop to this file (the state of the onClick event handler is in the MainComponent.js file). */}
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
    </Card>
    );
}

//Creating the Directory Component (which is a React Functional component). We are passing in props to this Functional Component. We could destructure the props in it, but we will not do that.
function Directory(props) {

    //Creating a directory variable that will contain an array of elements. directory variable is going to get the Objects from the CAMPSITES array. Since the CAMPSITES array is being passed in as props (it is no longer data located in the constructor of the Directory Component), we have to change the "state" into "props". 
    //For Functional Components, we don't use the "this" keyword when accessing props
    const directory= props.campsites.map(campsite => { //This Map Array Method will go through all of the campsites from the local state (campsites array) and make a new array where each array item will contains the campsite.image, campsite.name and campsite.director (seen in lines 49-51) 
        return ( //This return is only used for this arrow function. What it will do is get each campsite object from the campsites array and return it.
            //To render an array of elements most efficiently, add a unique key attribute to the topmost element in each array item.
            <div key={campsite.id} className="col-md-5 m-1"> {/*This is JSX, so we use "className" */}
                {/*Calling in the RenderDirectoryItem Functional Component. We are passing in the campsite and the onClick props */}
                <RenderDirectoryItem campsite={campsite} onClick={props.onClick} />
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

            
        </div>
    );
}




export default Directory;
