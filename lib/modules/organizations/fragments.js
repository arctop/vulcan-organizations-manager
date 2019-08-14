import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment OrganizationsItemFragment on Organization {
    _id
    createdAt
    userId
    user {
      displayName
    }
    title
    slug
  }
`);
