import Users from 'meteor/vulcan:users';

const adminActions = [
  'organization.create',
  'organization.update.all',
  'organization.delete.all',
];
Users.groups.admins.can(adminActions);
