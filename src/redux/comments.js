//We are no longer getting the comments data from the shared folder. We are getting the comments data from the json-server that we created
//import {COMMENTS} from "../shared/comments"; //Importing the COMMENTS array from the Comments module in the shared folder.

//We will cause this reducer to update its part of the state when the ADD_COMMENT action is dispatched to the Store. This means we have to import from the ActionTypes module
import * as ActionTypes from "./ActionTypes";

//Reducer function to handle each part of the state. It will be a named expored called Comments. The C doesn't have to be capitalized.
//For this Reducer function you can use an arrow function or a function declaration to make it.
//All reducers take 2 parameters: first parameter is the previous state (which is the existing or current state. It is the state already in the store).
//The first parameter is an object that will contain an errMes and the comments which will be an empty array
//The second parameter is the action object. The body of the function will check for the type of the action and return the state. 
export const Comments = (state= {errMess: null, comments:[]}, action) => {
    switch (action.type) {
        //Setting up a case when the actionType is ADD_COMMENT
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload}; //This will add comments to the initally empty comments array
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload}; //This will display the error message
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload; //Content of action.payload is an object, so we can add more properties to the object (which is shown below) 
            comment.id= state.comments.length; //Add an id which is the length of the comments array. To do this, you will have to type state.comments to access the comments array in the state object
            comment.date= new Date().toISOString(); //Displaying the current date
            return {...state, comments: state.comments.concat(comment)}; //We will need to spread the previous state and then update the comments array (the comments property). concat method is a built-in JavaScript array method that lets us attached a new item into an array without mutating the array (it creates a new array). This line takes the existing state, which is an array of ojbects, and concatenates the new comment object to the end of the array and then returns that new state to the Redux store. 
        default: 
            return state; //Returning the state
    }
}; 