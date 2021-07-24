import React, {Component} from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from "reactstrap"; //Importing ReactStrap Card Component

class CampsiteInfo extends Component {
    //This renderCampsite method is being defined in lines 6-18. Its parameter, campsite, has been defined in the render() method in line 54. The parameter named campsite = this.props.campsite. This is why we don't have to write this.props.campsite here to get the campsite data.
    renderCampsite(campsite) { //campsite is this method's only parameter in its parameter list
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

    //This renderComments method is being defined in lines 21-46. Its parameter, comments, has been defined in the render() method in line 58. The parameter named comments = this.props.campsite.comments. This is why we don't have to write this.props.campsites.comments here to get the comments data.
    renderComments(comments) { //Takes the comments array stored in the campsite object as a parameter, thus renderComments(comments)
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

    render() {       
          //Since if/else statement is JavaScript, if we place it inside of a return() and inside of a <div> element, it will show the if/else words on the website. 
          //We are only returning one item because if this.props.campsite is true or false, only one thing will show.
                if(this.props.campsite) { //Checking to see if the "campsite" props is truth (not null, nor undefined). We don't need curly braces because this is JavaScript, not JSX yet.
                    return (  
                        <div className="row"> {/*In JSX, can only have one element */}
                            {/*Calling the renderCampsite method and passing campsite into it. We need curly braces because the things inside of the return is in JSX. If we have JavaScript in JSX, we need curly braces.*/}
                            {this.renderCampsite(this.props.campsite)}
                            
                            {/* Calling the renderComments method and pasing in the campsite object's comments array (it is passing in as an attribute). The comments array data will be the variable comments in the renderComments() method on line 21. */}
                            {this.renderComments(this.props.campsite.comments)} {/*Since comments is within the campsite object, we have to use this.props.campsite.comments */}
                        </div>                 
                    ); 
                } else {
                   return ( <div></div> ); //Returning an empty div 
                }       
    }
}

export default CampsiteInfo;