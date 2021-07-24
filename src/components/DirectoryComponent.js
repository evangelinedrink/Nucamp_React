import React, {Component} from "react"; //Importing React and Component

//Creating the Directory Component (which is a React component). This is a child class because we have typed "extends Component", meaning this is a child class for Component.
class Directory extends Component {
    //Constructor is not required for Class Component. Constructor is needed for 
    constructor(props) { //props is an import keyword in React. Whenever you create a Class Component in React, you must include the argument "props", which is short for properties
        super(props); //super(props) takes the properties from the parent class and imports in into this child class. Whenever you have constructor(props), you must have super(props) as the very first line in the constructor method (this is required in React).
        this.state= { //This is a property named state. The state property is a special property in React that only needs to hold an Object.
            //Storing data for different campsites
            campsites: [ //campsites is an Array of Objects. This is a common way to store data and it is useful to give each one a unique id.
                {
                    id: 0,
                    name: 'React Lake Campground',
                    image: 'assets/images/react-lake.jpg',
                    elevation: 1233,
                    description: "Nestled in the foothills of the Chrome Mountains, this campground on the shores of the pristine React Lake is a favorite for fly fishers."
                },
                {
                  id: 1,
                  name: 'Chrome River Campground ',
                  image: 'assets/images/chrome-river.jpg',
                  elevation: 877,
                  description: "Spend a few sunny days and starry nights beneath a canopy of old-growth firs at this enchanting spot by the Chrome River."
                },
                {
                    id: 2,
                    name: 'Breadcrumb Trail Campground',
                    image: 'assets/images/breadcrumb-trail.jpg',
                    elevation: 2901,
                    description: "Let NuCamp be your guide to this off-the-beaten-path, hike-in-only campground."
                },
                {
                    id: 3,
                    name: 'Redux Woods Campground',
                    image: 'assets/images/redux-woods.jpg',
                    elevation: 42,
                    description: "You'll never want to leave this hidden gem, deep within the lush Redux Woods."
                }
            ]
        }; 

    }
    //In a Class Component, you need to wrap your return statement in a render() method
    render() { //Render method must have a return inside of it and the return must have a single React element. 
        //Creating a directory variable that will contain an array of elements. directory variable is going to get the Objects from the campsites array in the constructor and then render it (show it) in the web browser. To do this, we need to use "this.state.campsites"
        const directory= this.state.campsites.map(campsite => { //This Map Array Method will go through all of the campsites from the local state (campsites array) and make a new array where each array item will contains the campsite.image, campsite.name and campsite.director (seen in lines 49-51) 
            return ( //This return is only used for this arrow function. What it will do is get each campsite object from the campsites array and return it.
                //To render an array of elements most efficiently, add a unique key attribute to the topmost element in each array item.
                <div key={campsite.id} className="col"> {/*This is JSX, so we use "className" */}
                    <img src={campsite.image} alt={campsite.name} />
                    <h2>{campsite.name}</h2>
                    <p>{campsite.description}</p>
                </div>           
            );
        });

        return (
            <div className="container"> {/*JSX div*/}
                <div className="row">
                    {/*This directory variable is the array of the campsite information from the directory constant in lines 46-54. */}
                    {directory} {/*Using a JavaScript variable. To do this in JSX, you must use curly braces, {}. This {directory} variable is different than the Directory component (remember, JavaScript is case-sensitive) */}
                </div>
            </div>
        );
    }
}

export default Directory;
