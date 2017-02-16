import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// why do we need the createContainer packge from react-meteor-data?
// the react-meteor-data data is for creating containers
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {  //that why need to import { Component }

    // componentWillMount:
    // Invoked ONCE, both on the client and server, immediately before the initial rendering occurs.
    // If you call setState within this method, render() will see the updated state
    // and will be executed only once despite the state change.

    componentWillMount() {
        // Fantastic place to load data as it load before startup
        this.page = 1;
    }

    // this handleButtonClick function is a user created function
    handleButtonClick() {
      // this subscribe is to subscribe to the 'employees' mongoDB database, found in the server/main.js
      // this below returns he collection of people based on the number of PER_PAGE
        Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
        this.page += 1;
    }

    // props.employees => an array of employee objects
    // inside the class always have the render and the return method.

    // this.props.employees.map(function(employee) {
    //   return <function(key, employee)>
    // })

    // props => a way of passing data from parent to child.
    render() {
        return (
            <div>
                <div className="employee-list">
                    {this.props.employees.map(employee =>
                        <EmployeeDetail key={employee._id} employee={employee} />
                    )}
                </div>
                <button onClick={this.handleButtonClick.bind(this)}
                        className="btn btn-primary">
                    Load More ...
                </button>
            </div>
        );
    }
};

// createContainer handles the Meteor's reactivity
// The components created with createContainer will re-render when your reactive data changes and they
// send a new set of props to the actual components.
export default createContainer(() => {
    // set up subscription
    // subscribe to te Meteor.publish method.
    Meteor.subscribe('employees', PER_PAGE);

    // return an object.  Whatever we return will be sent to EmployeeList
    // as props
    // this employees will be passed to the props.employees.map as data.
    // Rmb this employees is a prop that re-renders everytime it notices a change in EmployeeList
    return { employees: Employees.find({}).fetch() };
}, EmployeeList);
