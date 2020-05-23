import { getCollection, Utils } from 'meteor/vulcan:lib'
import moment from 'moment';

const restrictedPermission = (user, document) => {
  return getCollection('Users').isMemberOf(user, document.slug) || getCollection('Users').isAdmin(user);
};

const schema = {
  // default properties
  _id: {
    type: String,
    optional: true,
    canRead: restrictedPermission,
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: restrictedPermission,
    onCreate: () => {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: true,
    canRead: restrictedPermission,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (organization, args, context) => {
        return context.Users.findOne(
          { _id: organization.userId },
          {
            fields: context.Users.getReadableProjection(
              context.currentUser,
              context.Users
            ),
          }
        );
      },
      addOriginalField: true,
    },
  },

  // custom properties
  name: {
    label: 'Organization Name',
    type: String,
    optional: false,
    canRead: restrictedPermission,
    canCreate: ['admins'],
    canUpdate: ['admins'],
    searchable: true,
  },
  slug: {
    label: 'Group Name',
    type: String,
    optional: true,
    hidden: true,
    canRead: restrictedPermission,
    canCreate: ['admins'],
    canUpdate: ['admins'],
    onCreate: ({document: organization}) => {
      // if no slug has been provided, generate one
      const slug = organization.slug || Utils.slugify(organization.name);
      return Utils.getUnusedSlugByCollectionName('Organizations', slug);
    },
    onUpdate: ({data, document: organization}) => {
      // if slug is changing
      if (data.slug && data.slug !== organization.slug) {
        const slug = data.slug;
        return Utils.getUnusedSlugByCollectionName('Organizations', slug);
      }
    }
  },
};

export default schema;
