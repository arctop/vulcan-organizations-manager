import VulcanEmail from 'meteor/vulcan:email';
import { getPackedSettings } from 'http2';


VulcanEmail.addTemplates({
    // IMPORTANT : Assets seems not updated between restarts or rebuilds, need to update filename...
    inviteNotification: Assets.getText('lib/server/templates/invitationNotificationEmailTemplate.handlebars.v1')
  });

VulcanEmail.addEmails({
  
  inviteNotification: {
    template: 'inviteNotification',
    path: '/emails/inviteNotification/:_id?',
    data() {
      return {date: new Date()};
    },
    subject(data) {
      // console.log(data)
      const SiteData = _.isEmpty(data) ? {title: getPackedSettings()} : data.data.SiteData;
      const user = _.isEmpty(data) ? {displayName: 'another member'} : data.data.user.result;
      const organization = _.isEmpty(data) ? {displayName: 'an organization'} : data.data.organization.result;

      return `${SiteData.title}: ${user.displayName} added you as a new member of ${organization.name}`;
    },
    query: `
      query UserSingleQuery($_id: String!, $organizationId: String!) {
        user(input: { selector: {documentId: $_id}}) {
          result {
            displayName
          }
        }
        organization(input: { selector: {documentId: $organizationId}}) {
          result {
            name
          }
        }
        SiteData {
          title 
          url
        }
      }
    `
  }
})
