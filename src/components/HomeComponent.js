import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle} from "reactstrap";
import {Loading} from "./LoadingComponent"; //Importing the Loading component
import {baseUrl} from "../shared/baseUrl";
import {FadeTransform} from "react-animation-components";

//Functional Component named RenderCard (is is a purely presentational component)
//Destructuring item from props
//We want to show the loading component, the error message if there is an error and only render the campsites data if we have it. This is why isLoading and errMess are props here
function RenderCard({item, isLoading, errMess}) {
    if(isLoading) { //If isLoading is truthy, then this if statement will run
        return <Loading />; //Return the Loading Componont (from LoadingComponent.js)
    }

    if(errMess) { //If errMess is truthy, then this if statement will run
        return <h4>{errMess}</h4> //Returning the contents of the error message
    }

    //If isLoading and errMess are falsy, we can then return the Card Component which has information about the Campsites, Partners and Promotions
    return (
        <FadeTransform 
            in
            transformProps={{
                exitTransform: "scale(0.5) translateY(50%)"
            }} 
            >
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name} </CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    )
}

//Home Functional Component that will return a <div> element with the Bootstrap calls of Container
function Home(props) {
    return (
        <div className="container">
            {/*Bootstrap Grid Row with Three Columns. */}
            <div className= "row">
                {/*col-md means that the 3 columns will take up a third of the row, but for small viewports they will take up a full row and stack on top of each other */}
                {/*m-1 means marginal spacing */}
                <div className="col-md m-1">
                    {/*Passing in the itemp prop. We passed in the featured campsite, promotion and partners into the Home Component from the Main Component */}
                    {/*We are retrieving these featured campsite, promotion and partner here in these code */}
                    {/*This RenderCard (this is a Functional Presentational Component declared in lines 6-16) creates a card with all the properties of the featured campsite, promotion and partner: image, name, description */}
                    <RenderCard 
                        item={props.campsite} 
                        //Passing in the isLoading and the errMess as props because the Main Component passes them to the Home component
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>

                <div className="col-md m-1">
                    <RenderCard 
                        item={props.promotion} 
                        isLoading= {props.promotionLoading}
                        errMess= {props.promotionErrMess}
                    />
                </div>

                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
            
        </div>
    );
} 

export default Home; 