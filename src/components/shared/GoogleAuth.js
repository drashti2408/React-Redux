import React from 'react';
import { signIn, signOut } from '../../actions';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'297721604273-jlq7ed0nlb3l53suu7fmkgjnetupjuca.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn === true) {
			this.props.signIn(
				this.auth.currentUser.get().getId(),
				this.auth.currentUser.get().getBasicProfile().Ad,
			);
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<Button color="secondary" variant="contained" onClick={this.onSignOutClick}>
					Sign Out
				</Button>
			);
		} else {
			return (
				<Button color="secondary" variant="contained" onClick={this.onSignInClick}>
					Sign In with Google
				</Button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
