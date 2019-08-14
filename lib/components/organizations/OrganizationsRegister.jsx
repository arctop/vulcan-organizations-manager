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
    <div className="container">
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
          history && history.push('/');
        }}
      />
      <p className="accounts-prompt">
        <FormattedMessage id="accounts.already_have_an_account"/>{' '}
        <Link to="/log-in">
          <FormattedMessage id="accounts.log_in_here"/>
        </Link>
      </p>
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
