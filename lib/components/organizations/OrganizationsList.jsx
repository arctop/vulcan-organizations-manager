import React from 'react';
import {
  Utils,
  Components,
  withCurrentUser,
  registerComponent,
  withAccess, withList
} from 'meteor/vulcan:core'

const accessOptions = {
  groups: ['admins'],
  redirect: '/'
};

import Organizations from '../../modules/organizations/collection.js';

{
  /* These are "props". They are variables for the component that are passed by the components parent.
  In this case, to create the parent we wrapped the component in "Higer Order Compoents" (See the Higer Order Compoents section below.)
    By doing this, we can pass on those props to the children of he HOCs and give them access to the props... */
}

const RegistrationUrlCell = ({ column, document, currentUser }) => {
  let registrationUrl = `${Utils.getSiteUrl()}register/${document._id}`;
  return <span>{registrationUrl}</span>;
};

const OrganizationsList = ({
  results = [],
  loading,
  loadMore,
  count,
  totalCount
}) => {
  return (
  <div>
    {/* ... We have a test for the loding variable (See the "Higher Order Components" section at the bottom and then the "props" section at the top.)... */}
    {loading ? (
      <Components.Loading />
    ) : (
      <div className="container">
        <Components.Datatable
          collection={Organizations}
          showSearch={true}
          showEdit={true}
          columns={[
            'title',
            {
              name: 'registrationUrl',
              component: RegistrationUrlCell
            }
          ]}
        />
      </div>
    )}
  </div>
)};

const options = {
  collection: Organizations,
  fragmentName: 'OrganizationsItemFragment',
  limit: 6
};

// These two functions (withList & withCurrentUser) are Higher Order Components (HOC) and by wrapping our component with this we can give it "props". (See the "props" section at the top.)
registerComponent({
  name: 'OrganizationsList',
  component: OrganizationsList,
  hocs: [withCurrentUser, [withAccess, accessOptions], [withList, options]]
});
