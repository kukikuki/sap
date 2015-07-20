jQuery.sap.declare("sap.m.sample.TileContainer.Component");

sap.ui.core.UIComponent.extend("sap.m.sample.TileContainer.Component", {
	
	createContent : function() {
	
	var oView = sap.ui.view({
		id : "app",
		viewName : "sap.m.sample.TileContainer.App",
		type : "JS",
		viewData : { component : this }
	});
	
	return oView;
	}

});