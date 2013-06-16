#!/usr/bin/env casperjs

var casper = require('casper').create(
    {
        verbose: true,
        viewportSize: {
            height: 1024,
            width: 1280
        }
    }
);

var Login = require('../../modules/login').Login;
var AddCategory = require('./add.js').AddCategory;
var Navigate = require('./navigate.js').Navigate;

var login = new Login(
    {
        portletNamespace: '_58_'
    }
);

casper.start(
    'http://localhost:8080',
    function() {
        casper.echo('Liferay Categories suite is running');

        casper.echo('Page URL is: ' + casper.getCurrentUrl());

        casper.echo('Page title is: ' + casper.evaluate(function() {
            return document.title;
        }), 'INFO');
    }
);

casper.then(
    function gotoCategoriesAdmin() {
        login.signIn(casper.cli.get('u') || 'test@liferay.com', casper.cli.get('p') || 'test', false);
    }
);

casper.then(
    function testAddCategory() {
        var navigate = new Navigate();

        navigate.navigateToCategoriesAdmin();
    }
);

casper.run(
    function() {
        casper.echo('Done.');

        casper.test.renderResults(true, 0, 'test-results.xml');
    }
);