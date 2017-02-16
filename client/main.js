import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeList from './components/employee_list';

const App = () => {
    return (
        <EmployeeList />    //call the EmployeeList const/function. In this case the EmployeeList is a class
    );
};
// After Meteor loads in the browser, render my app to the DOM
// Meteor.startup => run code when the client or server starts.
Meteor.startup(() => {
    // React render call, to render the stuff in the class=container
    ReactDOM.render(<App />, document.querySelector('.container'));
});
