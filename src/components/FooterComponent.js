//Footer Component is going to be a Functional Component.
import React from "react"; //Importing React
import {Link} from "react-router-dom"; //Importing the Link component (this creates links to a path to take the user) 

function Footer(props) {
    return (
        /*Footer JSX element. this lowercase footer element will render as an HTML element called footer */
        <footer className="site-footer">
             <div className="container">
                <div className="row">             
                    <div className="col-4 col-sm-2 offset-1">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            {/*Using the Link Component <Link> to create links to a path to take the user in the website. The "to" attribute with the appropriate path to take the user   */}
                            {/*We are using <Link> instead of anchor tab, <a> because we want to ensure that each of these links are handled wit hthe React Handle Library (creates a single page application, which will make the website run faster) */}
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/directory">Directory</Link></li>
                            <li><Link to="/aboutus">About</Link></li>
                            <li><Link to="/contactus">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-sm-3 text-center">
                        <h5>Social</h5>
                        <a className="btn btn-social-icon btn-instagram" href="http://instagram.com/"><i className="fa fa-instagram" /></a>{' '} {/*JSX handles white spaces differently. White Spaces are added by {' '}, where the curly braces represents that this is a JavaScript technique.  */}
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/"><i className="fa fa-facebook" /></a>{' '} {/*This {' '} gives spaces between the icons for Instagram, Facebook, Twitter, and Youtube since they are at the end of each code. */}
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter" /></a>{' '} {/*i element can't be written as a self-closing tag in HTML, but JSX allows any element to be a self-closing one if there is nothing to put after the element. */}
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube" /></a> 
                    </div>
                    <div className="col-sm-4 text-center">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:notreal@notreal.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;