function Login(config) {
	this._config = config;
}

Login.prototype = {
	constructor: Login,

	signIn: function(user, password, rememberMe) {
		var instance = this;

		casper.open('/home');

		casper.then(
			function() {
				casper.echo('Home page loaded, click on login link');

				casper.click('.sign-in a');

				casper.waitForSelector('#' + instance._config.portletNamespace + 'fm');
			}
		);

		casper.then(
			function() {
				casper.echo('Going to sign in as user: ' + user);

				casper.echo('Filling the login form "#' + instance._config.portletNamespace + 'fm" and submitting...');

				var formValues = {};

				formValues[instance._config.portletNamespace + 'login'] = user;
				formValues[instance._config.portletNamespace + 'password'] = password;

				if (rememberMe) {
					casper.click('#' + instance._config.portletNamespace + 'rememberMeCheckbox');
				}

				casper.fill('#' + instance._config.portletNamespace + 'fm', formValues, true);

				casper.waitForSelector(
					'.user-avatar-link .user-full-name',
					function onSuccess() {
						casper.test.pass('User logged successfully');
					},
					function onTimeout() {
						casper.test.fail("Not logged successfully");
					}
				);
			}
		);
	},

	signOut: function() {
		casper.waitForSelector(
			'.user-avatar-link .user-full-name',
			function onSuccess() {
				casper.click('.user-avatar-link');
			},
			function onTimeout() {
				casper.test.fail("Not logged successfully");
			}
		);

		casper.waitUntilVisible('.sign-out a',
			function onSuccess() {
				casper.click('.sign-out a');

				casper.waitUntilVisible('.sign-in a',
					function onSuccess() {
						casper.echo('Page URL is: ' + casper.getCurrentUrl());

						casper.test.assertUrlMatch('\/web\/guest\/home', 'User logged out successfully');
					},
					function onFail() {
						casper.test.fail('User not logged out successfully');
					}
				);
			},
			function onFail() {
				casper.test.fail('User not logged out successfully');
			}
		);
	}
};

module.exports.Login = Login;