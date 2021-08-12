//Don't need to import the CAMPSITES data below because we are receiving the CAMPSITES data as an Action (an Action is an object)
//import {CAMPSITES} from "../shared/campsites"; //Importing the CAMPSITES array from the Campsites module in the shared folder.
import * as ActionTypes from "./ActionTypes"; //Importing from our ActionTypes module

//Reducer function to handle each part of the state. It will be a named expored called Campsites. The C doesn't have to be capitalized.
//For this Reducer function you can use an arrow function or a function declaration to make it.
//All reducers take 2 parameters: first parameter is the previous state (which is the existing or current state. It is the state already in the store).
//The first time the reducer is called, the state will not exist, so the Default Parameter Syntax  will be used.
//The second parameter is the action object. The body of the function will check for the type of the action and return the state. 
//The CAMPSITES state is going to be changed because it will hold three different properties (isLoading, errMess, and the campsites array). These three properties are initialized here using the Default Function Parameters syntax
export const Campsites = (state= {
    isLoading: true,
    errMess: null,
    campsites: []
}, action) => {
    switch (action.type) { //Adding the responses to the different campsites related actions to this reducers switch statement.
        case ActionTypes.ADD_CAMPSITES:
            //In the line below, we are taking the state that is passed in as a parameter above for Campsites function and updating its parameters (we do this with the Spread Syntax)
            return {...state, isLoading: false, errMess: null, campsites: action.payload}; //Returning a new state spread out and updated its values saying it is no longer loading, there is no error message and the campsite's array will be populated with the payload's data 
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}; //We have an empty array for campsites because we have not yet received the data when the campsites data is loading (the computer is waiting for the server to give it data)
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload}; //The errMess (error message) has an action.payload meaning it will get the error message data from the paylaod that was created in the ActionCreators.js file. The campsites array doesn't have to be updated when there is an error
        default: 
            return state; //Returning the state
    }
}; 