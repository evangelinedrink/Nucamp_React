import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle} from "reactstrap";

//Functional Component named RenderCard (is is a purely presentational component)
//Destructuring item from props
function RenderCard({item}) {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name} </CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
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
                    <RenderCard item={props.campsite} />
                </div>

                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>

                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
            
        </div>
    );
} 

export default Home; 