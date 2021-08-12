//Importing the Action Types from the ActionTypes.js file. We are using a wildcard, *, that lets us import all the named exports from the ActionTypes.js file at once
import * as ActionTypes from "./ActionTypes"; //We can access the exports using the Action Types namespace that is defined as ActionTypes
import {CAMPSITES} from "../shared/campsites"; //Importing the Campsites data to this module so we can use it in our server's simulation

//We are passing in all the values that are needed to add a comment: campsiteId, rating, author and comment text
//This action creator will return an object  as its properties and type as a payload
export const addComment= (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT, //This is the ActionTypes namespace that is defined in line 2. This lets us access the ADD_COMMENT export that we made in the ActionTypes.js file (without having to define it in the import)
    payload: { //Payload contains the data that we are trying to change in the State
        campsiteId: campsiteId, //In ES6, when the identifier of a property is the same as its value, we can pass it with just campsiteId (instead of campsiteId: campsiteId)
        rating: rating,
        author: author,
        text: text,
    }
});

//We will be using Redux Thunk to perform an Asynchronous Request to the server. However, we have not yet created a server to do this. We will pretend we are talking to a server by creating a brief delay using the set.timeout function. After the delay, we will add the campsites data to the state.
//This is an Action Creator called fetchCampsites. The Redux Thunk syntax is shown below by wrapping the function in another function and Redux Thunk will let us pass the Store's dispatch method into the inner function
//Then we can use that dispatch method to dispatch a different action called campsitesLoading. 
//setTimeout will give us a brief delay of 2000 miliseconds (or 2 seconds). AFter the delay, we will dispatch another action called addCampsites along with the data from the CAMPSITES array.
 export const fetchCampsites= () => dispatch => { //The two arrows shows that we nested a function inside another arrow function. We can nest arrow functions like this thanks to Redux Thunk.
     dispatch(campsitesLoading());

     setTimeout(() => {
         dispatch(addCampsites(CAMPSITES));
     }, 2000);
 };

 //This is the campsitesLoading Action Creator. There is only one arrow, so this is a standard Action Creator that returns an action object and nothing else.
 //This action will not have a payload, it will just have a type. Because it is not Thunked, it is not being intercepted, it will go straight to the Reducer as normal.
 //campsitesLoading action is the one that is dispatched from fetchCampsites, so when the fetchCampsites is dispatched, that action will dispatch the campsitesLoading action creator.
 export const campsitesLoading= () => ({
     type: ActionTypes.CAMPSITES_LOADING
 }); 

 //This is another Action Creator called campsitesFailed. An error message (errMess) is passed into this campsitesFailed function.
 //The error message that we passed in (errMess) will be the payload
 export const campsitesFailed= errMess => ({
     type: ActionTypes.CAMPSITES_FAILED,
     payload: errMess
 });

 //This is the addCampsites Action Creator. This action creator will have a campsites parameter. It will be a normal Aciton Creatior, it will return an action (which is an object), instead of a function (from Redux Thunk), so it is not using Redux Thunk
 //The campsites argument (addCampsites parameter) should be an array. campsites will be the payload
 export const addCampsites = campsites => ({
     type: ActionTypes.ADD_CAMPSITES,
     payload: campsites
 });  