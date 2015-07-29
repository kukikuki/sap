jQuery.sap.declare("sap.video.VideoContainer.Component");

sap.ui.core.UIComponent.extend("sap.video.VideoContainer.Component", {
	
	metadata : {
		rootView : "sap.video.VideoContainer.Video",
		dependencies : {
			libs : [
				"sap.m",
				"sap.ui.layout"
			]
		},
		config : {
			sample : {
				files : [
					"Video.view.xml",
					"Video.controller.js",
				]
			}
		}
	}

});