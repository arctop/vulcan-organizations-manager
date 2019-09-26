# Vulcan Organizations Manager

## Manage and create organizations

This package helps to manage organizations on [Vulcan.js](http://vulcanjs.org/) applications. Including organizations dashboard for the app's admin and generating registration URLs.

**/!\ This is an experimental package**.

## Installation

Clone this repo:

```sh
git clone https://github.com/arctop/vulcan-organizations-manager
```
Or install with meteor:
```sh
meteor add arctop:vulcan-organizations-manager
```

You can clone it directly in your app `packages` folder. You can also clone it in an isolated `vulcan-packages` folder outside of your app, and then set the `METEOR_PACKAGE_DIRS` environment variable to `"/some-dir/vulcan-packages"`. This way, you can put all your reusable package in this `vulcan-packages` folder without polluting your own app.

Then use the package in your app:

```js
import { theFunctionYouNeed } from arctop_vulcan-organizations-manager
```

This package won't be published on Atmosphere or npm until it is a bit more mature.

## Example
Add the following to your `schema.js`:
```js
import { getCollection } from 'meteor/vulcan:lib';

const restrictedPermission = (user, document) => {
  return (
    getCollection('Users').isAdmin(user) ||
    getCollection('Users').isMemberOf(
      user,
      getCollection('Organizations').findOne(document.organizationId).slug
    )
  );
};
```
or if you wouldn't like to use VulcanJS Groups & Permissions system:
```js
import { getCollection } from 'meteor/vulcan:lib';

const restrictedPermission = (user, document) => {
  return (
    getCollection('Users').isAdmin(user) ||
    document.organizationId === user.organizationId
  );
};
``` 

and on the relevant schema fields:
```js
canRead: restrictedPermission
```

also see a use case for a `checkAccess` function on this package's `collection.js` and `resolvers.js`.
## Contributing

Best way to contribute is to use it in your own app, and propose ideas, suggestions and PR based on your experience.

We seek for maximum reusability, so each method should be as configurable as possible, and split into independent functions whenever possible.

Possible improvements:

- Add organization admin and admin dashboard
- Temporary registration URL for new organization members
- Allow organization admin to add existing app members to an organization 

*[Built with love by Arctop](https://github.com/arctop)*

