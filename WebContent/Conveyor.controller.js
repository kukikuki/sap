sap.ui.controller("sap.m.sample.TileContainer.Conveyor", {
	
	
	handleNavButtonPress : function (evt) {
		this.nav.back("Page");
	},

	onInit: function() {
//		var oTable = this.getView().byId("Conveyor--messagesFromConveyor");
//		var oModel = new sap.ui.model.odata.ODataModel("proxy/i321397trial/iotmmsxs/iotservice.xsodata/", false); // load data from service
//		oTable.setModel(oModel);	
		
		// Эвенты для странички:

		var source = new EventSource("JdbcServlet");
		
		var idRed1 = "#Conveyor--red1";
		var idGreen1 = "#Conveyor--green1";

		var idRed2 = "#Conveyor--red2";
		var idGreen2 = "#Conveyor--green2";

		var idRed3 = "#Conveyor--red3";
		var idGreen3 = "#Conveyor--green3";

		var idRed4 = "#Conveyor--red4";
		var idGreen4 = "#Conveyor--green4";

		// Эвент возвращает строку в формате "<id контр точки>-<состояние>"
		
		source.onmessage = function(event) {
			
			var eventString = event.data;
			var deviceId = eventString.substring(0,1); 
			var state = eventString.substring(2);
			
			// обработка статуса и выпуливание на страничку
			
			if (deviceId == "1"){ // <-- говнокодище !!!!
				if (state == "busy"){
					$(idRed1).show();
					$(idGreen1).hide();
					
				} else if (state == "free"){
					$(idRed1).hide();
					$(idGreen1).show();
				}
			} 
			if (deviceId == "2"){
				if (state == "busy"){
					$(idRed2).show();
					$(idGreen2).hide();
					
				} else if (state == "free"){
					$(idRed2).hide();
					$(idGreen2).show();
				}
			} 
			if (deviceId == "3"){
				if (state == "busy"){
					$(idRed3).show();
					$(idGreen3).hide();
					
				} else if (state == "free"){
					$(idRed3).hide();
					$(idGreen3).show();
				}
			} 
			if (deviceId == "4"){
				if (state == "busy"){
					$(idRed4).show();
					$(idGreen4).hide();
					
				} else if (state == "free"){
					$(idRed4).hide();
					$(idGreen4).show();
				}
			};
		}
	}

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