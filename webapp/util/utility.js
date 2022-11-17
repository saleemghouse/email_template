sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (JSONModel, MessageBox) {
	"use strict";
	return {
		showConfirmation: function (sTitle, sText, oView, sType) {
			MessageBox.show(sText, {
				icon: MessageBox.Icon.WARNING,
				title: sTitle,
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (sAction) {
					if (sAction === sap.m.MessageBox.Action.YES) {
						switch (sType) {
						case 'CANCEL':
							oView.getRouter().navTo('worklist');
							break;
						}

					}
				}
			});
		}

	};
});