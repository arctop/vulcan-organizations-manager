/*

Adding users with organization group name

*/
import Organizations from '../../modules/organizations/collection'
import { addCallback } from 'meteor/vulcan:core';

/**
 * @summary Adding user with organization group name before adding to database
 */
function UsersAddOrganizationGroupName(user, options) {
  if (user.organizationId) {
    user.groups = [Organizations.findOne(user.organizationId).groupName, 'clients', 'members'];
  }
}

addCallback('user.create.before', UsersAddOrganizationGroupName);
