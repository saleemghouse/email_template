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
        onInit: function () {
			this.getRouter().getRoute("worklist").attachPatternMatched(this._onWorkListMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onCreate: function () {
			this.getRouter().navTo("object");
		},
		onPress:function(oEvent){
			var sPath = oEvent.getSource().getBindingContext("oTemp").getPath();
				sPath=sPath.split("/")[sPath.split("/").length-1];
				this.getRouter().navTo("display",{
					item:sPath
				});
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		_onWorkListMatched: function () {
			var oTemplate = models.createTemplate();
			this.getView().setModel(oTemplate, "oTemp");
		}
        
    });
});
