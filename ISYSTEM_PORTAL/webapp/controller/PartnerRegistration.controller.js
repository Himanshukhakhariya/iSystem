sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("IP.ISYSTEM_PORTAL.controller.PartnerRegistration", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf IP.ISYSTEM_PORTAL.view.PartnerRegistration
		 */
		onInit: function () {
			if (window.sessionStorage["fieldval"] === null || window.sessionStorage["fieldval"] === undefined) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetLogin", null, true);
			}
		},
		onbackfrompartnerreg: function () {
			this._ClearPage();
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetLogin", null, true);
			}
		},
		onEmailValidation: function (oevent) {
			var oSourceValue = oevent.getSource().getValue();
			var oSourceId = oevent.getSource().getId();

			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

			if (!mailregex.test(oSourceValue)) {
				this.getView().byId(oSourceId).setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId(oSourceId).setValueStateText("Please Enter Correct Email");
			} else {
				this.getView().byId(oSourceId).setValueState(sap.ui.core.ValueState.None);
			}
		},
		onpresspartnerregsave: function () {
			var oThis = this;
			var oDefaultModel = this.getOwnerComponent().getModel();
			var txtpartnerid = this.getView().byId("txtpartnerid");
			var txtpartnername = this.getView().byId("txtpartnername");
			var txtpassword = this.getView().byId("txtpassword");
			var txtemailsales = this.getView().byId("txtemailsales");
			var txtconteactsales = this.getView().byId("txtconteactsales");
			var txtemailsupport = this.getView().byId("txtemailsupport");
			var txtcontactsupport = this.getView().byId("txtcontactsupport");
			var oEntry = {};
			oEntry.PartnerID = txtpartnerid.getValue();
			oEntry.PartnerName = txtpartnername.getValue();
			oEntry.Password = txtpassword.getValue();
			oEntry.eMailSales = txtemailsales.getValue();
			oEntry.ContactSales = txtconteactsales.getValue();
			oEntry.eMailSupport = txtemailsupport.getValue();
			oEntry.ContactSupport = txtcontactsupport.getValue();
			oEntry.Status = "0";
			oDefaultModel.create("/UserRegistrationSet", oEntry, {
				success: function () {
					sap.m.MessageToast.show("Sucessfully Registration Done.");
					oThis._ClearPage();
				},
				error: function () {
					sap.m.MessageToast.show("Somthing is wrong.");
				}
			});
		},
		_ClearPage: function () {
			this.getView().byId("txtpartnerid").setValue("");
			this.getView().byId("txtpartnername").setValue("");
			this.getView().byId("txtpassword").setValue("");
			this.getView().byId("txtemailsales").setValue("");
			this.getView().byId("txtconteactsales").setValue("");
			this.getView().byId("txtemailsupport").setValue("");
			this.getView().byId("txtcontactsupport").setValue("");
		},
		onpresspartnerregcancel: function () {
			this._ClearPage();
		}

	});

});