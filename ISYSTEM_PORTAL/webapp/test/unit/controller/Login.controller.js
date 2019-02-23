/*global QUnit*/

sap.ui.define([
	"IP/ISYSTEM_PORTAL/controller/Login.controller"
], function (oController) {
	"use strict";

	QUnit.module("Login Controller");

	QUnit.test("I should test the Login controller", function (assert) {
		var oAppController = new oController();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});