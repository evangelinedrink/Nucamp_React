import {COMMENTS} from "../shared/comments"; //Importing the COMMENTS array from the Comments module in the shared folder.
//We will cause this reducer to update its part of the state when the ADD_COMMENT action is dispatched to the Store. This means we have to import from the ActionTypes module
import * as ActionTypes from "./ActionTypes";

//Reducer function to handle each part of the state. It will be a named expored called Comments. The C doesn't have to be capitalized.
//For this Reducer function you can use an arrow function or a function declaration to make it.
//All reducers take 2 parameters: first parameter is the previous state (which is the existing or current state. It is the state already in the store).
//The first time the reducer is called, the state will not exist, so the Default Parameter Syntax  will be used.
//The second parameter is the action object. The body of the function will check for the type of the action and return the state. 
export const Comments = (state= COMMENTS, action) => {
    switch (action.type) {
        //Setting up a case when the actionType is ADD_COMMENT
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload; //Content of action.payload is an object, so we can add more properties to the object (which is shown below) 
            comment.id= state.length; //Add an id which is the length of the comments array 
            comment.date= new Date().toISOString(); //Displaying the current date
            return state.concat(comment); //concat method is a built-in JavaScript array method that lets us attached a new item into an array without mutating the array (it creates a new array). This line takes the existing state, which is an array of ojbects, and concatenates the new comment object to the end of the array and then returns that new state to the Redux store. 
        default: 
            return state; //Returning the state
    }
}; 