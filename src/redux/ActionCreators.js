//Importing the Action Types from the ActionTypes.js file. We are using a wildcard, *, that lets us import all the named exports from the ActionTypes.js file at once
import * as ActionTypes from "./ActionTypes"; //We can access the exports using the Action Types namespace that is defined as ActionTypes

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
