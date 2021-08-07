import {createStore} from "redux";
import { Reducer, initialState } from "./reducer"; //. because reducer.js is in the same folder, redux folder

//This is our Redux Store that contains the State data
//State data was passed into the configureStore by the Reducer.js
export const ConfigureStore= () => {
    const store= createStore(
        Reducer,
        initialState
    );

    return store; //ConfigureStore will return the store 
}