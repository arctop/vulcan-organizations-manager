Package.describe({
  name: 'arctop:vulcan-organizations-manager',
  summary: 'Organizations manager package for VulcanJS',
  version: '0.0.4',
  git: 'https://github.com/arctop/vulcan-organizations-manager',
});

Package.onUse((api) => {
  api.use(['vulcan:core@1.13.2', 'vulcan:accounts@1.13.2', 'vulcan:email@1.13.2', 'fourseven:scss@4.5.0']);
  api.addFiles('lib/stylesheets/main.scss');
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

  api.addAssets(['lib/server/templates/invitationNotificationEmailTemplate.handlebars.v1',], ['server']);
});
