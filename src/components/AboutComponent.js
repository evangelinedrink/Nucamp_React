import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from "./LoadingComponent"; //Importing the Loading component
import {baseUrl} from "../shared/baseUrl"; //Importing baseUrl from the shared folder

function About(props) {

    //RenderPartner Functional Component. Desconstruct a property named partner from the props object that is being passed into this RenderPartner Functional component
    function RenderPartner({partner}) {
        if(partner) { //Checks to see if the partner object contains a truthy value. Variable that is declared but not assigned (does not have a values attached to it), will be considered undefined and an undefined value is considered falsy. This is why we can just place the name (variable) of the object to test if it is truthy (has values) or is undefined (falsy).
            return(
                <React.Fragment>
                    {/*Self-Closing Media component */}
                    <Media object src={baseUrl + partner.image} alt={partner.name} width="150" /> 
                
                    <Media body className="ml-5 mb-4"> {/*Media component with boolean attribute of body */}
                        <Media heading>
                            {partner.name} {/*Providing the name of the partner in the Heading of this Media Component */}
                        </Media>

                        {/*Providing the Partner's Description in the second Media Component */}
                        {partner.description}
                    </Media>

                </React.Fragment>
            );

        } else {
            return (
                /*Returning an empty div is the partner object is not truthy */
                <div></div>
            );
        }
    }

    //PartnerList Functional Component. 
    function PartnerList(props) {
        const partners = props.partners.partners.map(partner => { //Since we didn't deconstruct the props out (we would do this by placing {partners} in the parameter list in line 38), we have to use props.partners.partners to refer to the partners array in the partners object. If we did the deconstruction in the parameter list, we could write in this line "partners.map"
            return (
                <Media tag="li" key={partner.id}>
                    {/*Rendering the RenderPartner component in this Media component.  */}
                    {/*We are passing in the current partner object as a prop to the RenderPartner component. The name of this partner object is "partner" (its name is to the left of the equal sign). We dont have to call it partner, we could call it props, but in RenderPartners function, we would be destructuring props and not partners (tried this and it works) */}
                    <RenderPartner partner={partner} />
                </Media>
            );
        });

        //If statement that will handle if the partners data is loading by returning the <Loading /> component. Only returns this component and nothing else
        //When partners data is loading, display loading symbol
        if(props.partners.isLoading) { //This isLoading is from the partners state in partners.js. It was passed in the to AboutComponent in the MainComponent.js file (line 152): <Route exact path="/aboutus" render={() => <About partners={this.props.partners} />} />
            return <Loading />
        }

        //If statement that will handle if there is an error message while trying to load
        if(props.partners.errMess) { //This is from the errMess in the partners state in the partners.js file (line 10)
            return (
            <div className="col">
                <h4>{props.partners.errMess}</h4> {/*Returning the error message to be displayed to the user */}
            </div>
            );
        }
 
        //Displaying information about the Partner after the page has loaded (isLoading) and there are no errors (errMess)
        //Need a return statement so the function will not return undefined (nothing with show up in the web browser). Return statement is needed when inside of functional components
        return (
        <div className="col mt-4">
            <Media list>
                {partners}
            </Media>
        </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Our Mission</h3>
                    <p>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Facts At a Glance</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">February 3, 2016</dd>
                                <dt className="col-6">No. of Campsites in 2019</dt>
                                <dd className="col-6">563</dd>
                                <dt className="col-6">No. of Reviews in 2019</dt>
                                <dd className="col-6">4388</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">42</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col">
                    <Card className="bg-light mt-3">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">I will not follow where the path may lead, but I will go where there is no path, and I will leave a trail.</p>
                                <footer className="blockquote-footer">Muriel Strode,{' '}
                                    <cite title="Source Title">"Wind-Wafted Wild Flowers" -
                                    The Open Court, 1903</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>

                {/*Passing in the prop partners={props.partners} to the PartnerList component. The information from the ParnterList component will be displayed in this section of the webpage */}
                <PartnerList partners={props.partners} />
            </div>
        </div>
    );
}

export default About;