import { Mongo } from 'meteor/mongo';

// creating the mongoDB database -> name it Employees
export const Employees = new Mongo.Collection('employees');
