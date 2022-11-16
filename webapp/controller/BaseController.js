sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library"
], function (Controller, UIComponent, mobileLibrary) {
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
        onShareEmailPress: function () {
            var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
            URLHelper.triggerEmail(
                null,
                oViewModel.getProperty("/shareSendEmailSubject"),
                oViewModel.getProperty("/shareSendEmailMessage")
            );
        },
        onChangeTemp: function (oEvent) {
            var sSelected = oEvent.getSource().getSelectedKey(),
                tbPlacehld = this.byId("tbPlacehld"),
                oTemp = this.getModel("oTemp");
            if (sSelected === 'pdf') {
                tbPlacehld.setVisible(true);
                this._bindTable();
                oTemp.setProperty("/Email_body", this.getResourceBundle().getText("EmailBody"));
            } else {
                tbPlacehld.setVisible(true);
                this._bindTable();
                oTemp.setProperty("/Email_body", '');
            }

        },
        _bindTable: function () {
            var oTemplate = sap.ui.xmlfragment("emailtemplate.view.subview.Items", this);
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

      
    });

});