sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        handleAddAll: async function(oBindingContext, aSelectedContexts) {
            MessageToast.show("Custom handler invoked.");
            debugger;
            let selectecValues = aSelectedContexts.map(line =>  line.getValue())
            const sActionName = "UpdateStockForAll";
            const mParameters = {
                model: this.editFlow.getView().getModel(),
                invocationGrouping: true,
                skipParameterDialog: true,
                parameterValues: [
                    { name: "payload", value: selectecValues}
                ]
            };

            // Invoke the backend action
            const actionResult = await this.editFlow.invokeAction(sActionName, 
                mParameters)
                .then( function (res) {
                    const retValue = res.getValue().value; 
                    MessageToast.show("returned value: " + retValue);                    
                } ); 

        }
    };
});
