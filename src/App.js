//Presentation Content (the visual content) is inside of the App.js file
import React, {Component} from "react";
import Main from "./components/MainComponent"; //importing the Main Component
import {BrowserRouter} from "react-router-dom"; //Importing the BrowserRouter. BrowserRouter is the top-level parent component that wraps around all other React-Router components. React Router is needed to build a Single Page Application (SPA).
import {Provider} from "react-redux"; //Importing the Provider Component from React-Redux
import {ConfigureStore} from "./redux/configureStore";//Importing the ConfigureStore function
import './App.css';

//App.js file will take the store that is being returned from ConfigureStore, so we are making a constant to equal the store (capturing the store)
const store= ConfigureStore();

class App extends Component {
  render() { //When we are using (rendering) React components, the syntax will look like HTML or JSX tags with the angle brackets, <>. React components are capitalized, so Navbar and NavbarBarnd are React components.
    return (
      /*Provider Component having store as an attribute will make the Redux Store available to all connected components that are children of App.js*/
      <Provider store={store}>
        <BrowserRouter> {/*BrowserRouter is the top-level parent component that wraps around all other React-Router components. React Router is needed to build a Single Page Application (SPA). */}
          <div className= "App">
            <Main /> {/*Rendering (displaying) the Main Component on the web page. */}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
