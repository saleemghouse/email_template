sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../model/models",
	"../util/utility",
	"sap/ui/core/Fragment"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, models, utility, Fragment) {
	"use strict";

	return BaseController.extend("emailtemplate.controller.Worklist", {

		formatter: formatter,
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			this.getRouter().getRoute("worklist").attachPatternMatched(this._onWorkListMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onCreate: function (oEvent) {
			var oView = this.getModel("oView");
			this.getRouter().navTo("object", {
				type: oView.getProperty("/TemplateType")
			});
		},
		onPress: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext("oTemp").getPath();
			sPath = sPath.split("/")[sPath.split("/").length - 1];
			this.getRouter().navTo("display", {
				item: sPath
			});
		},
		onResetFilters: function (oEvent) {
			var oView = this.getModel("oView"),
				drCrated = this.byId("drCreated");
			oView.setProperty("/TemplateType", "");
			oView.setProperty("/Template", "");
			drCrated.setDateValue(null);
			drCrated.setSecondDateValue(null);
		},
		onDelItem: function (oEvent) {
			var oResource = this.getResourceBundle(),
				sTemplate = oEvent.getSource().getBindingContext("oTemp").getProperty("Template_name"),
				sText = oResource.getText("msgDel", [sTemplate]),
				sTitle = oResource.getText("msConfirmatn");
			utility.showConfirmation(sTitle, sText, this, 'DEL');
		},

		onValueHelpRequest: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();
			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "emailtemplate.fragments.Template",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpDialog.then(function (oDialog) {
				// Create a filter for the binding
				/*	oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);*/
				// Open ValueHelpDialog filtered by the input's value
				oDialog.open();
			});
		},

		onValueHelpSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			/*		var oFilter = new Filter("Name", FilterOperator.Contains, sValue);
					oEvent.getSource().getBinding("items").filter([oFilter]);*/
		},

		onValueHelpClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem"),
				oView = this.getModel("oView");
			/*oEvent.getSource().getBinding("items").filter([]);
			if (!oSelectedItem) {
				return;
			}*/
			oView.setProperty("/Template", oSelectedItem.getTitle());
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		_onWorkListMatched: function () {
			var oTemplate = models.createTemplate(),
				oView = models.createOverview();
			this.getView().setModel(oTemplate, "oTemp");
			this.getView().setModel(oView, "oView");
		}

	});
});