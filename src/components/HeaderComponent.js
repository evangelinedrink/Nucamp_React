import React, {Component} from "react"; //Importing React
import {Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from "reactstrap";
import {NavLink} from "react-router-dom";
//Header Class Component. We are moving the NavBar from the MainComponent to this Header Component
class Header extends Component {
    //Updating the NavBar in the Header component so that it will be responsive. We will be adding a couple of items to the NavBar's state to help with the NavbarToggler.
    constructor(props) {
        super(props);
        
        this.state= {
            isNavOpen: false,
            //For the Login Modal to open and close, we are creating a Boolean State 
            isModalOpen: false, //This will keep track if the Login Modal is open or closed
        };

        //Binding the event handler, this event handler is called toggleNave, to the event component
        //Binding the event handler ensures that when toggleNave is called, then the "this" keyword inside of it refers correctly to the component. 
        this.toggleNav= this.toggleNav.bind(this); 
        //Binding the toggleModal with the "this" keyword
        this.toggleModal= this.toggleModal.bind(this);
        //Binding the handleLogin with the "this" keyword
        this.handleLogin= this.handleLogin.bind(this);
    }

    //Method that will run when the NavBar is clicked on by the user.
    //When this method is clicked on, it will set the state to the opposite of its current state (so if it is false initially, it will be set to true)
    toggleNav() {
        this.setState( {
            isNavOpen: !this.state.isNavOpen //Setting the state for isNaveOpen to the opposite of its current state
        });
    }

    //Method that will run when the Login Modal is clicked on by the user.
    //When this method is clicked on, it will set the state to the opposite of its current state (so if it is false initially, it will be set to true)
    toggleModal() {
        this.setState( {
            isModalOpen: !this.state.isModalOpen //Setting the state for isNaveOpen to the opposite of its current state
        });
    }

    //Method that handles the login of the user. This is not a backend to authenticate the user's information, so it will alert us to the form values when it is submitted.
    handleLogin(event) {
        //Where did the Username, Password, and Remember values get set? They aren't in the constructor, so they are being pulled from the form that the user inputed their data by using React's ref. React's ref will get the values that the user inputed and place them here. 
        alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        this.toggleModal(); //This will close the Login Modal by calling on the toggleModal() method by setting its value to False.
        event.preventDefault(); //Prevents the entire page from being re-rendered (from refreshing automatically)
    }

    render() {
        return ( /*We are using JSX within this return statement. React only lets us return one element from the component, this is why we wrap all in a React.Fragment.*/
            <React.Fragment> {/*React.Fragment does not create another node in the DOM, unlike a <div> that will create another DOM node. React.Fragment will only let us return a single element, so it satisfies the React requirment.*/}
                <Jumbotron fluid> 
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>NuCamp</h1>
                                <h2>A Better Way To Camp</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                {/*expand="md" makes sure to let the NavBar collapse  and show the toggler for viewports smaller than medium (this concept if from Bootstrap)*/}
                <Navbar dark sticky="top" expand="md"> {/*Creating a Navbar to be seen on the website. sticky top means the navbar stays at the top of the web page*/}
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"> {/*"mr-auto" helps with allignment*/}
                            <img src="/assets/images/logo.png" height="30" width="30" alt="NuCampLogo" />
                        </NavbarBrand> 

                        {/*NavbarToggler component will create the toggle button*/}
                        <NavbarToggler onClick={this.toggleNav} /> {/*onClick event handler is passed in as a prop.  With the onClick event handler, when the user clicks on the Navbar Toggler, the toggleNav method in lines 21-25 will start running and change the isNavOpen to the opposite value*/}
                    
                        {/*Creating the NavLinks by wrapping it inside of a Collapse component*/}
                        <Collapse isOpen={this.state.isNavOpen} navbar> {/*isOpen attribute will either be false or true depending on the current state of isNavOpen   */}
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className= "nav-link" to="/home">
                                        {/*Font Awesome Icon for Home */}
                                        <i className="fa fa-home fa-lg" /> Home
                                    </NavLink> 
                                </NavItem>

                                <NavItem>
                                    <NavLink className= "nav-link" to="/directory">
                                        {/*Font Awesome Icon for a List */}
                                        <i className="fa fa-list fa-lg" /> Directory
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className= "nav-link" to="/aboutus">
                                        {/*Font Awesome Icon for an Info Icon */}
                                        <i className="fa fa-info fa-lg" /> About Us
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className= "nav-link" to="/contactus">
                                        {/*Font Awesome Icon for Home */}
                                        <i className="fa fa-address-card fa-lg" /> Contact Us
                                    </NavLink>
                                </NavItem>

                            </Nav>

                            {/*Login button will appear in the Collapse menu, which is why it is in the Collapse element */}
                            <span className="navbar-text ml-auto">
                                <Button outline onClick={this.toggleModal}>
                                    <i className= "fa fa-sign-in fa-lg" /> Login
                                </Button>
                            </span>
                        </Collapse>
                    </div>
                </Navbar>

                {/*Modal Component to create the Login for the Nucamp website */}
                {/*There are 2 built in attributes for the ReactStrap Modal component: isOpen and Toggle */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> {/*When isOpen is set to False, the Modal will be closed or hidden. If this.state.isModalOpen set to True, the modal is open.*/}
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader> {/*toggleModal method will let us close the modal when it has been opened.  */}
                    <ModalBody>
                        <Form onSubmit = {this.handleLogin}> {/*Login Form that user will fill out */}
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" 
                                innerRef={input => this.username = input} //This is using React's ref to get values that the user typed in for forms that are Uncontrolled Forms. What the user typed in will be the this.username and its value will be equal to the input variable
                                />
                            </FormGroup>

                            <FormGroup>
                            <   Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" 
                                innerRef={input => this.password = input} //This is using React's ref to get values that the user typed in for forms that are Uncontrolled Forms. What the user typed in will be the this.password and its value will be equal to the input variable
                                />
                            </FormGroup>

                            <FormGroup check> {/*This component is for a checkbox, which is why we need to have a check attribute in the FormGroup */}
                                <Label check>
                                    <Input type="checkbox" name="remember" /*We dont need an ID for the input nor an HTML For for the label because when you nest input inside of a label, it is clear what hte label is for.  */
                                    innerRef= {input => this.remember= input} //This is using React's ref to get values that the user typed in for forms that are Uncontrolled Forms. What the user typed in will be the this.remember and its value will be equal to the input variable
                                    />  
                                    Remember me
                                </Label> 
                            </FormGroup>

                            {/*This will create a Login button that the user can click on to submit their data */}
                            <Button type="submit" value="submit" color="primary">Login</Button>

                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;