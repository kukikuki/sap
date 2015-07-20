sap.ui.jsview("sap.m.sample.TileContainer.App", {

	getControllerName: function () {
		return "sap.m.sample.TileContainer.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.App();
		
		// load the master page
		var master = sap.ui.xmlview("Page", "sap.m.sample.TileContainer.Page");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		// load the conveyor page
		var detail = sap.ui.xmlview("Conveyor", "sap.m.sample.TileContainer.Conveyor");
		detail.getController().nav = this.getController();
		this.app.addPage(detail, false);
		
		// load the robot page
		var detail1 = sap.ui.xmlview("Robot", "sap.m.sample.TileContainer.Robot");
		detail1.getController().nav = this.getController();
		this.app.addPage(detail1, false);

	
		// done
		return this.app;
	}
});