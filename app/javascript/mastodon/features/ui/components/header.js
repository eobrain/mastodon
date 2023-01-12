import React from 'react';
import Logo from 'mastodon/components/logo';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { registrationsOpen } from 'mastodon/initial_state';
import PropTypes from 'prop-types';

const mapDispatchToProps = (dispatch) => ({
  openClosedRegistrationsModal() {
    dispatch(openModal('CLOSED_REGISTRATIONS'));
  },
});

export default @connect(null, mapDispatchToProps)
@withRouter
class Header extends React.PureComponent {

  static contextTypes = {
    identity: PropTypes.object,
  };

  static propTypes = {
    openClosedRegistrationsModal: PropTypes.func,
    location: PropTypes.object,
  };

  render () {
    const { signedIn } = this.context.identity;

    let content;

    if (signedIn) {
      content = (
        <>
        </>
      );
    } else {
      let signupButton;

      if (registrationsOpen) {
        signupButton = (
          <a href='/auth/sign_up' className='button button-tertiary'>
            <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
          </a>
        );
      } else {
        signupButton = (
          <button className='button button-tertiary' onClick={openClosedRegistrationsModal}>
            <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
          </button>
        );
      }

      content = (
        <>
          <a href='/auth/sign_in' className='button'><FormattedMessage id='sign_in_banner.sign_in' defaultMessage='Sign in' /></a>
          {signupButton}
        </>
      );
    }

    return (
      <div className='ui__header'>
        <Link to='/' className='ui__header__logo'><Logo /></Link>

        <div className='ui__header__links'>
          {content}
        </div>
      </div>
    );
  }

}
