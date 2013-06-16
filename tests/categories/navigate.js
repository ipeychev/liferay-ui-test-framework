var Dockbar = require('../../modules/dockbar').Dockbar;

function Navigate(config) {
	var instance = this;

	instance._config = config;

	instance._dockbar = new Dockbar();
}

Navigate.prototype = {
	constructor: Navigate,

	navigateToCategoriesAdmin: function() {
		var instance = this;

		instance._dockbar.navigateToSiteAdmin();

		casper.waitForSelector(
			'#_160_portlet_147',
			function onSuccess() {
				casper.click('#_160_portlet_147');
			},
			function onTimeout() {
				casper.test.fail('Failed to navigate to Categories Admin portlet');
			}
		);

		casper.waitForSelector(
			'.portlet-asset-category-admin',
			function onSuccess() {
				casper.echo('Categoies Admin portlet opened successfully');
			},
			function onTimeout() {
				casper.test.fail('Failed to navigate to Categories Admin portlet - portlet main class is not available');
			}
		);
	}
};

module.exports.Navigate = Navigate;