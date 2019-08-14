import {
  createMutator,
  updateMutator,
  deleteMutator,
  Utils,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  create: {
    name: 'createOrganization',

    check(user) {
      if (!user) return false;
      return Users.canDo(user, 'organization.create');
    },

    mutation(root, args, context) {
      const {data: document} = args;

      Utils.performCheck(this.check, context.currentUser, document);

      return createMutator({
        collection: context.Organizations,
        document: document,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },
  },

  update: {
    name: 'updateOrganization',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'organization.update.own')
        : Users.canDo(user, `organization.update.all`);
    },

    mutation(root, {selector, data}, context) {
      const document = context.Organizations.findOne({_id: selector.documentId || selector._id});
      Utils.performCheck(this.check, context.currentUser, document);

      return updateMutator({
        collection: context.Organizations,
        selector: selector,
        data: data,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },
  },

  delete: {
    name: 'deleteOrganization',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'organization.delete.own')
        : Users.canDo(user, `organization.delete.all`);
    },

    mutation(root, {selector}, context) {
      const document = context.Organizations.findOne({_id: selector.documentId || selector._id});
      Utils.performCheck(this.check, context.currentUser, document);

      return deleteMutator({
        collection: context.Organizations,
        selector: selector,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },
  },
};

export default mutations;
