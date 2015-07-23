sap.ui.controller("sap.m.sample.TileContainer.Page", {

	onInit : function (evt) {
		
	},

	handleEditPress : function (evt) {
		var oTileContainer = this.getView().byId("container");
		var newValue = ! oTileContainer.getEditable();
		oTileContainer.setEditable(newValue);
		evt.getSource().setText(newValue ? "Done" : "Edit");
	},

	handleBusyPress : function (evt) {
		var oTileContainer = this.getView().byId("container");
		var newValue = ! oTileContainer.getBusy();
		oTileContainer.setBusy(newValue);
		evt.getSource().setText(newValue ? "Done" : "Busy state");
	},

	handleTileDelete : function (evt) {
		var tile = evt.getParameter("tile");
		evt.getSource().removeTile(tile);
	},
	
	gotoConveyorTile : function (evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Conveyor", context);
	},
	
	gotoRobotTile : function (evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Robot", context);		
	}
});