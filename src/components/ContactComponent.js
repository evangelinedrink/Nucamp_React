//Contact Component is a Presentational Functional Component
import React from 'react';
import {Breadcrumb, BreadcrumbItem} from "reactstrap"; //Importing ReactStrap Card component
import {Link} from "react-router-dom"; //Importing Link from React Router DOM (Link). Link creates links to a path, it is used just like an anchor element <a>

function Contact(props) {
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
        </div>
    );
}

export default Contact;