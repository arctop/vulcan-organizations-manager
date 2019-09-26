import React from 'react';
import {
  Components,
  registerComponent,
  withMessages,
} from 'meteor/vulcan:core';

class InviteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMessage: {},
      valid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    value = value.trim();
    //email validation
    let isValid = Accounts.ui._options.emailPattern.test(value);
    if (isValid) {
      this.setState({email: value, errorMessage: {}, valid: isValid});
    } else if (!value || value.length === 0) {
      this.setState(
        {email: value, errorMessage: {field: 'email', type: 'warning', message: 'Email required'}, valid: isValid});
    } else {
      this.setState(
        {email: value, errorMessage: {field: 'email', type: 'warning', message: 'Email invalid'}, valid: isValid});
    }
  }

  handleSubmit(event) {
    event && event.preventDefault();
    Meteor.call(
      'users.enroll',
      {
        organizationId: this.props.document._id,
        email: this.state.email,
      },
      (err, res) => {
        if (err) {
          this.props.flash({id: 'users.enrollment_error', type: 'error'});
        } else {
          this.props.flash({id: 'users.enrollment_success', type: 'success'});
        }
      },
    );
    this.props.closeModal();
  };

  render() {
    return (
      <form>
        <Components.AccountsFields fields={
          {
            email:
              {
                hint: 'Enter email',
                id: 'email',
                type: 'email',
                required: true,
                onChange: this.handleChange,
              },
          }
        } messages={[this.state.errorMessage]}
        />
        <Components.AccountsButtons buttons={
          {
            invite:
              { // className: 'active',
                id: 'invite',
                label: 'Invite',
                type: 'submit',
                disabled: !this.state.valid,
                onClick: this.handleSubmit,
              },
          }
        }/>
      </form>
    );
  }
}

registerComponent({
  name: 'InviteForm',
  component: InviteForm,
  hocs: [
    withMessages,
  ],
});

const OrganizationsInviteButton = (props) =>
  <Components.ModalTrigger
    // size="small" 
    title="Invite a new organization member"
    component={
      <Components.Button
        style={{marginRight: '10px'}}
        variant='primary'
      > Invite </Components.Button>

    }
  >
    <Components.InviteForm {...props} />
  </Components.ModalTrigger>;

export default OrganizationsInviteButton;