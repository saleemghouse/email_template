sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library",
    "sap/m/MessageBox"
], function (Controller, UIComponent, mobileLibrary, MessageBox) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;

    return Controller.extend("emailtemplate.controller.BaseController", {
        /**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onChangeTemp: function (oEvent) {
			var sSelected = oEvent.getSource().getSelectedKey(),
				oTemp = this.getModel("oTemp"),
				oView = this.getModel("oView");
			oTemp.setProperty("/Email_body", "");
			oView.setProperty("/DPlaceholders", "");
			this.byId("tbPlacehld").removeSelections();
			if (sSelected === 'pdf') {
				oTemp.setProperty("/Email_body", this.getResourceBundle().getText("EmailBody"));
			}

		},
		onSlctTabls: function (oEvent) {
			var sKey = oEvent.getSource().getSelectedKey(),
				aPlaceholdrs = this.getModel("oView").getProperty("/JsonPlacehldr");
			this._bindTable();
			if (sKey !== "") {
				aPlaceholdrs[sKey] = [];
				this.getModel("oView").setProperty("/JsonPlacehldr", aPlaceholdrs);
			}
		},
		_bindTable: function () {
			var oTemplate = sap.ui.xmlfragment("emailtemplate.view.subview.Items", this),
				oView = this.getModel("oView"),
				aDPlaceholders = oView.getProperty("/DPlaceholders");
			if (aDPlaceholders !== '') {
				oView.setProperty("/Placeholders", aDPlaceholders);
			}
			/*		this.byId("tbPlacehld").bindAggregation("items", {
						path: "oView>/Placeholders/",
						template: oTemplate,
						templateShareable: true
					});*/
			this.byId("tbPlacehld").bindItems({
				path: "oView>/Placeholders/",
				template: oTemplate,
				templateShareeable: false
			});
		},

		/**
		 * Adds a history entry in the FLP page history
		 * @public
		 * @param {object} oEntry An entry object to add to the hierachy array as expected from the ShellUIService.setHierarchy method
		 * @param {boolean} bReset If true resets the history before the new entry is added
		 */

    });

});