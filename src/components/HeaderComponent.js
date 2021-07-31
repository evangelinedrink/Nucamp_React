import React, {Component} from "react"; //Importing React
import {Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, Collapse, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
//Header Class Component. We are moving the NavBar from the MainComponent to this Header Component
class Header extends Component {
    //Updating the NavBar in the Header component so that it will be responsive. We will be adding a couple of items to the NavBar's state to help with the NavbarToggler.
    constructor(props) {
        super(props);

        //Binding the event handler, this event handler is called toggleNave, to the event component
        //Binding the event handler ensures that when toggleNave is called, then the "this" keyword inside of it refers correctly to the component. 
        this.toggleNave= this.toggleNav.bind(this); 
        
        this.state= {
            isNavOpen: false,
        };
    }

    //Method that will run when the NavBar is clicked on by the user.
    //When this method is clicked on, it will set the state to the opposite of its current state (so if it is false initially, it will be set to true)
    toggleNav() {
        this.setState( {
            isNavOpen: !this.state.isNavOpen //Setting the state for isNaveOpen to the opposite of its current state
        });
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
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;