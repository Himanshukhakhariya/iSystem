jQuery.sap.declare("IP.ISYSTEM_PORTAL.Component");
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"IP/ISYSTEM_PORTAL/model/models",
	"IP/ISYSTEM_PORTAL/controller/ErrorHandler"
], function (UIComponent, Device, models, ErrorHandler) {
	"use strict";
	var gv_i18nBundle;
	return UIComponent.extend("IP.ISYSTEM_PORTAL.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */

		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			/*var sOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
			var ServiceURL = "https://jezz.systems:4300/jezz_Portal/webservice/WebService.xsodata/";
			var oDataModel = new sap.ui.model.odata.ODataModel(ServiceURL, true, "DINK01", "Dink@1234");
			this.setModel(oDataModel);*/

			// enable routing
			this.getRouter().initialize();
			/*	this._oErrorHandler = new ErrorHandler(this);*/
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// get i18n.properties

			/*	// set device model
				var deviceModel = new sap.ui.model.json.JSONModel({
				
					listMode 	: (Device.is.phone) ? "None" 	: "SingleSelectMaster",
					listItemType: (Device.is.phone) ? "Active" 	: "Inactive"
				});
				deviceModel.setDefaultBindingMode("OneWay");
				oView.setModel(deviceModel, "device");*/

		},
		destroy: function () {
			this._oErrorHandler.destroy();
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},
		getContentDensityClass: function () {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				// eslint-disable-next-line sap-no-proprietary-browser-api
				if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});