jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
	'jquery.sap.global',
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
], function (jQuery, Controller, ODataModel) {
	"use strict";

	return Controller.extend("IP.ISYSTEM_PORTAL.controller.Login", {
		onInit: function () {
			/*var oModel = new sap.ui.model.odata.v2.ODataModel(
				'https://jezz.systems:4300/jezz_Portal/webservice/WebService.xsodata/',
				true, "DINK01", "Dink@1234");
			this.getView().getModel(oModel);*/
			//	var slocation =	window.navigator.language;

			var slocation = sap.ui.getCore().getConfiguration().getLanguage();
			var i18npath = "i18n/i18n";
			if (slocation === "de-DE") {
				i18npath = i18npath + "_de.properties";
			} else if (slocation === "hi") {
				i18npath = i18npath + "_hi.properties";
			} else {
				i18npath = i18npath + ".properties";
			}
			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl: i18npath
			});
			sap.ui.getCore().setModel(i18nModel, "i18n");

			/*	var serviceUrl =
					"https://webidetesting9570514-p1942321180trial.dispatcher.hanatrial.ondemand.com/https://jezz.systems:4300/jezz_Portal/webservice/WebService.xsodata/";
			*/

			/*	var jurl = "proxy/https/jezz.systems:4300/jezz_Portal/webservice/WebService.xsodata/";
				$.ajax({
					url: jurl,
					type: "GET",

					dataType: "text",
					contentType: "text / xml;charset = \"utf - 8\"",
					success: function (data, textStatus, jqXHR) {
						var response = data;
						console.log("SUCCESS", response);
					},
					error: function (xhr, status) {
						console.log("ERROR");
					},
					complete: function (xhr, status) {
						console.log("COMPLETE");
					}
				});*/
			/*	var Omodel = jQuery.ajax({
					url: jurl,
					type: 'GET',
					method: 'GET',
					username: "DINK01",
					password: "Dink@1234",
					authorization: "Access-Control-Allow-Origin: *",
					xhrFields: {
						withCredentials: true
					},
					headers: {
						"X-Requested-With": "XMLHttpRequest",
						"Content-Type": "application/atom+xml",
						"DataServiceVersion": "2.0",
						"X-CSRF-Token": "Fetch"

					},
					success: function (data, oResponse) {
						console.log("json   ", JSON.stringify(data));
					},
					error: function (xhr, ajaxOptions, throwError) {
						console.log(throwError);
					},
				});
				this.getView().getModel(Omodel);*/
		},

		//	var url = "https://jezz.systems:4300/jezz_Portal/webservice/WebService.xsodata/";
		/*ODataModel    ({
			requestUri: url,
			method: "GET",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/atom+xml",
				"DataServiceVersion": "2.0",
				"X-CSRF-Token": "Fetch",
				"Access-Control-Allow-Origin": '*',
			}
		});*/
		//	var invocation = new XMLHttpRequest();

		//headers.Authorization = "Access-Control-Allow-Origin: *";
		//	$.response.Headers.set("Access-Control-Allow-Origin", "*");
		//	$.response.status = $.net.http.OK;
		/*	invocation.open("GET", url, true);
			invocation.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			invocation.setRequestHeader("Access-Control-Allow-Origin", "*");
			$.ajax({
				type: 'GET',
				url: url,
				authorization: "Access-Control-Allow-Origin: *",
				async: false,
				username: 'DINK01',
				password: 'Dink@1234',
				contentType: "application/html",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Authorization", "Basic " + btoa("DINK01" + ":" + "Dink@1234"));
				},
				success: function (data) {}
			});*/

		//	this.getOwnerComponent().getRouter().getRoute("TargetLogin").attachPatternMatched(this.onRouteMatched, this);
		//	},
		/*	onRouteMatched: function (oEvent) {
			this.getView().byId("txtusername").setValue();
			this.getView().byId("txtpassword").setValue();
		},*/
		onPartnerRegistration: function (oEvent) {
			/*//Wroking Code
			Email.send({
				Host: "smtp.elasticemail.com",
				Username: "hemil.prajapati1309@gmail.com",
				Password: "410ab418-9a1e-4347-8ad6-ddafbe77ddb4",
				To: 'grsharma@live.com',
				From: "hemil_prajapati1309@yahoo.in",
				Subject: "This is the subject",
				Body: "And this is the body"
			}).then(
				message => alert(message)
			); */

			/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PartnerRegistration", null, true);*/
		},

		handleusername: function () {
			var username = this.getView().byId("txtusername");

			if (username.getValue() === "") {
				username.setValueState(sap.ui.core.ValueState.Error);
				username.setValueState(sap.ui.core.ValueStateText("Please Enter UserName or Password"));
				return;
			} else {
				username.setValueState(sap.ui.core.ValueState.None);
				return;
			}
		},
		handlepwd: function () {
			var password = this.getView().byId("txtpassword");
			if (password.getValue() === "") {
				password.setValueState(sap.ui.core.ValueState.Error);
				password.setValueState(sap.ui.core.ValueStateText("Please Enter UserName or Password"));
				return;
			} else {
				password.setValueState(sap.ui.core.ValueState.None);
				return;
			}
		},
		handlepresslogin: function () {
			var oThis = this;
			var oDefaultModel = this.getView().getModel(); //this.getOwnerComponent().getModel();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var UserName = this.getView().byId("txtusername");
			var Password = this.getView().byId("txtpassword");
			var view = this.getView();
			var inputs = [
				view.byId("txtusername"),
				view.byId("txtpassword")
			];
			jQuery.each(inputs, function (i, input) {
				if (!input.getValue()) {
					input.setValueState("Error");
				}
			});
			var canContinue = true;
			jQuery.each(inputs, function (i, input) {
				if (input.getValueState() === "Error") {
					canContinue = false;
					return false;
				}
			});
			if (!canContinue) {
				var oMs = sap.ui.getCore().byId("msgStrip");
				if (oMs) {
					oMs.destroy();
				}
				this._generateMsgStrip();
				//	sap.m.MessageBox.show("Complete your Inputs");
			} else {

			}
			oDefaultModel.read("/UserRegistrationSet", {
				method: "GET",
				success: function (data) {
					var oPartnerData = new sap.ui.model.json.JSONModel(data.results);
					for (var i = 0; i <= data.results.length; i++) {

						if (UserName.getValue() === oPartnerData.getProperty("/" + [i] + "/PartnerName") &&
							Password.getValue() === oPartnerData.getProperty("/" + [i] + "/Password")) {
							sap.m.MessageToast.show("UserName and Password Correct");
							var UserNamevalue = oThis.getView().byId("txtusername").getValue();
							window.sessionStorage["fieldval"] = UserNamevalue;
							oRouter.navTo("Dashboard", null, true);

							return;
						}
					}
					sap.m.MessageToast.show("Wrong UserName OR Password");

				},
				error: function () {}
			});

			var oModel = new sap.ui.model.json.JSONModel();
			var login = true;
			oModel.setData(login, "Login");
			sap.ui.getCore().setModel(oModel);

			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//this.getOwnerComponent().getRouter().navTo("Dashboard",null,true);

		},
		_generateMsgStrip: function () {
			var flexbox = this.getView().byId("flexbox");
			var oMsgStrip = new sap.m.MessageStrip("msgStrip", {
				text: "Please Enter Correct UserName OR Password.",
				showCloseButton: true,
				showIcon: true,
				type: "Error",
			});
			oMsgStrip.addStyleClass("sapUiSmallMarginTop messagestripclass");
			flexbox.addContent(oMsgStrip);
		}
	});
});