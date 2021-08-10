import {CAMPSITES} from "../shared/campsites"; //Importing the CAMPSITES array from the Campsites module in the shared folder.

//Reducer function to handle each part of the state. It will be a named expored called Campsites. The C doesn't have to be capitalized.
//For this Reducer function you can use an arrow function or a function declaration to make it.
//All reducers take 2 parameters: first parameter is the previous state (which is the existing or current state. It is the state already in the store).
//The first time the reducer is called, the state will not exist, so the Default Parameter Syntax  will be used.
//The second parameter is the action object. The body of the function will check for the type of the action and return the state. 
export const Campsites = (state= CAMPSITES, action) => {
    switch (action.type) {
        default: 
            return state; //Returning the state
    }
}; 