sap.ui.controller("sap.m.sample.TileContainer.Conveyor", {
	

	createDimensionFeed : function() {
		return new sap.viz.ui5.controls.common.feeds.FeedItem({
			"uid" : "axisLabels",
			"type" : "Dimension",
			"values" : [ "Timestamp" ]
		});
	}, 
	
	createMeasureFeed : function() {
		return new sap.viz.ui5.controls.common.feeds.FeedItem({
			"uid" : "primaryValues",
			"type" : "Measure",
			"values" : [ "Slider Value" ]
		});
	},
	
	createDataSet : function() {
		return new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [ {
				name : "Timestamp",
				value : "{sensor>G_CREATED}"
			} ],
			measures : [ {
				name : "Slider Value",
				value : "{sensor>C_VALUE}"
			} ],
			data : {
				path : "sensor>/"
			}
		});
	},
	
	getData : function() {
		// force Device Type ID conversion to UPPER case so it matches the table name convention
		var sDeviceTypeId = "d846f8db5771c34aea14".toUpperCase();
		var view = this.getView();
		view.setModel(new sap.ui.model.json.JSONModel(), "sensor");
		var fromDeviceMessageTypeId = "1"
		var sUrl = "data".concat("/", sDeviceTypeId).concat("/",
				fromDeviceMessageTypeId);
		jQuery
				.ajax({
					type : "GET", //d
					dataType : "json",
					url : sUrl,
					error : function(jqXHR, textStatus, errorThrown) {
						var sMessage = jqXHR.status + " " + jqXHR.statusText
								+ " " + jqXHR.responseText;
						jQuery.sap.log.error("getData()", sMessage,
								"index.html");
						sap.m.MessageToast.show(sMessage);
					},
					success : function(oData, textStatus, jqXHR) {
						if (oData === null || oData === undefined) {
							var sMessage = "WARNING. Received a null or undefined response object.";
							jQuery.sap.log.warning("getData()", sMessage,
									"index.html");
							sap.m.MessageToast.show(sMessage);
							return;
						}
						oData = oData.slice(0, 500);
						oData = oData.reverse();
						
						view.getModel("sensor").setData(oData);
						view.getModel("sensor").updateBindings(false);
					}
				});
	},
	
	buttonPushCtr1 : function (evt){
		var oData = {"messageType":"2","messages":[{"test":"switch on"}]};
		this.pushData(oData);
	},
	
	buttonPushCtr2 : function (evt){
		
	},
	
	buttonPushCtr3 : function (evt){
		
	},
	
	buttonPushCtr4 : function (evt){
		
	},

	pushData :  function(oData) {
		var oView = this.getView();
		var oSettings = oView.getModel("settings").getData();
		var sUrl = "data".concat("/", oSettings.deviceTypeId);
		oData.messageType = oSettings.toDeviceMessageTypeId;
		jQuery
				.ajax({
					type : "POST",
					contentType : "application/json",
					data : JSON.stringify(oData),
					url : sUrl,
					error : function(jqXHR, textStatus, errorThrown) {
						var sMessage = jqXHR.status + " " + jqXHR.statusText
								+ " " + jqXHR.responseText;
						jQuery.sap.log.error("pushData()", sMessage,
								"servlet.html");
						sap.m.MessageToast.show(sMessage);
					},
					success : function(oData, textStatus, jqXHR) {
						if (oData === null || oData === undefined) {
							var sMessage = "WARNING. Received a null or undefined response object.";
							jQuery.sap.log.warning("pushData()", sMessage,
									"servlet.html");
							sap.m.MessageToast.show(sMessage);
							return;
						}
						var sMessage = oData.msg;
						jQuery.sap.log.info("pushData()", sMessage,
								"servlet.html");
						sap.m.MessageToast.show(sMessage);
					}
				});
	},
	
	
	handleNavButtonPress : function (evt) {
		this.nav.back("Page");
	},
	
	handleChartPress : function (evt){
			var divStat = "#stat";
			var sHeight = $(divStat).height();
			var sWidth = $(divStat).width();
			var oVizFrame = new sap.viz.ui5.controls.VizFrame({
				width : sWidth,
				height : sHeight,
				vizType : "line",
				vizProperties : {
					plotArea : {
						dataLabel : {
							visible : false
						}
					},
					legend : {
						visible : false
					},
					title : {
						visible : false
					},
					categoryAxis : {
						title : {
							visible : false
						}
					}
				},
				xAxis : {
					title : {
						visible : false
					}
				},
				yAxis : new sap.viz.ui5.types.Axis({
					scale : new sap.viz.ui5.types.Axis_scale({
						fixedRange : true,
						minValue : 0,
						maxValue : 100
					})
				}),
				dataset : this.createDataSet()
			});
			oVizFrame.addFeed(this.createDimensionFeed());
			oVizFrame.addFeed(this.createMeasureFeed());
			var div = this.getView().byId("Conveyor--stat");
			div.addContent(oVizFrame);
			
	},

	onInit: function() {
		
		
		// данные из табл сбщ. Хз зачем, пусть будут пока
		
		this.getData();
		
		// настройки девайса
		
		var oSettingsModel = new sap.ui.model.json.JSONModel();
		oSettingsModel.setData({
			"deviceId" : "3fc592f2-b442-49e6-af9e-e6ca9237d933",
			"deviceTypeId" : "d846f8db5771c34aea14",
			"fromDeviceMessageTypeId" : "1",
			"toDeviceMessageTypeId" : "2",
		});
		
		var view = this.getView();
		
		view.setModel(oSettingsModel, "settings");	
		
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
		var msgFrame = "#Conveyor--msgs";

		// Эвент возвращает строку в формате "<id контр точки>-<состояние>"
		
		source.onmessage = function(event) {
			
			$(msgFrame).attr('src', $(msgFrame).attr('src')); // <-- говнокодище !!!!
			
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