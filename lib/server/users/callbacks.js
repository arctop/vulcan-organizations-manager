/*

Adding users with organization group name

*/
import Organizations from '../../modules/organizations/collection'
import { addCallback } from 'meteor/vulcan:core';

/**
 * @summary Adding user with organization group name before adding to database
 */
function UsersAddOrganizationslug(user, options) {
  if (user.organizationId) {
    user.groups = [Organizations.findOne(user.organizationId).slug, 'clients', 'members'];
  }
}

addCallback('user.create.before', UsersAddOrganizationslug);
