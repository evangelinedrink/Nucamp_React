//Reducers (functions) are used to create and update State
import {CAMPSITES} from "../shared/campsites"; //This file is not in the redux folder, which is why we use .. to back out of the folder to go to another folder.
import {COMMENTS} from "../shared/comments";
import {PARTNERS} from "../shared/partners";
import {PROMOTIONS} from "../shared/promotions";

//This will contain the initial State of our files. To access this constant in other files, we have to use "export"
//The State data for campsites, comments, partners and promotions are obtained here.
//The Reducer function (lines 19-21) gets this State data (the data below) and then returns it as State data. This State data then goes to the ConfigureStore in the configureStore.js file
export const initialState= {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS,
};

//Reducer function that uses default parameters (so if no state is passed in, the initial State values will be used)
//Reducer function also takes in action as a parameter
export const Reducer= (state= initialState, action) => {
    return state;
};