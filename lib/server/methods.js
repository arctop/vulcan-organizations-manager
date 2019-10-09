import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/vulcan:accounts';
import VulcanEmail from 'meteor/vulcan:email';
import Users from 'meteor/vulcan:users';
import { getCollection } from 'meteor/vulcan:core';

Meteor.methods({
  'users.enroll'({organizationId, email}) {
    /* Enroll a user in an organization
      
      Retrieve organization from its id
      Assert Meteor.user can invite (organization.userId == Meteor.user(), todo: add roles to organizations)
      
      Retrieve user by email
      if user exists:
        Assert user is not already member of an organization (todo: enable multiple organizations membership)
        Append organization to user and send notification email (todo: allow user to accept)
      else:
        creates user with organizationId set
        send Meteor enrollment email

    */

    let organization = getCollection('Organizations').findOne(organizationId);
    let user = Accounts.findUserByEmail(email);

    if (!!organization && !!email) {
      // Assert current user is the owner of the organization
      if (organization.userId === Meteor.user()._id || Users.isAdmin(Meteor.user())) {
        if (user) { //user exists
          if (!!user.organizationId && (user.organizationId === organizationId)) {
            throw new Error(`${email} is already a member of this organization`);
          }
          if (!!user.organizationId) {
            throw new Error(`${email} is already a member of another organization`);
          }
          // compute new groups
          let newGroups = user.groups || [];
          [organization.slug, 'clients', 'members'].forEach(g => {
            if (newGroups.indexOf(g) === -1) {
              newGroups.push(g);
            }
          });
          // update then notify user by email (todo: use vulcan:notifications ?)
          Users.update({_id: user._id}, {$set: {organizationId: organizationId, groups: newGroups}});
          VulcanEmail.buildAndSend({
            to: email,
            emailName: 'inviteNotification',
            variables: {_id: Meteor.user()._id, organizationId: organization._id},
          }); //.then(console.log('done')).catch(console.log('error'))
        } else { // user does not exist in app
          //create user then send Meteor enrollment email 
          var userId = Accounts.createUser({
            username: email.split('@')[0],
            email: email,
            organizationId: organizationId,
          });
          Accounts.sendEnrollmentEmail(userId);
        }
      } else {
        throw new Error(`You are not allowed to invite ${email} to ${organization.name}`);
      }
    } else {
      throw new Error(`Invalid arguments (organizationId: ${organizationId}, email: ${email}) for users.enroll method`);
    }
  },
});