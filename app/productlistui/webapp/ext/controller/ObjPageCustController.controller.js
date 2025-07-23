sap.ui.define(['sap/ui/core/mvc/ControllerExtension', "sap/ui/model/json/JSONModel", "sap/suite/ui/generic/template/ObjectPage/extensionAPI/ExtensionAPI"],
	function (ControllerExtension, JSONModel, ExtensionAPI) {
		'use strict';

		return ControllerExtension.extend('productlistui.ext.controller.ObjPageCustController', {
			// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
			override: {
				/**
				 * Called when a controller is instantiated and its View controls (if available) are already created.
				 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
				 * @memberOf productlistui.ext.controller.ObjPageCustController
				 */
				onInit: function (oEvent, oContext, oTest) {

					// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
					// var oModel = this.base.getExtensionAPI().getModel();
				},

				routing: {
					onAfterBinding: async function (oBindingContext) {

						let items = await oBindingContext.requestObject(oBindingContext.getPath()).then(function (aItems) {
							return aItems;
						});

						let oModelOdata = this.base.getExtensionAPI().getModel();
						const oContextBinding = oModelOdata.bindContext("/Products", null,
							{ $filter: "type eq 'Mobile'" });
						// [new sap.ui.model.Filter("type", "eq", "Mobile")]);
						debugger;
						oContextBinding.requestObject().then(oData => {

							debugger;
						});

						var oModel = new JSONModel({
							"name": "TestName",
							"age": 99
						});
						this.getView().setModel(oModel, "testModel");
					}
				}
			},
			onClick: function (oEvent) {
				//This is not working yet
				console.log("I am in View1 Controller.");
				debugger;
			}
		});
	});
