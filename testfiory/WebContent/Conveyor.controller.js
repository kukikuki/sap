sap.ui.controller("sap.m.sample.TileContainer.Conveyor", {
	
	
	handleNavButtonPress : function (evt) {
		this.nav.back("Page");
	},
	
	onInit: function() {
		var oTable = sap.ui.getCore().byId('Conveyor' + '--' + 'messagesFromConveyor');
		var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"), "theProject");
		oTable.setModel(oModel);		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf Conveyor
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf Conveyor
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf Conveyor
*/
//	onExit: function() {
//
//	}

});