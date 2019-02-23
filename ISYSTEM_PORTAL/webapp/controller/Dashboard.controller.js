sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("IP.ISYSTEM_PORTAL.controller.Dashboard", {

		onInit: function () {
			var username = window.sessionStorage["fieldval"];
			this.getView().byId("userheadername").setUsername(username);
			//this.getOwnerComponent().getRouter().getRoute("Dashboard").attachPatternMatched(this.onRouteMatched, this);
			
			if (window.sessionStorage["fieldval"] === null) {

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetLogin", null, true);
			}
		},

		onRouteMatched: function (oEvent) {
			var login = sap.ui.getCore().getModel();
			if (login === undefined) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetLogin", null, true);
			}
		},
		presstilesystemreg: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("System_Registration", null, true);
		},
		presstiledisplayuser: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DisplayUserRequest", null, true);
		},
		handleLogoffPress: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var login = false;
			window.sessionStorage["fieldval"] = null;
			//	 sap.ui.getCore().getModel().setData(login, "Login");
			oRouter.navTo("TargetLogin", null, true);
			window.location.reload();
		},
		handleupdateprofile: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("UpdateProfile", null, true);
		},
		handleUserItemPressed: function (oEvent) {
			var oButton = oEvent.getSource();

			// create action sheet only once
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment(
					"IP.ISYSTEM_PORTAL.Fragments.UserAction",
					this
				);
				this.getView().addDependent(this._actionSheet);
			}

			this._actionSheet.openBy(oButton);
		}

	});

});