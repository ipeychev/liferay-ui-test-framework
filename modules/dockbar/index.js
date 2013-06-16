function Dockbar(config) {
	this._config = config;
}

Dockbar.prototype = {
	constructor: Dockbar,

	navigateToControlPanel: function() {
		casper.echo('Navigating to Control Panel');

		casper.open('/home');

		casper.thenClick('.admin-links a');

		casper.waitUntilVisible('.admin-links dropdown-menu a::nth-child(2)',
			function onSuccess() {
				casper.click('.admin-links dropdown-menu a::nth-child(2)');
			}
		);
	},

	navigateToSignIn: function() {
		casper.echo('Navigating to Sign In');

		casper.open('/home');

		casper.thenClick('.sign-in a');
	},

	navigateToSignOut: function() {
		casper.echo('Navigating to Sign Out');

		casper.open('/home');

		casper.waitForSelector(
			'.user-avatar-link .user-full-name',
			function onSuccess() {
				casper.click('.user-avatar-link');
			},
			function onTimeout() {
				casper.test.fail('Not logged out successfully');
			}
		);

		casper.waitUntilVisible('.sign-out a',
			function onSuccess() {
				casper.click('.sign-out a');
			},
			function onFailure() {
				casper.test.fail('Not logged out successfully');
			}
		);
	},

	navigateToSiteAdmin: function() {
		casper.echo('Navigating to Site Administration');

		casper.open('/home');

		casper.thenClick('.admin-links a');

		casper.waitUntilVisible('.admin-links dropdown-menu a',
			function onSuccess() {
				casper.click('.admin-links dropdown-menu a');
			},
			function onTimeout() {
				casper.echo('Failed to click on .admin-links dropdown-menu a');
			}
		);
	}
};

module.exports.Dockbar = Dockbar;