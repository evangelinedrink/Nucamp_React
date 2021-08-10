import {createStore, combineReducers} from "redux";
//Importing all four reducers. We are only using one . in the path because all the reducers are in the same folder as this file (inside of the redux folder)
import {Campsites} from "./campsites"; 
import {Comments} from "./comments";
import {Partners} from "./partners";
import {Promotions} from "./promotions";
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
        })
    );

    return store; //ConfigureStore will return the store 
};