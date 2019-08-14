import { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'organizations', path: '/admin/organizations', componentName: 'OrganizationsList' });
addRoute({ name: 'organizations.register', path: '/register/:id', componentName: 'OrganizationsRegister'});
