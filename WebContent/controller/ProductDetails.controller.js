sap.ui.controller("smax.etag.SPLITAPPP.controller.ProductDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductDetails
*/
	onInit: function() {
		
		this.getOwnerComponent().getRouter().getRoute("toDetails").attachPatternMatched(function(oEvent){
					
			this.getView().bindElement("/ProductSet('"+oEvent.getParameters().arguments.prodId+"')");
			
		}, this)
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.ProductDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.ProductDetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.ProductDetails
*/
//	onExit: function() {
//
//	}
	onCreate : function(){
		var odialog = new sap.m.Dialog({
			title : "Create Product",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input()
			],
			buttons :[
				new sap.m.Button({ text : "Save and Close",press : function(){
					//create a entry in model
                    var data = {
                    		ProductID : odialog.getContent()[1].getValue(),
                    		Name : odialog.getContent()[3].getValue(),
                    		Category : odialog.getContent()[5].getValue()
                    }
					var oModel = odialog.getModel();
					
					oModel.create("/ProductSet", data, {
						success : function(){
							sap.m.MessageToast.show("Data Created");
						},
						error : function(){
							sap.m.MessageToast.show("Data Not Created");
						}
					})
					odialog.close();
				} }),
				new sap.m.Button({ text : "Cancel", press : function(){
					odialog.close();
				}
				})
				
			]
		});
		
		odialog.setModel(this.getOwnerComponent().getModel());
		odialog.open();
	},
	onUpdate : function(){
		var oController = this;
		var odialog = new sap.m.Dialog({
			title : "Update Product Name",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input({editable : false, value: oController.getView().byId("idObjHeader").getNumber()}),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input({value : oController.getView().byId("idObjHeader").getTitle()}),
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input({editable : false, value : oController.getView().byId("idObjAttr").getText()})
			],
			buttons : [
				new sap.m.Button({ text : "Update and Close", press : function(){
					var data = {
							Name : odialog.getContent()[3].getValue()
					}
					var oModel = odialog.getModel();
					oModel.update("/ProductSet('"+oController.getView().byId("idObjHeader").getNumber()+"')", data,
					   {
						success : function(data,response){
							debugger;
							sap.m.MessageToast.show("Data Updated");
						},
						error : function(error){
							debugger;
							sap.m.MessageToast.show("Data Not Updated");
						}
					   }		
					
					);
					odialog.close();
				} 
				
				}),
				new sap.m.Button({ text : "Cancel", press : function(){
					odialog.close();
				} })
				
			]
		});
		odialog.setModel(this.getOwnerComponent().getModel());
		odialog.open();
	}

});