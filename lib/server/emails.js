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
      const user = _.isEmpty(data) ? {displayName: '[user]'} : data.data.user.result;
      
      return `${SiteData.title}: ${user.displayName} added you as a member of its organization`;
    },
    query: `
      query UserSingleQuery($_id: String!) {
        user(input: { selector: {documentId: $_id}}) {
          result {
            displayName
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
