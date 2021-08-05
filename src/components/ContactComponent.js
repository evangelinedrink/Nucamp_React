//Contact Component is a Presentational Functional Component
import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback} from "reactstrap"; //Importing ReactStrap Card component
import {Link} from "react-router-dom"; //Importing Link from React Router DOM (Link). Link creates links to a path, it is used just like an anchor element <a>

//Contact Component is now a Class Component
class Contact extends Component {
    constructor(props) {
        super(props);

        //These are state properties to correspond to the Contact Form inputs
        this.state= {
            //Properties that expect a string value will be set to an empty string
            firstName: " ",
            lastName: " ",
            phoneNum: " ",
            email: " ",
            agree: false, //This is a Boolean value, so its initial value is False (this is if the person agrees to be contacted or not)
            contactType: "By Phone", //Default value on how the user would like to be contacted is By Phone
            feedback: " ",
            //This touched property determines if the user touched the form or not with their mouse. 
            //An event called Blur will be run and will let us know if a user has touched a text input field and then leaves it.
            touched: {
                firstName: false, //This checks to see if the user has clicked their mouse in the text fields for their first and last names and also their phone number or email.
                lastName: false, //This doesn't mean they have entered any information in these fields, just that they have clicked their mouse in the text fields.
                phoneNum: false,
                email: false,
            }
        };

        //Binding the "this" keyword to the handleInputChange method
        //The "this" binding makes it so we can use the "this" keyword inside the handleInputChange method and have it point to the correct object.
        this.handleInputChange= this.handleInputChange.bind(this);

        //Binding the handleSubmit event handler. We do this because when we refer to this.state in the handleSubmit method, it knows to look for that state in the constructor of this component. 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Class Methods: One to handle changes to class elements and one to handle form submissions
    //handleInputChange is a Class Method that handles changes made in the elements
    //We are passing in an event object that is called "event"
    handleInputChange(event) {
        const target= event.target; 
        const name= target.name;
        //Using the ternary operator in value to check and see if Checkbox is true, than we get a value from the target.checked attribute (checked attribute is a Boolean attribute meaning it can be either true or false) and if it is not a checkbox then we get the value from the target's value.
        const value= target.type ==="checkbox" ? target.checked: target.value; 

        //This will set the property based on the target's name
        this.setState({
            //The name is based on the user's input in the form that was changed. We get this from the event object that was passed in.
            [name]: value //The value is based on whatever the value variable from line 34 is.
        });
    }

    //validate is a new method that will validate the information that has been entered in the Form.
    //We are passing in the values that we wish to validate.
    validate(firstName, lastName, phoneNum, email) {
        //Setting up an errors object. The properties of this object will hold the error messages for the four fields (last name, first name, email and phone number) if there are errors.
        const errors = {
            firstName: " ",
            lastName: " ",
            phoneNum: " ",
            email: " ",
        };

        //This If statement checks to see if the firstName input has been touched by the user
        if(this.state.touched.firstName) {
            if(firstName.length < 2) {
                errors.firstName= "First name must be at least 2 characters.";
            } else if (firstName.length > 15) {
                errors.firstName= "First name must be 15 or less characters.";
            }
        }

        //This If statement checks to see if the lastName input has been touched by the user
        if(this.state.touched.lastName) {
            if(lastName.length < 2) {
                errors.lastName= "Last name must be at least 2 characters.";
            } else if (lastName.length > 15) {
                errors.lastName= "Last name must be 15 or less characters.";
            }
        }

        //To validate the phone number, a RegEx will be used to validate the phone number
        //RegEx specifies a pattern to be matched and can be used to return True or False if the pattern matched or not
        //The code below ensures that the phone number only contains digits.
        const reg= /^\d+$/; //The ^ means starts with, \d means digits, + means digits can occur at least 2 times and the $ means ends with (in this case ends with a digit). 
        //If Statement ensures if the user has touched the phone number input box and if the user has entered a phone number that isn't a digit
        if(this.state.touched.phoneNum && !reg.test(phoneNum)) {
            errors.phoneNum= "The phone number should contain only numbers.";
        } 

        //Checking to see if the email field has been touched by the user and if the user placed an email with and @ symbol
        if (this.state.touched.email && !email.includes("@")) {
            errors.email= "Email should contain an @ ";
        }

        //The code below will return the errors object. If there were any validation errors, then the corresponding property in the errors object would contain a message. Otherwise, it will be an empty string.
        return errors;
    }

    //handleBlur event handler method: Used to check and see if a user has clicked on the text input fields for first and last names, phone number and email
    //Because we are passing in an argument other than event, we need to wrap the handleBlur method in another function. We are using arrow functions to define this method, so we don't need to bind the "this" keyword
    handleBlur = (field) => () => {
        this.setState ({
            touched: {...this.state.touched, [field]: true}//We only want to change one of the properties inside of the touched state. To do this, we can use the Spread Syntax to select only the thing that we want to change (in this case we are changing the [field] that the user clicked on (the field that triggered this handleBlur event handler to run)). True means the property has been touched.  
        });
    }

    //handleSubmit method that will log the current state to the console.
    handleSubmit(event) {
        console.log("Current state is: " + JSON.stringify(this.state)); //console log expects a string and not an object. JavaScript has a handy tool called JSON.stringify that will turn an object into a string  
        alert("Current state is: " + JSON.stringify(this.state)); //This will produce an alert
        //When you submit a form, it usually refreshes the entire page, but we don't want this to happen. We stop that by using event.preventDefault()
        event.preventDefault();
    }

    render() {

        //Declaring a variable here named errors
        //Variables declared inside functions and methods are locally scoped, so the errors variable above is not available here
        //This will call the validate method using the this.validate and pass it the current values of firstName, lastName, phoneNum and email that are currently stored in the state.
        //The validate method will validate those fields and return the errors function which is stored in this errors variable.
        //Anytime there is a change in teh input fields, this component will be rendered, so this validate method will be called at every change
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email);

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            {/*The attribute of active means that when the user is in the Directory Component, the Directory breadcrumb will appear as the active component */}
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>

                        <h2>Contact Us</h2> {/*Header for Contact Us */}
                        <hr /> {/*Horizontal Rule */}
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>

                {/*Controlled Form for Contact Us page */}
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <Form onSubmit={this.handleSubmit}> {/*This corresponds to when the user clicks on the submit button, the handleSubmit method will start running. It is located in the top element of the <Form> element */}
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName} /*This is the value that is going to change depending on what the user types in. It will change the state information for firstName */
                                        invalid={errors.firstName} //Invalid attribute will be a Boolean attribute, so for its value, we will set a conditional to see if there is an error. An empty string will evaluate as False, but if the error message was not an empty string it will evaluate as True.
                                        onBlur={this.handleBlur("firstName")} //Anytime a user clicks the input field to place their first name, it will fire this event handler named handleBlur.
                                        onChange={this.handleInputChange} /> {/*Each Input Component has its own onChange event handler method connected to handleInputChange method. So, when the user clicks on each element, the handleInputChange method will be activated */}
                                        {/*Then below each of the four inputs we are validating, we will render the FormFeedback component that will display the error message*/}
                                        <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label> {/*Since we are using JSX, we use htmlFor to stand for For. md={2} is equivalent to className="col-md-2" */}
                                <Col md={10}> {/*md={10} is equivalent to className="col-md-10" */}
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName} //Invalid attribute will be a Boolean attribute, so for its value, we will set a conditional to see if there is an error. An empty string will evaluate as False, but if the error message was not an empty string it will evaluate as True.
                                        onBlur={this.handleBlur("lastName")} //Anytime a user clicks the input field to place their last name, it will fire this event handler named handleBlur.
                                        onChange={this.handleInputChange} />
                                        {/*Then below each of the four inputs we are validating, we will render the FormFeedback component that will display the error message*/}
                                        <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum} //Invalid attribute will be a Boolean attribute, so for its value, we will set a conditional to see if there is an error. An empty string will evaluate as False, but if the error message was not an empty string it will evaluate as True.
                                        onBlur={this.handleBlur("phoneNum")} //Anytime a user clicks the input field to place their phone number, it will fire this event handler named handleBlur.
                                        onChange={this.handleInputChange} />
                                        {/*Then below each of the four inputs we are validating, we will render the FormFeedback component that will display the error message*/}
                                        <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email} //Invalid attribute will be a Boolean attribute, so for its value, we will set a conditional to see if there is an error. An empty string will evaluate as False, but if the error message was not an empty string it will evaluate as True.
                                        onBlur={this.handleBlur("email")} //Anytime a user clicks the input field to place their email, it will fire this event handler named handleBlur.
                                        onChange={this.handleInputChange} />
                                        {/*Then below each of the four inputs we are validating, we will render the FormFeedback component that will display the error message*/}
                                        <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}> {/*size corresponds to the offset column size and the offset. This will render out as <div class="col-md-4 offset-md-2">  */}
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree} //This is for the checked box. Its value defined by the user will change the agree value from either True or False
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}> {/*This will render out as <div class="col-md-10 offset-md-2" */}
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
           
            </div>
        );
    }
}

export default Contact;