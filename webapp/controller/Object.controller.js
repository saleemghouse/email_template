sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"../model/formatter",
	"../model/models",
	"../util/utility"
], function (BaseController, JSONModel, History, formatter, models, utility) {
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
		onInit: function () {
			var oView = models.createObjectView();
			this.getView().setModel(oView, "oView");
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
			this.getRouter().getRoute("display").attachPatternMatched(this._onDisplayMatched, this);

		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onSlctPlcehlds: function (oEvent) {
			var aSelectItems = oEvent.getSource().getSelectedItems(),
				sEmail_Body;
			if (aSelectItems.length > 0) {
				for (var i = 0; i < aSelectItems.length; i++) {
					var oData = aSelectItems[i].getBindingContext("oView").getObject(),
						sName = oData.Name,
						sPhnam = oData.Phnam,
						aTables = this.byId("cbTables").getSelectedItem(),
						sTable = aTables.getText(),
						oTemp = this.getModel("oTemp"),
						aPlaceholdrs = this.getModel("oView").getProperty("/JsonPlacehldr");
					aPlaceholdrs[sTable].push({
						[sName]: sPhnam
					});
					this.getModel("oView").setProperty("/JsonPlacehldr", aPlaceholdrs);
					if (oTemp.getProperty("/Type") === 'xml') {
						sEmail_Body = utility.xmlToJson(aPlaceholdrs);
					} else {
						sEmail_Body = JSON.stringify(aPlaceholdrs);
					}
					oTemp.setProperty("/Email_body", sEmail_Body);
				}
			}
		},

		onCancel: function () {
			var oResource = this.getResourceBundle(),
				sText = oResource.getText("msgCnclPrcs"),
				sTitle = oResource.getText("msConfirmatn");
			utility.showConfirmation(sTitle, sText, this, 'CANCEL');
		},

		onDelTable: function (oEvent) {
			var aJsonPlacehldr = this.getModel("oView").getProperty("/JsonPlacehldr"),
				aPlaceholders = this.getModel("oView").getProperty("/Placeholders"),
				aTables = this.byId("cbTables").getSelectedItem(),
				sTable = aTables.getText(),
				oTemp = this.getModel("oTemp");
			if (sTable !== "") {
				for (const property in aJsonPlacehldr) {
					if (property === sTable) {
						delete aJsonPlacehldr[property];
					}
				}
				this.getModel("oView").setProperty("/JsonPlacehldr", aJsonPlacehldr);
				var iObjLength = Object.keys(aJsonPlacehldr).length,
					sEmail_Body = iObjLength === 0 ? '' : JSON.stringify(aJsonPlacehldr);
				oTemp.setProperty("/Email_body", sEmail_Body);
				oTemp.setProperty("/Column", "");
				this.getModel("oView").setProperty("/Placeholders", "");
				this.getModel("oView").setProperty("/DPlaceholders", aPlaceholders);
			}

		},
		onChangeBus: function (oEvent) {
			this.byId("tbPlacehld").setVisible(true);
		},
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
			var oUploadSet = this.byId("usTemplate"),
				oView = this.getModel("oView"),
				/*	oResource = this.getResourceBundle(),*/
				sType = oEvent.getParameter("arguments").type,
				oTemplate = models.createTemplateId();
			oView.setProperty("/TemplateType", sType);
			oView.setProperty("/mode", "C");
			this.byId("tbPlacehld").setVisible(false);
			/*	oTemplate.getData().Email_body= oResource.getText('EmailBody');*/
			this.getView().setModel(oTemplate, "oTemp");
			oUploadSet.getDefaultFileUploader().setButtonOnly(false);
			oUploadSet.getDefaultFileUploader().setIconOnly(true);
			oUploadSet.getDefaultFileUploader().setIcon("sap-icon://attachment");
			oView.setProperty("/bPageBusy", false);
		},
		_onDisplayMatched: function (oEvent) {
			var sItem = oEvent.getParameter("arguments").item,
				oView = this.getModel("oView"),
				oTemplate = models.createTemplate();
			oTemplate = new JSONModel(oTemplate.getData().Templates[parseInt(sItem)]);
			oView.setProperty("/mode", "D");
			this.getView().setModel(oTemplate, "oTemp");
			oView.setProperty("/bPageBusy", false);
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function (sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();
			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},
		_onBindingChange: function () {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.AttachmentGUID,
				sObjectName = oObject.AttachmentGUID;

			oViewModel.setProperty("/busy", false);
		}


	});

});
