import Organizations from './collection.js';

////////////////////
//  Organization Getters  //
////////////////////

/**
 * @summary Get an organization
 * @param {String} organizationOrOrganizationId
 */
Organizations.getOrganization = function(organizationOrOrganizationId) {
  if (typeof organizationOrOrganizationId === 'undefined') {
    throw new Error();
  } else if (typeof organizationOrOrganizationId === 'string') {
    return Organizations.findOne(organizationOrOrganizationId);
  } else {
    return organizationOrOrganizationId;
  }
};