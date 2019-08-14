import { getCollection, Utils } from 'meteor/vulcan:lib'
import moment from 'moment';

const restrictedPermission = (user, document) => {
  return getCollection('Users').isMemberOf(user, document.groupName) || getCollection('Users').isAdmin(user);
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
            fields: context.Users.getViewableFields(
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
  title: {
    label: 'Organization Name',
    type: String,
    optional: false,
    canRead: restrictedPermission,
    canCreate: ['admins'],
    canUpdate: ['admins'],
    searchable: true,
  },
  groupName: {
    label: 'Group Name',
    type: String,
    optional: true,
    hidden: true,
    canRead: restrictedPermission,
    canCreate: ['admins'],
    canUpdate: ['admins'],
    onCreate: ({document: organization}) => {
      return Utils.slugify(`${organization.title}-${moment(organization.createdAt).unix().toString().substr(-3)}`);
    }
  },
};

export default schema;
