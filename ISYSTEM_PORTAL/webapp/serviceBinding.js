function initModel() {
	var sUrl = "/ISYSTEM/jezz_Portal/webservice/WebService.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}