sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('productlistui.ext.controller.ListPageCustController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			onBeforeRebindTableExtension: function () {
				console.log('test');
			},

			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf productlistui.ext.controller.ListPageCustController
			 */
			onInit: function () {
				debugger;
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}

		},

		onTestAction: async function (oBindingContext, aSelectedContexts) {
			console.log("onTestAction");
			debugger;
			let selectecValues = aSelectedContexts.map(line => line.getValue());

			let oModel = this.getView().getModel();
			const oOperation = oModel.bindContext("/UpdateStockForAll(...)");

			oOperation.setParameter("payload", selectecValues);

			let actResult = await oOperation.execute()
				.then(function (oResult) {
					// MessageToast.show("Action completed: " + oResult);
					debugger;
				})
				.catch(function (oError) {
					// MessageToast.show("Action failed: " + oError.message);
					debugger;
				});


			debugger;

			this.base.getExtensionAPI().refresh().then(() => {
				debugger;
			})
		},
		onHandleAddAll: async function (oBindingContext, aSelectedContexts) {
			MessageToast.show("Custom handler invoked.");
			debugger;
			let selectecValues = aSelectedContexts.map(line => line.getValue())
			const sActionName = "UpdateStockForAll";
			const mParameters = {
				model: this.editFlow.getView().getModel(),
				invocationGrouping: true,
				skipParameterDialog: true,
				parameterValues: [
					{ name: "payload", value: selectecValues }
				]
			};

			// Invoke the backend action
			const actionResult = await this.editFlow.invokeAction(sActionName,
				mParameters)
				.then(function (res) {
					const retValue = res.getValue().value;
					MessageToast.show("returned value: " + retValue);
				});
			debugger;

		}


	});
});
