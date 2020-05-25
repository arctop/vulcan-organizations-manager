Package.describe({
  name: 'arctop:vulcan-organizations-manager',
  summary: 'Organizations manager package for VulcanJS',
  version: '0.0.5',
  git: 'https://github.com/arctop/vulcan-organizations-manager',
});

Package.onUse((api) => {
  api.use(['vulcan:core', 'vulcan:accounts', 'vulcan:email', 'fourseven:scss']);
  api.addFiles('lib/stylesheets/main.scss');
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

  api.addAssets(['lib/server/templates/invitationNotificationEmailTemplate.handlebars.v1',], ['server']);
});
