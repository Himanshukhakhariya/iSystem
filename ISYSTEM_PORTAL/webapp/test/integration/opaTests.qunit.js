/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"IP/ISYSTEM_PORTAL/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});