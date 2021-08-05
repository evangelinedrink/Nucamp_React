//Contact Component is a Presentational Functional Component
import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col} from "reactstrap"; //Importing ReactStrap Card component
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

    //handleSubmit method that will log the current state to the console.
    handleSubmit(event) {
        console.log("Current state is: " + JSON.stringify(this.state)); //console log expects a string and not an object. JavaScript has a handy tool called JSON.stringify that will turn an object into a string  
        alert("Current state is: " + JSON.stringify(this.state)); //This will produce an alert
        //When you submit a form, it usually refreshes the entire page, but we don't want this to happen. We stop that by using event.preventDefault()
        event.preventDefault();
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
                        <Form onSubmit={this.handleSubmit}> {/*This corresponds to when the user clicks on the submit button, the handleSubmit method will start running. It is located in the top element of the <Form> element */}
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName} /*This is the value that is going to change depending on what the user types in. It will change the state information for firstName */
                                        onChange={this.handleInputChange} /> {/*Each Input Component has its own onChange event handler method connected to handleInputChange method. So, when the user clicks on each element, the handleInputChange method will be activated */}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label> {/*Since we are using JSX, we use htmlFor to stand for For. md={2} is equivalent to className="col-md-2" */}
                                <Col md={10}> {/*md={10} is equivalent to className="col-md-10" */}
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={this.handleInputChange} />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
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