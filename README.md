Liferay UI Test Framework: Functionality tests for Liferay UI using CasperJS
========================================

Installing and running the tests
-----------

1. Download and install [CasperJS](http://casperjs.org/)
2. Clone [Liferay master branch](https://github.com/liferay/liferay-portal)
3. Build and run Liferay Portal
4. Run the example test -> tests/login/main.js in the following way:

$ cd tests/login

$ casperjs main.js (or just ./main.js)

The results will be displayed in the console and a file with name "tests-results.xml" will be created.

Status of the project
-----------

The project has been just started. The first module tests login in and login out from Liferay Portal