import {createStore, combineReducers, applyMiddleware} from "redux";
import {createForms} from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
//Importing all four reducers. We are only using one . in the path because all the reducers are in the same folder as this file (inside of the redux folder)
import {Campsites} from "./campsites"; 
import {Comments} from "./comments";
import {Partners} from "./partners";
import {Promotions} from "./promotions";
import {InitialFeedback} from "./forms";
//import { Reducer, initialState } from "./reducer"; //. because reducer.js is in the same folder, redux folder

//This is our Redux Store that contains the State data
//State data was passed into the configureStore by the Reducer.js
export const ConfigureStore= () => {
    const store= createStore( //createStore needs to have a Reducer as an argument, but it will only accept a single Reducer. The four reducers need to be combined with the combineReducers function
        combineReducers({
            campsites: Campsites, //All of the reducers are properties of combineReducers
            comments: Comments,
            partners: Partners,
            promotions: Promotions, 
            //CreateForms is a helper function from React Redux Form Library, that uses reducers and updates the state
            //We are using the spread syntax and giving createForms an argument that uses the model name for the entire form
            ...createForms({
                feedbackForm: InitialFeedback //Giving it the InitialFeedback object for the form state 
            })
        }),
        
        //Applying Middleware function. To be able to use Thunk and Logger, we pass them in as values in the parameter list
        //To use Redux Logger, all you need to do is pass it in as a parameter to the applyMiddleware function
        //To use Redux Thunk, we need to add more code in order to use it.
        applyMiddleware(thunk, logger)
    );

    return store; //ConfigureStore will return the store 
};

