import React from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, Label, ModalHeader, ModalBody} from "reactstrap"; //Importing ReactStrap Card Component
import {Link} from "react-router-dom"; //Importing Link from React Router DOM (Link). Link creates links to a path, it is used just like an anchor element <a>
import {Control, LocalForm, Errors} from "react-redux-form"; //React-Redux-Form Will store the Form State in the Redux Store
//CampsiteInfo Class component is going to be split up into three Functional Components (one for each of the methods that were in the Class Component)
//By creating three Functional Components (one for each method), we will not have one big Class Component handling everything. Each Functional Component will be handling different parts.

//Validation to make sure what is written in the Contact Us Form is valid
//First parameter for maxLength takes the maximum length (len) and the second one takes the value (val) which is the input string typed in by the user 
//We want maxLength to return True if the maxLength has not been succeeded. !val will return true because if there is no value, the maximum length hasn't been succeeded.
//We are also checking if the val.length is less than or equal to the length.
//If both of these conditions are False, then this maxLength function will return False and will fail the test for maxLength and will return an error 
const maxLength = len => val => !val || (val.length <=len);
//minLenght function will be true if there is a value (val) and the value's length is greater or equal to the length
 const minLength= len => val => val && (val.length >=len);

//Creating the CommentForm class component
class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            isModalOpen: false,
        };

        //Binding the toggleMoadl with the "this" keyword
        this.toggleModal= this.toggleModal.bind(this);

        //Binding the "this" keyword to the handleInputChange method
        //The "this" binding makes it so we can use the "this" keyword inside the handleSubmit method and have it point to the correct object.
        //Binding the handleSubmit event handler. We do this because when we refer to this.state in the handleSubmit method, it knows to look for that state in the constructor of this component. 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Method that will run when the Comment Modal when it is clicked on by the user.
    //When this method is clicked on, it will set the state to the opposite of its current state (so if it is false initially, it will be set to true)
    toggleModal() {
        this.setState( {
            isModalOpen: !this.state.isModalOpen //Setting the state for isModalOpen to the opposite of its current state
        });
    }

    //handleSubmit method that will log the current state to the console. When the user clicks on the Submit Comment button, this method will start running
    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values)); //console log expects a string and not an object. JavaScript has a handy tool called JSON.stringify that will turn an object into a string  
        alert("Current state is: " + JSON.stringify(values)); //This will produce an alert
    }

    render() {
        return (
            <div>
                {/*Button to Submit Comment. When the user clicks on the Submit Comment button, they will be taken to the Modal where they can write a comment */}
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg"/> Submit Comment
                </Button>
                
                {/*Modal Component containing a React REdux form for users to submit their comments. isOpen is an attribute defined in ReactStrap */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> {/*When isOpen is set to False, the Modal will be closed or hidden. If this.state.isModalOpen set to True, the modal is open.*/}
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader> {/*toggleModal method will let us close the modal when it has been opened.  */}
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}> {/*This corresponds to when the user clicks on the submit button, the handleSubmit method will start running. */}
                                {/*This is for the rating control inputs */}
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label> {/*Rating section of form*/}
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control"> {/*Form-control  is used for textual inputs to help with the general appearance, focus state, sizing and more.
                                        //validators attribute contains the functions that are appropriate for this component to check to see if the user has submitted the correct values in the Form */}
                                        <option>Select Rating</option> {/*User has to click and select a rating, otherwise it won't show up in the Alert box. I don't know why this happens */}
                                        <option value="5">5</option>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                        <option value="2">2</option>
                                        <option value="1">1</option>
                                    </Control.select>
                                </div>

                                {/*This is for the author control inputs */}
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" className="form-control"
                                    //validators attribute contains the functions that are appropriate for this component to check to see if the user has submitted the correct values in the Form
                                    validators={{
                                        minLength: minLength(2), //Ensures that the author field is at least 2 characters long
                                        maxLength: maxLength(15), //Ensures that the author field is less than or equal to 15 characters long
                                    }}
                                    
                                    />
                                    
                                    {/*Errors component is added */}
                                    <Errors
                                            className="text-danger" //Makes error color red
                                            model=".author"//model needs to match the model of the corresponding control component
                                            show="touched" //Only show error messages if it has been touched by the user (clicked on by the user)
                                            component="div" //This tells React-Redux form to wrap all the errors in a div
                                            messages= {{ //These are the error messages that will show when the values of these functions return False
                                                minLength: "Must be at least 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                    />
                                </div>

                                {/*This is for the text control inputs */}
                                <div className="form-group">
                                    <Label htmlFor="text">Comment</Label>
                                    <Control.textarea model=".text" rows="6" id="text" name="text" className="form-control">

                                    </Control.textarea>
                                </div>

                                {/*This will create a Submit button that the user can click on to submit their comment */}
                                {/*Type submit means that when this button is clicked, all the information will then go to the onSubmit location. */}
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            
                            </LocalForm>
                        </ModalBody>
                </Modal>



            </div>
        );
    }
}

//RenderCampsite Functional Component. campsite is a property of props, but it is destructured using the Object Destructuring.
//Its parameter, campsite, has been defined in the render() method in line 54. The parameter named campsite = this.props.campsite. This is why we don't have to write this.props.campsite here to get the campsite data.
function RenderCampsite({campsite}) { //campsite is this Functional Component's only parameter in its parameter list. Curly braces destructures it, so that we don't need the name of the parameter (in this case it is campsite)
    return (
        <div className="col-md-5 m-1">
            <Card> {/*If there is an Object in Campsite, campsite=true, then a Card will be displayed that shows the campsite and its descriptions*/}
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
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

                {/*Displaying (rendering) the Submit Comment button. */}
                <CommentForm />
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
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            {/*The attribute of active means that when the user is in the Campsite Info Component, this breadcrumb will appear as the active component */}
                            {/*We will have a dynamic text (meaning it changes based on which campsite the user has clicked on). The {props.campsite.name} will display the name of the campsite that the user selected */}
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>

                        <h2>{props.campsite.name}</h2> {/*Header contains dynamic text which will show the name of the campsite that the user clicked on */}
                        <hr /> {/*Horizontal Rule */}
                    </div>
                </div>
                
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