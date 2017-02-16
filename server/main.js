import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
// importing the database
import { Employees } from  '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
   // Great place to generate data adn to access shared variables from other files.

    // Check to see if data exist in the collections
    // this returns a curser, not an array

    // shows the total number of Employees data. return everything.
    const numberRecords = Employees.find({}).count();
    // this console.log shows up in the terminal
    console.log("Total number of records: " + numberRecords);
    // if there are no records available,...
    // Generate 5000 times of name, email and phone
    if (!numberRecords) {
        // Generate some data
        _.times(5000, () => {       // repeat the following code 5000 times.
            const { name, email, phone } = helpers.createCard();
            // const name = helpers.createCard().name;      this is an es6 deconstruction thing
            // const email = helpers.createCard().email;
            // const phone = helpers.createCard().phone;
            Employees.insert({
                // name: name,
                // email: email,
                // phone: phone
                // es6 syntax
                name, email, phone,
                avatar: image.avatar()
            });
        });
    }

    Meteor.publish('employees', function(per_page) {
        // find all the record that it exists (query, projection)
        return Employees.find({}, { limit: per_page });
    });
});
