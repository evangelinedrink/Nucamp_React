//Importing the Action Types from the ActionTypes.js file. We are using a wildcard, *, that lets us import all the named exports from the ActionTypes.js file at once
import * as ActionTypes from "./ActionTypes"; //We can access the exports using the Action Types namespace that is defined as ActionTypes
import {baseUrl} from "../shared/baseUrl";
//import {CAMPSITES} from "../shared/campsites"; //Importing the Campsites data to this module so we can use it in our server's simulation



//We will be using Redux Thunk to perform an Asynchronous Request to the server. However, we have not yet created a server to do this. We will pretend we are talking to a server by creating a brief delay using the set.timeout function. After the delay, we will add the campsites data to the state.
//This is an Action Creator called fetchCampsites. The Redux Thunk syntax is shown below by wrapping the function in another function and Redux Thunk will let us pass the Store's dispatch method into the inner function
//Then we can use that dispatch method to dispatch a different action called campsitesLoading. 
 //fetchCampsites Action Creator will get the data (campsites array) from the server and will then pass it to the addCampsites Action Creator
 export const fetchCampsites= () => dispatch => { //The two arrows shows that we nested a function inside another arrow function. We can nest arrow functions like this thanks to Redux Thunk.
     dispatch(campsitesLoading());

     //This is a call to Fetch. We must give Fetch a URL as a parameter. baseUrl + campsites is the location of the resource that we want
     return fetch(baseUrl +"campsites")
     //First then method will run when the Promise of this return responds, just because the server returns a response doesn't mean all is well. The server could have returned a bad response (like a 404 code). 
     //If you get a reponse from the server, the Promise will consider that as being resolved, not rejected. It would be rejected if we never got a response from the server.
     //Fetch validates the response from the server (by using okay), the property response of "ok" will be set for true for a response of status code in the successful range (200-299). "Okay" would be false if it is not successful 
                .then(response => {
                    if (response.ok) {
                        return response; //The response will then continue in the Promise chain
                    } else { //This is if the response is not okay (there is an error)
                        const error= new Error(`Error ${response.status}: ${response.statusText}`); //Status and Status Text are built in responses from Fetch. They will make our error message more informative
                        error.response = response;
                        throw error; //Will send the error straight to the catch method (error function) because of the JavaScript throw keyword
                    }
                },
                //A Promise can resolve or reject and we can add a second callback function to the then method to handle a rejected promise (we did not get a response from the server)
                //This error will be displayed when the server gives no response (neither good or bad)
                error => {
                    const errMess = new Error(error.message);
                    throw errMess;
                }
                )
            .then(response => response.json()) //Call to Fetch will return a JavaScript Promise. The .json() method will convert the response to JSON to JavaScript. This will be the array of campsites.
            //Array of campsites is returned from the above .then() method, which is why another .then() method is chained here (code below). the campsites is the array of campsites that will be dispatched to the addCampsites Action Creator to be used as its payload.
            .then(campsites => dispatch(addCampsites(campsites)))
            .catch(error => dispatch(campsitesFailed(error.message))); //Catch method is used for errors. If any of these promises are rejected, they will also be caught in this catch method.
     //setTimeout will give us a brief delay of 2000 miliseconds (or 2 seconds). AFter the delay, we will dispatch another action called addCampsites along with the data from the CAMPSITES array.
     /*setTimeout(() => {
         dispatch(addCampsites(CAMPSITES));
     }, 2000);*/
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

 //We are passing in all the values that are needed to add a comment: campsiteId, rating, author and comment text
//This action creator will return an object  as its properties and type as a payload
//addComments Action Creator will be split into two different parts. The original addComment is one Action Creator and is seen commented out below.
//addComment Action Creator will be working here
export const addComment= comment => ({
    type: ActionTypes.ADD_COMMENT, //This is the ActionTypes namespace that is defined in line 2. This lets us access the ADD_COMMENT export that we made in the ActionTypes.js file (without having to define it in the import)
    payload: comment
})

//postComment Action Creator will handle the asynchronous call to Fetch and will actually post the new comment to the server. It will have to be Thunked (nesting two functions). Dispatch argument, so it will be passed in the inner function  
//postComment Action Creator is using Thunk middleware so it can handle asynchronous calls inside of it. Get rid 
export const postComment= (campsiteId, rating, author, text) => dispatch => {
    //Make the payload property as a constant. We will make it an object that holds hte same properties as before 
    const newComment= { //Payload contains the data that we are trying to change in the State
        campsiteId: campsiteId, //In ES6, when the identifier of a property is the same as its value, we can pass it with just campsiteId (instead of campsiteId: campsiteId)
        rating: rating,
        author: author,
        text: text,
    };
    //Adding a date to the new comment object. The date isn't being passed in, we are generating a new Date property right here in the Action Creator. It will grab whatever date it is when this code is executed
    newComment.date = new Date().toISOString();
    //return a call to Fetch and give it a URL + comments. We will pass Fetch an optional second argument, which will be in the form of an object.
    //In this object we will add a property to POST (HTML verb). 
    return fetch(baseUrl + "comments", {
        method: "POST", //Property to specifiy the REquest Method named Post. If we don't specify the method, the default HTTP request method for Fetch is Get (which is what we have been using so far)
        body: JSON.stringify(newComment), //We will need to supply a body property for this request. The body is going to be a JSON encoded version of the object that we created above (which is newComment). JSON.stringify converts a JavaScript value to a JavaScript Object Notation (JSON) string
        headers: { //Headers property needs to be an object so it can hold one or more headers.
            "Content-Type": "application/json" //Server knows to expect the body to be formated as JSON
        } 
    })
    //We need to handle the resolve or reject from this Promise with a Then Method
    .then(response => {
        if (response.ok) {
            return response; //The response will then continue in the Promise chain
        } else { //This is if the response is not okay (there is an error)
            const error= new Error(`Error ${response.status}: ${response.statusText}`); //Status and Status Text are built in responses from Fetch. They will make our error message more informative
            error.response = response;
            throw error; //Will send the error straight to the catch method (error function) because of the JavaScript throw keyword
        }
    },
    //A Promise can resolve or reject and we can add a second callback function to the then method to handle a rejected promise (we did not get a response from the server)
    //This error will be displayed when the server gives no response (neither good or bad)
    error => { throw error; } //This is what will happen when the error is rejected
    )
    //Promise Chain
    .then(response => response.json()) //When the POST request is succesfful, the JSON server will send back the data that you sent (like an echo) but it will automatically insert a unique ID with it. You convert that response back to JavaScript using .json() method
    .then(response => dispatch(addComment(response)))
    .catch(error => { //This will catch any rejected Promises
        console.log("post comment", error.message); //Posting the comment so we know that it is coming from the postComment Action Creator 
        alert("Your comment could not be posted\n Error: " + error.message);
    }); 
};
/*
export const addComment= (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT, //This is the ActionTypes namespace that is defined in line 2. This lets us access the ADD_COMMENT export that we made in the ActionTypes.js file (without having to define it in the import)
    payload: { //Payload contains the data that we are trying to change in the State
        campsiteId: campsiteId, //In ES6, when the identifier of a property is the same as its value, we can pass it with just campsiteId (instead of campsiteId: campsiteId)
        rating: rating,
        author: author,
        text: text,
    }
});
*/

 //This Action Creator will be used to fetch (get) the comments for the campsites
 //fetchComments action creator will be a Thunk function
 export const fetchComments = () => dispatch => {
     return fetch(baseUrl + "comments") //This will return a Promise with an array of comments
        .then(response => {
                if (response.ok) {
                    return response; //The response will then continue in the Promise chain
                } else { //This is if the response is not okay (there is an error)
                    const error= new Error(`Error ${response.status}: ${response.statusText}`); //Status and Status Text are built in responses from Fetch. They will make our error message more informative
                    error.response = response;
                    throw error; //Will send the error straight to the catch method (error function) because of the JavaScript throw keyword
                }
            },
            //A Promise can resolve or reject and we can add a second callback function to the then method to handle a rejected promise (we did not get a response from the server)
            //This error will be displayed when the server gives no response (neither good or bad)
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json()) //This will turn the comments array, which is a .json file, into a JavaScript array
        .then(comments => dispatch(addComments(comments)))//If the above line works, the comments will then be dispatched to the Redux Store by being sent to the addComments Action Creator
        .catch(error => dispatch(commentsFailed(error.message))); //Catch method will get the commentsFailed action
 };

 //Two more Action Creators to handle the campsites' comments that return Action Objects (they won't be using Redux Thunk)
 //commentsFailed Action Creator will have a parameter of errMess and will create an object with the type of ActionTypes.Comments_Failed and the payload that will contain the errors message
 export const commentsFailed= errMess => ({
     type: ActionTypes.COMMENTS_FAILED,
     payload: errMess
 });

 //addComments action creator will have the parameter of comments, type of ActionTypes.add_comments, and a payload of the argument passed in as comments
 export const addComments = comments => ({
     type: ActionTypes.ADD_COMMENTS,
     payload: comments
 });

 //fetchPromotions Action Creator will be Thunked. fetchPromotions will have the same code as the fetchCampsites Action Creator
 //fetchPromotions Action Creator will get the data (promotions array) from the server and will then pass it to the 
 export const fetchPromotions= () => dispatch => { //The two arrows shows that we nested a function inside another arrow function. We can nest arrow functions like this thanks to Redux Thunk.
    dispatch(promotionsLoading());

    //This is a call to Fetch. We must give Fetch a URL as a parameter. baseUrl + promotions is the location of the resource that we want
    return fetch(baseUrl +"promotions")
            .then(response => {
                if (response.ok) {
                    return response; //The response will then continue in the Promise chain
                } else { //This is if the response is not okay (there is an error)
                    const error= new Error(`Error ${response.status}: ${response.statusText}`); //Status and Status Text are built in responses from Fetch. They will make our error message more informative
                    error.response = response;
                    throw error; //Will send the error straight to the catch method (error function) because of the JavaScript throw keyword
                }
                },
                //A Promise can resolve or reject and we can add a second callback function to the then method to handle a rejected promise (we did not get a response from the server)
                //This error will be displayed when the server gives no response (neither good or bad)
                error => {
                    const errMess = new Error(error.message);
                    throw errMess;
                }
            )
           .then(response => response.json()) //Call to Fetch will return a JavaScript Promise. The .json() method will convert the response to JSON to JavaScript. This will be the array of promotions.
           //Array of promotions is returned from the above .then() method, which is why another .then() method is chained here (code below). promotions is the array of promotions that will be dispatched to the addPromotions Action Creator to be used as its payload.
           .then(promotions => dispatch(addPromotions(promotions)))
           .catch(error => dispatch(promotionsFailed(error.message)));
};

 //This is the promotionsLoading Action Creator. There is only one arrow, so this is a standard Action Creator that returns an action object and nothing else.
 //This action will not have a payload, it will just have a type. Because it is not Thunked, it is not being intercepted, it will go straight to the Reducer as normal.
 //promotionsLoading action is the one that is dispatched from fetchPromotions, so when the fetchPromotions is dispatched, that action will dispatch the promotionsLoading action creator.
 export const promotionsLoading= () => ({
    type: ActionTypes.PROMOTIONS_LOADING
}); 

//Two more Action Creators to handle the promotions' comments that return Action Objects (they won't be using Redux Thunk)
//promotionsFailed Action Creator will have a parameter of errMess and will create an object with the type of ActionTypes.Promotions_Failed and the payload that will contain the errors message
export const promotionsFailed= errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

//addComments action creator will have the parameter of comments, type of ActionTypes.add_comments, and a payload of the argument passed in as comments
export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});