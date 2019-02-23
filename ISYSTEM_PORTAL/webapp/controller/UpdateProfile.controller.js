sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"IP/ISYSTEM_PORTAL/controller/ErrorHandler"
], function (Controller, History, ErrorHandler) {
	"use strict";

	return Controller.extend("IP.ISYSTEM_PORTAL.controller.UpdateProfile", {
		PId: "",
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf IP.ISYSTEM_PORTAL.view.UpdateProfile
		 */
		onInit: function () {
			if (window.sessionStorage["fieldval"] === null || window.sessionStorage["fieldval"] === undefined) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetLogin", null, true);
			}
			var oDefaultModel = this.getOwnerComponent().getModel();
			var Ids = window.sessionStorage["fieldval"];
			var that = this;
			var txtpartnername = this.getView().byId("txtpartnername");
			var txtpassword = this.getView().byId("txtpassword");
			var txtemailsales = this.getView().byId("txtemailsales");
			var txtconteactsales = this.getView().byId("txtconteactsales");
			var txtemailsupport = this.getView().byId("txtemailsupport");
			var txtcontactsupport = this.getView().byId("txtcontactsupport");

			oDefaultModel.read("/UserRegistrationSet", {
				method: "GET",
				success: function (data) {
					oDefaultModel.refresh();
					var oPartnerData = new sap.ui.model.json.JSONModel(data.results);

					for (var i = 0; i < data.results.length; i++) {
						if (Ids === oPartnerData.getProperty("/" + [i] + "/PartnerName")) {
							that.PId = oPartnerData.getProperty("/" + [i] + "/PartnerID");
							txtpartnername.setValue(oPartnerData.getProperty("/" + [i] + "/PartnerName"));
							txtpassword.setValue(oPartnerData.getProperty("/" + [i] + "/Password"));
							txtemailsales.setValue(oPartnerData.getProperty("/" + [i] + "/eMailSales"));
							txtconteactsales.setValue(oPartnerData.getProperty("/" + [i] + "/ContactSales"));
							txtemailsupport.setValue(oPartnerData.getProperty("/" + [i] + "/eMailSupport"));
							txtcontactsupport.setValue(oPartnerData.getProperty("/" + [i] + "/ContactSupport"));
						}
					}
				}
			});
		},
		PressGotoDashBoard: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Dashboard", null, true);

		},
		onpressupdatepartnerregsave: function () {
			var oDefaultModel = this.getOwnerComponent().getModel();
			var oEntry = {};
			oEntry.PartnerName = this.getView().byId("txtpartnername").getValue();
			oEntry.Password = this.getView().byId("txtpassword").getValue();
			oEntry.eMailSales = this.getView().byId("txtemailsales").getValue();
			oEntry.ContactSales = this.getView().byId("txtconteactsales").getValue();
			oEntry.eMailSupport = this.getView().byId("txtemailsupport").getValue();
			oEntry.ContactSupport = this.getView().byId("txtcontactsupport").getValue();
			oEntry.Status = "1";
			var that = this;
			oDefaultModel.update("/UserRegistrationSet(" + that.PId + ")", oEntry, {
				success: function () {
					sap.m.MessageToast.show("Successfully Profile Updated");
				},
				error: function () {
					sap.m.MessageToast.show("Something is wrong");
				}

			});
		},

	});

});