import React from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from "reactstrap"; //Importing ReactStrap Card Component

//CampsiteInfo Class component is going to be split up into three Functional Components (one for each of the methods that were in the Class Component)
//By creating three Functional Components (one for each method), we will not have one big Class Component handling everything. Each Functional Component will be handling different parts.

//RenderCampsite Functional Component. campsite is a property of props, but it is destructured using the Object Destructuring.
//Its parameter, campsite, has been defined in the render() method in line 54. The parameter named campsite = this.props.campsite. This is why we don't have to write this.props.campsite here to get the campsite data.
function RenderCampsite({campsite}) { //campsite is this Functional Component's only parameter in its parameter list. Curly braces destructures it, so that we don't need the name of the parameter (in this case it is campsite)
    return (
        <div className="col-md-5 m-1">
            <Card> {/*If there is an Object in Campsite, campsite=true, then a Card will be displayed that shows the campsite and its descriptions*/}
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

/* Different ways to pass parameters in as props 
function RenderCampsite(props) { //campsite is this Functional Component's only parameter in its parameter list
    return (
        <div className="col-md-5 m-1">
            <Card> {/*If there is an Object in Campsite, campsite=true, then a Card will be displayed that shows the campsite and its descriptions*/
             /*   <CardImg top src={props.campsite.image} alt={props.campsite.name} />
                <CardBody>
                    <CardTitle>{props.campsite.name}</CardTitle>
                    <CardText>{props.campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderCampsite(campsite) { //campsite is this Functional Component's only parameter in its parameter list
    return (
        <div className="col-md-5 m-1">
            <Card> {/*If there is an Object in Campsite, campsite=true, then a Card will be displayed that shows the campsite and its descriptions*/
 /*               <CardImg top src={campsite.campsite.image} alt={campsite.campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.campsite.name}</CardTitle>
                    <CardText>{campsite.campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}
*/

//RenderComments Functional Method. Its parameter, {comments}, has been destructured. comments has been defined in the render() method by using comments = this.props.campsite.comments. This is why we don't have to write this.props.campsites.comments here to get the comments data.
function RenderComments({comments}) { //Takes the comments array stored in the campsite object as a parameter, thus renderComments(comments)
    if(comments) { //Check to see that comments are not null or undefined (this would make if(comments) = false).
        return (
            <div className="col-md-5 m-1"> {/*Bootstrap column classes that occupies 5 columns for viewports md and above */}
                <h4>Comments</h4>
                {/*Curly Brackes below is going to be used to embed a JavaScript expression within JSX */}
                {
                    comments.map(comment => {
                        return ( //The return will ensure that the values posted below will show in the webpage.
                            <div key={comment.id}> {/*JSX can only have one element. Always have the unique ID for each element in an array. */}
                                <p>{comment.text}</p> {/*Displaying the text of the comment*/}
                                <p>
                                    {comment.author} {/*Displaying the author of the comment*/}     
                                </p> 
                                {/*Displaying the date of the comment */}
                                <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
    //Returning an empty div if if(comments) = False
    <div></div>
}

//The render method of the CampsiteInfo Class Component will become the CampsiteInfo Functional Component.
//In the CampsiteInfo Funtional Component, we will pass in props.  Functional Components don't use the "this" keyword.
function CampsiteInfo(props) {
//Since if/else statement is JavaScript, if we place it inside of a return() and inside of a <div> element, it will show the if/else words on the website. 
        //We are only returning one item because if props.campsite is true or false, only one thing will show.
        if(props.campsite) { //Checking to see if the "campsite" props is truth (not null, nor undefined). We don't need curly braces because this is JavaScript, not JSX yet.
        return (  
            <div className= "container"> {/*The "container" ensures that our selected campsite will be alligned with the list of campsites that are being rendered in the DirectoryComponent.js file. Container keeps things alligned in their box. */}
                <div className="row"> {/*In JSX, can only have one element */}
                    {/*Calling the RenderCampsite Functional Component and passing campsite into it. We need curly braces because the things inside of the return is in JSX. If we have JavaScript in JSX, we need curly braces.*/}
                    <RenderCampsite campsite={props.campsite} /> {/*We are calling the RenderCampsite Functional Component */}
                    
                    {/* Calling the RenderComments Functional Component and pasing in the comments array (it is passing in as an attribute). The comments array data will be the variable comments in the RenderComments Functional Component.*/}
                    <RenderComments comments={props.comments}/> {/*Since comments is within the campsite object, we have to use props.campsite.comments */}
                </div>
            </div>                 
        ); 
    } else {
        return ( <div></div> ); //Returning an empty div 
    }       
}


export default CampsiteInfo;