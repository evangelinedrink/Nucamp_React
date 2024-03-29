
export const ADD_CAMPSITES= "ADD_CAMPSITES";//ADD_CAMPSITES action will be dispatched when the campsites data has been successfully retrieved from the server and can be safely added to the State. 
export const CAMPSITES_LOADING = "CAMPSITES_LOADING"; //CAMPSITES_LOADING will be for when our app is loading the campsites data and it hasn't received the data yet. It has made the request, but is waiting for a response.
export const CAMPSITES_FAILED = "CAMPSITES_FAILED"; //CAMPSITES_FAILED IS WHEN OUR SERVER REQUEST HAS FAAILED FOR SOME REASON AND WE CAN'T LOAD THE DATA. This action type will let the Redux Store know this, so the State can update to show an error message

export const ADD_COMMENT = "ADD_COMMENT"; //This is one action type. This creates a variable called ADD_COMMENT and setting its value to the string, "ADD_COMMENT", and exporting it.
export const ADD_COMMENTS = "ADD_COMMENTS";
export const COMMENTS_FAILED= "COMMENTS_FAILED";

export const ADD_PROMOTIONS= "ADD_PROMOTIONS";
export const PROMOTIONS_LOADING= "PROMOTIONS_LOADING";
export const PROMOTIONS_FAILED= "PROMOTIONS_FAILED";

export const ADD_PARTNERS= "ADD_PARTNERS";
export const PARTNERS_LOADING= "PARTNERS_LOADING";
export const PARTNERS_FAILED= "PARTNERS_FAILED";