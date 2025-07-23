sap.ui.define([
	"sap/ui/core/mvc/Controller",
], function (Controller) {
	"use strict";
	return Controller.extend("productlistui.controller.externalDataFragment", {
		// Part1: new Part1(this), // this pointer is window here and not the Controller  
		onInit: function () {
			debugger;
		},
		onClick: function (oEvent) {
			console.log("I am in View1 Controller.");
			debugger;
		}
	});
});