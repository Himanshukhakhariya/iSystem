sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("IP.ISYSTEM_PORTAL.controller.System_Registration", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf IP.ISYSTEM_PORTAL.view.System_Registration
		 */
		onInit: function () {
			var oForm = this.getView().byId("idSysApp");
			var oModel = new sap.ui.model.json.JSONModel();
			var obj = {};
			oModel.setData({
				generalSec: obj,
				ipsection: obj
			}, true);

			this.getView().setModel(oModel);

			if (window.sessionStorage["fieldval"] === null || window.sessionStorage["fieldval"] === undefined) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetLogin", null, true);
			}
			this.byId("drpsgolivedate_id").setDateValue(new Date());
			var oDefaultModel = this.getOwnerComponent().getModel();
			var Ids = window.sessionStorage["fieldval"];

			var oPartnerId = this.getView().byId("txtspartner_id");
			oDefaultModel.read("/UserRegistrationSet", {
				method: "GET",
				success: function (data) {
					oDefaultModel.refresh();
					var oPartnerData = new sap.ui.model.json.JSONModel(data.results);

					for (var i = 0; i < data.results.length; i++) {
						if (Ids === oPartnerData.getProperty("/" + [i] + "/PartnerName")) {
							var lastid1 = oPartnerData.getProperty("/" + [i] + "/PartnerID");
							oPartnerId.setValue(lastid1);
						}
					}
				}
			});
		},
		onSelectionChange: function () {
			var combobox = this.getView().byId("drpsServerType");
			if (combobox.getSelectedKey() === "SN") {
				var obj = {};
				this.getView().byId("idSysApp").getModel().setData({
					generalSec: {},
					ipsection: {}
				});
				this.getView().byId("idTabBarMultiMode").setVisible(true);
				//for Genral Section
				this.getView().byId("idServerSerialNumber").setVisible(true);
				this.getView().byId("idXclarityIP").setVisible(true);
				this.getView().byId("idXclarityIPServer1").setVisible(false);
				this.getView().byId("idXclarityIPServer2").setVisible(false);
				//for VMWare Section
				this.getView().byId("idSingleVMWareSection").setVisible(true);
				this.getView().byId("idMultiHanaVMWareSectionServer1").setVisible(false);
				this.getView().byId("idMultiHanaVMWareSectionServer2").setVisible(false);
				//for SELS Section
				this.getView().byId("idSingleSLESSection").setVisible(true);
				this.getView().byId("idMultiHanaSLESSectionServer1").setVisible(false);
				this.getView().byId("idMultiHanaSLESSectionServer2").setVisible(false);
				this.getView().byId("idTabBarNoIcons").setVisible(false);
			} else if (combobox.getSelectedKey() === "HA") {
				var obj = {};
				this.getView().byId("idSysApp").getModel().setData({
					generalSec: {},
					ipsection: {}
				});
				this.getView().byId("idTabBarMultiMode").setVisible(true);
				//for Genral Section
				this.getView().byId("idServerSerialNumber").setVisible(false);
				this.getView().byId("idXclarityIP").setVisible(false);
				this.getView().byId("idXclarityIPServer1").setVisible(true);
				this.getView().byId("idXclarityIPServer2").setVisible(true);
				//for VMWare Section
				this.getView().byId("idSingleVMWareSection").setVisible(false);
				this.getView().byId("idMultiHanaVMWareSectionServer1").setVisible(true);
				this.getView().byId("idMultiHanaVMWareSectionServer2").setVisible(true);
				//for SELS Section
				this.getView().byId("idSingleSLESSection").setVisible(false);
				this.getView().byId("idMultiHanaSLESSectionServer1").setVisible(true);
				this.getView().byId("idMultiHanaSLESSectionServer2").setVisible(true);
				this.getView().byId("idTabBarNoIcons").setVisible(false);
			} else if (combobox.getSelectedKey() === "HASAN") {
				this.getView().byId("idTabBarMultiMode").setVisible(false);
				this.getView().byId("idTabBarNoIcons").setVisible(true);
			}
		},
		onBackButtontosystemreg: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Dashboard", null, true);
			}
		},
		onValidate: function (oEvent) {

			/*var that = this;*/
			var oDefaultModel = this.getOwnerComponent().getModel();
			var NextVal = this.getView().byId("txtnextval");
			oDefaultModel.read("/SystemRegistrationSet", {
				method: "GET",
				success: function (data) {
					oDefaultModel.refresh();
					var oEmployees = new sap.ui.model.json.JSONModel(data.results);
					for (var i = 0; i < data.results.length; i++) {
						var lastid1 = oEmployees.getProperty("/" + [i] + "/SystemRegiID");
					}
					var lastid = lastid1 + 1;
					NextVal.setText(lastid);

					debugger;
				}
			});
			var myDate = this.getView().byId("drpsgolivedate_id").getValue();
			myDate = myDate.split("-");
			var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
			var XSFormate = new Date(newDate).getTime();
			var mm = "/Date(" + XSFormate + ")/";

			debugger;
			var oSystemRegiEntry = {};
			oSystemRegiEntry.PartnerID = parseInt(this.getView().byId("txtspartner_id").getValue());
			oSystemRegiEntry.JezzDeviceID = this.getView().byId("txtsjezzdeviceid").getValue();
			oSystemRegiEntry.CustomerName = this.getView().byId("txtsname_id").getValue();
			oSystemRegiEntry.GoLiveDate = mm; //"/Date(1422961324848)/"; //this.getView().byId("drpsgolivedate_id").getValue();
			oSystemRegiEntry.ServerType = this.getView().byId("drpsServerType").getSelectedKey();
			oSystemRegiEntry.InstallationSide = this.getView().byId("drpsInstallationSide").getSelectedKey();
			oSystemRegiEntry.EmailSupport = this.getView().byId("txtsemailsupport_id").getValue();
			oSystemRegiEntry.SystemRegiID = parseInt(this.getView().byId("txtnextval").getText());

			oDefaultModel.create("/SystemRegistrationSet", oSystemRegiEntry, {
				success: function () {
					alert("sucess");
				},
				error: function () {
					alert("error");
				}
			});

			var intall = this.getView().byId("idIntallation");
			oDefaultModel.read("/SystemRegiInstallationTypesSet", {
				method: "GET",
				success: function (data) {
					oDefaultModel.refresh();
					var oIntall = new sap.ui.model.json.JSONModel(data.results);
					for (var i = 0; i < data.results.length; i++) {
						var intallid1 = oIntall.getProperty("/" + [i] + "/IntallationID");
					}
					var intallid = intallid1 + 1;
					intall.setText(intallid);
				}
			});
			var oSystemNodeEntry = {};
			oSystemNodeEntry.IntallationID = parseInt(this.getView().byId("idIntallation").getText());
			oSystemNodeEntry.PartnerID = this.getView().byId("idPartner").getValue();
			oSystemNodeEntry.JezzDeviceID = this.getView().byId("idJezzDevice").getSelectedKey();
			oSystemNodeEntry.ServerType = this.getView().byId("drpsServerType").getSelectedKey();
			oSystemNodeEntry.TimeZone = this.getView().byId("idTimeZone").getValue();
			oSystemNodeEntry.KeyBoardLayout = this.getView().byId("idKeybordlayout").getValue();
			oSystemNodeEntry.Language = this.getView().byId("idLanguage").getValue();
			oSystemNodeEntry.Server_Serial_Number = this.getView().byId("idServerSerialNumber").getValue();
			oSystemNodeEntry.XclarityIP = this.getView().byId("idXclarityIP").getValue();
			oSystemNodeEntry.XclarityIP_Server1 = this.getView().byId("idXclarityIPServer1").getValue();
			oSystemNodeEntry.XclarityIP_Server2 = this.getView().byId("idXclarityIPServer2").getValue();
			oSystemNodeEntry.XclarityIP_Subnet = this.getView().byId("idXclarityIPSubnet").getValue();
			oSystemNodeEntry.GatewayIP = this.getView().byId("idGatewayIP").getValue();
			oSystemNodeEntry.DNS1 = this.getView().byId("idDNS1").getValue();
			oSystemNodeEntry.DNS2 = this.getView().byId("idDNS2").getValue();
			oSystemNodeEntry.NTPServer = this.getView().byId("idNTPServer").getValue();
			oSystemNodeEntry.SearchDomain = this.getView().byId("idSearchDomain").getValue();
			oSystemNodeEntry.DomainName = this.getView().byId("idDomainName").getValue();
			oSystemNodeEntry.ESXiMGMTIP = this.getView().byId("idESXiMGMTIP").getValue();
			oSystemNodeEntry.ESXiSubnet = this.getView().byId("idESXiSubnet").getValue();
			oSystemNodeEntry.ESXiServername = this.getView().byId("idESXiServerName").getValue();
			oSystemNodeEntry.ESXiRootpassword = this.getView().byId("idESXirootPassword").getValue();
			oSystemNodeEntry.VMWareVersion = this.getView().byId("idVMWareVersion").getSelectedKey();
			oSystemNodeEntry.ESXiMGMTIP_Server1 = this.getView().byId("idESXiMGMTIP1").getValue();
			oSystemNodeEntry.ESXiSubnet_Server1 = this.getView().byId("idESXiSubnet1").getValue();
			oSystemNodeEntry.ESXiServername_Server1 = this.getView().byId("idESXiServerName1").getValue();
			oSystemNodeEntry.ESXiRootpassword_Server1 = this.getView().byId("idESXirootPassword1").getValue();
			oSystemNodeEntry.VMWareVersion_Server1 = this.getView().byId("idVMWareVersion1").getSelectedKey();
			oSystemNodeEntry.ESXiMGMTIP_Server2 = this.getView().byId("idESXiMGMTIP2").getValue();
			oSystemNodeEntry.ESXiSubnet_Server2 = this.getView().byId("idESXiSubnet2").getValue();
			oSystemNodeEntry.ESXiServername_Server2 = this.getView().byId("idESXiServerName2").getValue();
			oSystemNodeEntry.ESXiRootpassword_Server2 = this.getView().byId("idESXirootPassword2").getValue();
			oSystemNodeEntry.VMWareVersion_Server2 = this.getView().byId("idVMWareVersion2").getSelectedKey();
			oSystemNodeEntry.Quantity_of_CPUs = this.getView().byId("idQuantityofCPUs").getSelectedKey();
			oSystemNodeEntry.Quantity_of_RAM = this.getView().byId("idQuantityofRAM").getSelectedKey();
			oSystemNodeEntry.SuSE_Linux_IP = this.getView().byId("idSusELinuxIP").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_Subnet = this.getView().byId("idSusSELinuxIPSubnet").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_Server_name = this.getView().byId("idSuSELinuxIPServerName").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_root_password = this.getView().byId("idSuSELinuxIProotPssword").getValue();
			oSystemNodeEntry.SuSE_Linux_Version = this.getView().byId("idSuSELinuxVersion").getValue();
			oSystemNodeEntry.separateB1 = this.getView().byId("idSeparateB1").getSelectedKey();
			oSystemNodeEntry.B1VolumeSize = this.getView().byId("idB1VolumeSize").getValue();
			oSystemNodeEntry.SuSELinuxKey = this.getView().byId("idSuSELinuxKey").getValue();
			oSystemNodeEntry.SuSELinux_registration_eMail = this.getView().byId("idSuSELinuxregeMail").getValue();
			oSystemNodeEntry.Quantity_of_CPUs_S1 = this.getView().byId("idQuantityofCPUs1").getSelectedKey();
			oSystemNodeEntry.Quantity_of_RAM_S1 = this.getView().byId("idQuantityofRAM1").getSelectedKey();
			oSystemNodeEntry.SuSE_Linux_IP_S1 = this.getView().byId("idSusELinuxIP1").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_Subnet_S1 = this.getView().byId("idSusSELinuxIPSubnet1").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_Server_name_S1 = this.getView().byId("idSuSELinuxIPServerName1").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_root_password_S1 = this.getView().byId("idSuSELinuxIProotPssword1").getValue();
			oSystemNodeEntry.SuSE_Linux_Version_S1 = this.getView().byId("idSuSELinuxVersion1").getValue();
			oSystemNodeEntry.separateB1_S1 = this.getView().byId("idSeparateB11").getSelectedKey();
			oSystemNodeEntry.B1VolumeSize_S1 = this.getView().byId("idB1VolumeSize1").getValue();
			oSystemNodeEntry.SuSELinuxKey_S1 = this.getView().byId("idSuSELinuxKey1").getValue();
			oSystemNodeEntry.SuSELinux_registration_eMail_S1 = this.getView().byId("idSuSELinuxregeMail1").getValue();
			oSystemNodeEntry.Quantity_of_CPUs_S2 = this.getView().byId("idQuantityofCPUs2").getSelectedKey();
			oSystemNodeEntry.Quantity_of_RAM_S2 = this.getView().byId("idQuantityofRAM2").getSelectedKey();
			oSystemNodeEntry.SuSE_Linux_IP_S2 = this.getView().byId("idSusELinuxIP2").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_Subnet_S2 = this.getView().byId("idSusSELinuxIPSubnet2").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_Server_name_S2 = this.getView().byId("idSuSELinuxIPServerName2").getValue();
			oSystemNodeEntry.SuSE_Linux_IP_root_password_S2 = this.getView().byId("idSuSELinuxIProotPssword2").getValue();
			oSystemNodeEntry.SuSE_Linux_Version_S2 = this.getView().byId("idSuSELinuxVersion2").getValue();
			oSystemNodeEntry.separateB1_S2 = this.getView().byId("idSeparateB12").getSelectedKey();
			oSystemNodeEntry.B1VolumeSize_S2 = this.getView().byId("idB1VolumeSize2").getValue();
			oSystemNodeEntry.SuSELinuxKey_S2 = this.getView().byId("idSuSELinuxKey2").getValue();
			oSystemNodeEntry.SuSELinux_registration_eMail_S2 = this.getView().byId("idSuSELinuxregeMail2").getValue();
			oSystemNodeEntry.Instance_Name = this.getView().byId("idInstanceName").getValue();
			oSystemNodeEntry.Instance_Code = this.getView().byId("idInstanceCode").getValue();
			oSystemNodeEntry.SYSTEMUserPassword = this.getView().byId("SYSUserPassword").getValue();
			oSystemNodeEntry.B1SYSTEMUserPassword = this.getView().byId("idB1SYSUserPassword").getValue();
			oSystemNodeEntry.InstanceUserPassword = this.getView().byId("idInstanceUserPassword").getValue();
			oSystemNodeEntry.LogVolumeSize = this.getView().byId("idLogVolumeSize").getValue();
			oSystemNodeEntry.DataVolumeSize = this.getView().byId("idDataVolumeSize").getValue();
			oSystemNodeEntry.HANARelease = this.getView().byId("idHANARelease").getSelectedKey();
			oSystemNodeEntry.HANAPatch = this.getView().byId("idHANAPatch").getSelectedKey();
			oSystemNodeEntry.B1SiteUser_Password = this.getView().byId("idB1SiteUserPassword").getValue();
			oSystemNodeEntry.SLD_Schema_Name = this.getView().byId("idSLDSchemaName").getValue();
			oSystemNodeEntry.B1iF_Admin_Password = this.getView().byId("idB1iFAdminPassword").getValue();
			oSystemNodeEntry.B1iF_Schema_Name = this.getView().byId("idB1iFSchemaName").getValue();
			oSystemNodeEntry.Service_Layer_Quantity = this.getView().byId("idServiceLayerQuantity").getValue();
			oSystemNodeEntry.Service_layer_Port = this.getView().byId("idServicelayerPort").getValue();
			oSystemNodeEntry.Install_Demo_Databases = this.getView().byId("idInstallDemoDatabases").getSelectedKey();
			oSystemNodeEntry.Install_Help_Files = this.getView().byId("idInstallHelpFiles").getSelectedKey();
			oSystemNodeEntry.Quantity_Users = this.getView().byId("idQuantityofUsers").getValue();
			oSystemNodeEntry.Backup_Temp_Path = this.getView().byId("idBackupTempPath").getValue();
			oSystemNodeEntry.NAS_mount_point = this.getView().byId("idNASMountPoint").getValue();
			oSystemNodeEntry.NAS_username = this.getView().byId("idNASUserName").getValue();
			oSystemNodeEntry.NAS_password = this.getView().byId("idNASPassword").getValue();
			oSystemNodeEntry.NAS_fqdn = this.getView().byId("idNASfqdn").getValue();
			oSystemNodeEntry.NAS_domain = this.getView().byId("idNASDomain").getValue();
			oSystemNodeEntry.Backup_retention_time = this.getView().byId("idBackupRetentionTime").getValue();
			oSystemNodeEntry.backup_interval = this.getView().byId("idBackupInterval").getSelectedKey();
			oSystemNodeEntry.Cloud_Backup = this.getView().byId("idCloudBackup").getSelectedKey();
			oSystemNodeEntry.Cloud_Backup_location = this.getView().byId("idCloudBackupLocation").getSelectedKey();
			oSystemNodeEntry.Schema_prefix = this.getView().byId("idSchemaPrefix").getValue();
			oSystemNodeEntry.Iggy_schema_names = this.getView().byId("idIggySchemaNames").getSelectedKey();
			oSystemNodeEntry.Windows_Server_name = this.getView().byId("idWindowsServerName").getValue();
			oSystemNodeEntry.Windows_Version = this.getView().byId("idWindowsVersion").getSelectedKey();
			oSystemNodeEntry.Windows_IP = this.getView().byId("idWindowsIP").getValue();
			oSystemNodeEntry.Windows_IP_Subnet = this.getView().byId("WindowsIPSubnet").getValue();
			oSystemNodeEntry.Administrator_Username_local = this.getView().byId("idAdminUserNameLocal").getValue();
			oSystemNodeEntry.Administrator_Password_local = this.getView().byId("idAdminPasswordLocal").getValue();
			oSystemNodeEntry.Install_B1_WebAccess = this.getView().byId("idInstallB1WebAccess").getSelectedKey();
			oSystemNodeEntry.Clients_to_install = this.getView().byId("idClientstoInstall").getSelectedKey();
			oSystemNodeEntry.API_to_install = this.getView().byId("idAPItoinstall").getSelectedKey();
			oSystemNodeEntry.Install_HANA_Studio = this.getView().byId("idInstallHANAStudio").getSelectedKey();
			oSystemNodeEntry.SystemRegiID = parseInt(this.getView().byId("txtnextval").getText());
			debugger;
			oDefaultModel.create("/SystemRegiInstallationTypesSet", oSystemNodeEntry, {
				success: function () {
					alert("sucess");
				},
				error: function () {
					alert("error");
				}
			});
			/*
			var requiredInputs = this.returnIdListOfRequiredFields();
			var passedValidation = this.validateEventFeedbackForm(requiredInputs);
			if (passedValidation === false) {
				//show an error message, rest of code will not execute.
				sap.m.MessageToast.show("Please Input all the field values");
				return false;
			} else {

			}*/

		},
		returnIdListOfRequiredFields: function () {
			var requiredInputs;
			return requiredInputs = ['partner_id', 'timezone_id', 'keylayout_id', 'lanuage_id',
				'servernum_id', 'xclarity_id', 'xclarityIP_id', 'gatewayIP_id', 'dns1_id', 'dns2_id', 'ntp_id',
				'search_id', 'Domain_id', 'ESXiMGMT_id', 'ESXisub_id', 'ESXiserver_id', 'ESXipwd_id', 'SuSEIP_id',
				'SuSElinux_id', 'SuSESerrverIP_id', 'SuSEIPpwd_id', 'SuSEversion_id', 'B1Volume_id', 'SuSEkey_id',
				'SuSELinuxregistration_id', 'Instancename_id', 'Instancecode_id', 'systemPwd_id', 'B1SYSTEMPwd_id',
				'InstanceUserPwd_id', 'logVolume_id', 'dataVolume_id', 'B1SiteUserPwd_id', 'SLDSchema_id', 'bB1ifPwd_id',
				'bB1ifschema_id', 'ServiceLayer_id', 'ServiceLayerPort_id', 'qualityusers_id', 'BackupPath_id', 'NASPoint_id',
				'NASusername_id', 'NASPwd_id', 'NASfqdn_id', 'NASdomain_id', 'BackupTime_id', 'Schemaprefix_id', 'WindowsServername_id',
				'WindowsIP_id', 'WindowsIPsub_id', 'AdminUsername_id', 'AdminPwd_id', 'TimeZone_id', 'KeyboardLayout_id',
				'Language_id', 'XclarityIP_id', 'XclarityIP2_id', 'XclarityIPSub_id', 'GatewayIP_id', 'DNS1_id', 'DNS2_id',
				'NTPServer_id', 'SearchDomain_id', 'domainname_id', 'ESXiMGMTIP_id', 'ESXisubnet_id', 'ESXiservername_id',
				'ESXipwd1_id', 'ESXiMGMTIP2_id', 'ESXiSubnet_id', 'ESXiServername_id', 'ESXirootPWD_id', 'SuSELinuxIP_id',
				'SuSELinuxIPServername_id', 'SuSELinuxPWD_id', 'SuSELinux_id', 'B1Volumesize_id', 'SuSELinnuxKey_id',
				'SuSELinuxregs_id', 'SuSELinuxIP1_id', 'SuSELinuxIPSub_id', 'SuSELinuxIPServer_id', 'SuSELinuxrootPWD_id',
				'SuSELinuxver_id', 'B1VolSize_id', 'SuSelinuxkey_id', 'SuSelinuxregsmail_id', 'InstanceName_id', 'InstanceCode_id',
				'SystemUserPWD_id', 'B1SYSTEMUserPWD_id', 'InstanceUserpwd_id', 'Logvol_id', 'DataVol_id', 'B1SiteUserpwd_id',
				'SLTschema_id', 'B1iFAdminPwd_id', 'B1iFSchemaName_id', 'ServicelayerQual_id', 'ServicelayerPort_id',
				'Qualuser_id', 'BackupTemp_id', 'NASMount_id', 'NASusername1_id', 'NASpwd_id', 'NASfqdn1_id', 'NASdomain1_id',
				'BackupRetntime_id', 'SchemaPref_id', 'WindowsServername1_id', 'WindowsIP1_id', 'WindowsIPSubnet_id', 'Adminlocal_id',
				'AdminlocalPWD_id', 'SuSeSubIP_id', 'date_id'
			];
		},

		validateEventFeedbackForm: function (requiredInputs) {
			var _self = this;
			var valid = true;
			requiredInputs.forEach(function (input) {
				var sInput = _self.getView().byId(input);
				if (sInput.getValue() == "" || sInput.getValue() == undefined) {
					valid = false;
					sInput.setValueState("Error");
					//	alert("Please Input all the field values");
				} else {
					sInput.setValueState("None");
				}
			});
			return valid;
		}
	});
});