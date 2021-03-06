import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { STATES } from 'meteor/vulcan:accounts';
import { Link, withRouter } from 'react-router-dom';
import { intlShape } from 'meteor/vulcan:i18n';

const accessOptions = {
  groups: ['guests'],
  redirect: '/',
};

const OrganizationsRegister = (props, {history}) => {
  return (
    <div className="account account-with-topbar">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="page accounts-page accounts-sign-up orgs-sign-up">
            <Components.AccountsLoginForm
              extraFields={[
                {
                  defaultValue: props.match.params.id,
                  id: 'organizationId',
                  required: false,
                },
              ]}
              formState={STATES.SIGN_UP}
              showSignInLink={false}
              requireEmailVerification={true}
              onPostSignUpHook={() => {
                props.history && props.history.push('/');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationsRegister.displayName = 'OrganizationsRegister';

OrganizationsRegister.contextTypes = {
  intl: intlShape,
};

registerComponent('OrganizationsRegister', OrganizationsRegister, withRouter, [
  withAccess,
  accessOptions,
]);
