import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';
import './fragments.js';
import mutations from './mutations.js';
import resolvers from './resolvers.js';
import './permissions.js'

const Organizations = createCollection({

  collectionName: 'Organizations',

  typeName: 'Organization',

  schema,

  resolvers: resolvers,
  // resolvers: getDefaultResolvers('Organizations'),

  mutations: mutations,

});


Organizations.addDefaultView(terms => ({
  options: {
    sort: {
      createdAt: -1
    }
  }
}));

Organizations.checkAccess = (currentUser, organization) => {
  return !!(Users.isAdmin(currentUser) || Users.isMemberOf(currentUser, organization.groupName));
}

export default Organizations;
