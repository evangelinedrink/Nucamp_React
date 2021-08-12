//This component will create a Loading Spinner when the computer is waiting to receive data from the server
//This Loading Spinner will show up for the CAMPSITES_LOADING ActionCreator
import React from "react";

//Loading is a Functional Component 
export const Loading = () => {
    return (
        <div className="col">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" /> {/*This is the font awesome spinner icon and the font awesome pulse class. The pulse class will let it rotate in 8 steps. fa-3x will increase its size and fa-fw will make it fixed width. Bootstrap's text-primary class will give it a blue color */}
            <p>Loading...</p> {/*Paragraph class that shows Loading... on the screen */}
        </div>
    );
};