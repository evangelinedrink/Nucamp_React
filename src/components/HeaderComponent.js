import React, {Component} from "react"; //Importing React
import {Navbar, NavbarBrand, Jumbotron } from "reactstrap";

//Header Class Component. We are moving the NavBar from the MainComponent to this Header Component
class Header extends Component {
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
                <Navbar dark sticky="top"> {/*Creating a Navbar to be seen on the website. sticky top means the navbar stays at the top of the web page*/}
                    <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;