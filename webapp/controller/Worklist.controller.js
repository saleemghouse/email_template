sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/models"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator,models) {
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
			this.getRouter().navTo("object",{
				type:oView.getProperty("/TemplateType")
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
