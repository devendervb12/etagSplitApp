
sap.ui.core.UIComponent.extend("smax.etag.SPLITAPPP.Component", {
	
	metadata : {
		manifest : "json"
	},
	init : function(){
		sap.ui.core.UIComponent.prototype.init.apply(this);
		this.getRouter().initialize();
	}
})