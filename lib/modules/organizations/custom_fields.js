/*

Custom fields on Users collection

*/

import Users from 'meteor/vulcan:users';

Users.addField([
    /**
    organizationId on user registration
  */
  {
    fieldName: 'organizationId',
    fieldSchema: {
      type: String,
      optional: true,
      canRead: ['admins'],
      canUpdate: ['admins'],
      canCreate: ['guests'],
    }
  },
]);
