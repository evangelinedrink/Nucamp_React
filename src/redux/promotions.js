//We are no longer getting the promotions data from the shared folder (which is why the line below is commented out). We are getting the promotions data from the json-server that we created
//import {PROMOTIONS} from "../shared/promotions"; //Importing the PROMOTIONS array from the Promotions module in the shared folder.
import * as ActionTypes from "./ActionTypes";

//Reducer function to handle each part of the state. It will be a named expored called Promotions. The P doesn't have to be capitalized.
//For this Reducer function you can use an arrow function or a function declaration to make it.
//All reducers take 2 parameters: first parameter is the previous state (which is the existing or current state. It is the state already in the store).
//The first time the reducer is called, the state will not exist, so the Default Parameter Syntax  will be used.
//The second parameter is the action object. The body of the function will check for the type of the action and return the state. 
export const Promotions = (state= {isLoading: true, errMess: null, promotions: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};
        case ActionTypes.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []};
        case ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default: 
            return state; //Returning the state
    }
}; 