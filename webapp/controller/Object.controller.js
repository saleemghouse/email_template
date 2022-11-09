sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/formatter",
    "../model/models"
], function (BaseController, JSONModel, History, formatter,models) {
    "use strict";

    return BaseController.extend("emailtemplate.controller.Object", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            var oView = new JSONModel({
				mode: "C"
			});
			this.getView().setModel(oView, "oView");
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
			this.getRouter().getRoute("display").attachPatternMatched(this._onDisplayMatched, this);
        },
        /* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function (oEvent) {
			var oUploadSet = this.byId("usTemplate");
			oUploadSet.getDefaultFileUploader().setButtonOnly(false);
			oUploadSet.getDefaultFileUploader().setIconOnly(true);
			oUploadSet.getDefaultFileUploader().setIcon("sap-icon://attachment");
			/*	var sObjectId =  oEvent.getParameter("arguments").objectId;
				this.getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getModel().createKey("ZCDS_CA_C_EMAILSTAGINGATTCHMNT", {
						AttachmentGUID :  sObjectId
					});
					this._bindView("/" + sObjectPath);
				}.bind(this));*/
		},
		_onDisplayMatched: function (oEvent) {
			var sItem = oEvent.getParameter("arguments").item,
				oView = this.getModel("oView"),
				oTemplate = models.createTemplate();
			oTemplate = new JSONModel(oTemplate.getData().Templates[parseInt(sItem)]);
			oView.setProperty("/mode", "D");
			this.getView().setModel(oTemplate, "oTemp");
		},
    });

});
