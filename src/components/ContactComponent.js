//Contact Component is a Presentational Functional Component
import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Label, Col, Row} from "reactstrap"; //Importing ReactStrap Card component
import {Link} from "react-router-dom"; //Importing Link from React Router DOM (Link). Link creates links to a path, it is used just like an anchor element <a>
import {Control, LocalForm} from "react-redux-form"; //React-Redux-Form Will store the Form State in the Redux Store
//Contact Form is going to use the Redux Store. All State data is stored in the Redux Store because it is the Single Source of Truth for the Application state.
//React-Redux-Form Will store the Form State in the Redux Store

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
        //The "this" binding makes it so we can use the "this" keyword inside the handleSubmit method and have it point to the correct object.
        //Binding the handleSubmit event handler. We do this because when we refer to this.state in the handleSubmit method, it knows to look for that state in the constructor of this component. 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Class Methods: One to handle changes to class elements and one to handle form submissions

    //handleSubmit method that will log the current state to the console.
    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values)); //console log expects a string and not an object. JavaScript has a handy tool called JSON.stringify that will turn an object into a string  
        alert("Current state is: " + JSON.stringify(values)); //This will produce an alert
    }

    render() {

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
                        <LocalForm onSubmit={values => this.handleSubmit(values)}> {/*This corresponds to when the user clicks on the submit button, the handleSubmit method will start running. It is located in the top element of the <Form> element */}
                            <Row className="form-group"> {/*We are using Row and className="form-group" because we are no longer using the FormGroup component from ReactStrap since it only works with Form component from ReactStrap.  */}
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName" //Control is from React-Redux Form and text means that it is a text type. Each of these Control components needs a model attribute. This tells Redux that the value for this field will be stored in State under the property named firstName. Add the . at the beginning for the model attribute  
                                        placeholder="First Name"
                                        className="form-control" //Form-control  is used for textual inputs to help with the general appearance, focus state, sizing and more.
                                       /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label> {/*Since we are using JSX, we use htmlFor to stand for For. md={2} is equivalent to className="col-md-2" */}
                                <Col md={10}> {/*md={10} is equivalent to className="col-md-10" */}
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control" //Form-control  is used for textual inputs to help with the general appearance, focus state, sizing and more.
                                        />
                                       
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum" //The model attribute has the same value as the name attribute, except that it has a . in front of it.
                                        placeholder="Phone number"
                                        className="form-control" //Form-control  is used for textual inputs to help with the general appearance, focus state, sizing and more.
                                        />
                                       
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control" //Form-control  is used for textual inputs to help with the general appearance, focus state, sizing and more.
                                    />
                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}> {/*size corresponds to the offset column size and the offset. This will render out as <div class="col-md-4 offset-md-2">  */}
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox //Control is from the React Redux Form and checkbox is the type
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                                 /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model=".contactType" name="contactType">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"/> {/*Form-control  is used for textual inputs to help with the general appearance, focus state, sizing and more.*/}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}> {/*This will render out as <div class="col-md-10 offset-md-2" */}
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
           
            </div>
        );
    }
}

export default Contact;