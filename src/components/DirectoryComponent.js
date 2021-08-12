//Directory Component is going to be a Presentational Component (it will not hold any State Data)
import React from "react"; //Importing React and Component
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap"; //Importing ReactStrap Card component
import {Link} from "react-router-dom"; //Importing Link from React Router DOM (Link). Link creates links to a path, it is used just like an anchor element <a>
import {Loading} from "./LoadingComponent";

//The Directory Class Component will be turned into two smaller Functional Components
//RenderDirectoryItem Functional Component will be responsible for rendering each card with different campsite details
//Functional Components always receive any data passed to them as properties of a single props object. In that props object, is passed in as the only argument. In the example below, we are destructuring the props object (seen in the code below). 
function RenderDirectoryItem({campsite}) {
    //Functional Component has no constructor method, nor a render method. Functional Components only have a return statement.
    return (
        <Card> 
            {/*Link is used so we can look into more details of the campsite when its url has "/director/idNumber", such as "directory/2" for a campsite with id 2 (it will show the user information for campsite with id 2). */}
            {/*With Link, we are creating a dynamic link with JavaScript. Template literal is being used here. */}
            <Link to={`/directory/${campsite.id}`}>
                <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
    </Card>
    );
}

//Creating the Directory Component (which is a React Functional component). We are passing in props to this Functional Component. We could destructure the props in it, but we will not do that.
function Directory(props) {

    //Creating a directory variable that will contain an array of elements. directory variable is going to get the Objects from the CAMPSITES array. Since the CAMPSITES array is being passed in as props (it is no longer data located in the constructor of the Directory Component), we have to change the "state" into "props". 
    //For Functional Components, we don't use the "this" keyword when accessing props
    //We have to change the campsites object because it is not just holding the campsites: [] array, but also the isLoading: false, and errMess: null (this is seen in the campsites.js file inside of the redux folder). This is why it is this.props.campsites.campsites, which will just access the campsites array not the errMess and isLoading properties.
    const directory= props.campsites.campsites.map(campsite => { //This Map Array Method will go through all of the campsites from the local state (campsites array) and make a new array where each array item will contains the campsite.image, campsite.name and campsite.director (seen in lines 49-51) 
        return ( //This return is only used for this arrow function. What it will do is get each campsite object from the campsites array and return it.
            //To render an array of elements most efficiently, add a unique key attribute to the topmost element in each array item.
            <div key={campsite.id} className="col-md-5 m-1"> {/*This is JSX, so we use "className" */}
                {/*Calling in the RenderDirectoryItem Functional Component. We are passing in the campsite props */}
                <RenderDirectoryItem campsite={campsite} />
            </div>           
        );
    });

    //Determining if the Loading component should be displayed
    if (props.campsites.isLoading) {
        return (
            <div className= "container">
                <div className="row">
                   <Loading /> 
                </div>
            </div>
        );
    }

    //Determining if the Error Message component should be displayed
    if (props.campsites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    
    //The final return will send data back to the Parent Component (in our project, this is the App component in App.js)
    return (
        <div className="container"> {/*JSX div*/}
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        {/*The attribute of active means that when the user is in the Directory Component, the Directory breadcrumb will appear as the active component */}
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>

                    <h2>Directory</h2> {/*Header for Directory */}
                    <hr /> {/*Horizontal Rule */}
                </div>
            </div>
            
            <div className="row">
                {/*This directory variable is the array of the campsite information from the directory constant in lines 46-54. */}
                {directory} {/*Using a JavaScript variable. To do this in JSX, you must use curly braces, {}. This {directory} variable is different than the Directory component (remember, JavaScript is case-sensitive) */}
            </div>

            
        </div>
    );
}




export default Directory;
