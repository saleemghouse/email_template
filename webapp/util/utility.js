sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (JSONModel, MessageBox) {
	"use strict";
	return {

		xmlToJson: function (obj) {
			var xml = '';
			for (var prop in obj) {
				xml += "<" + prop + ">";
				if (Array.isArray(obj[prop])) {
					for (var array of obj[prop]) {

						// A real botch fix here
						xml += "</" + prop + ">";
						xml += "<" + prop + ">";

						xml += this.xmlToJson(new Object(array));
					}
				} else if (typeof obj[prop] == "object") {
					xml += this.xmlToJson(new Object(obj[prop]));
				} else {
					xml += obj[prop];
				}
				xml += "</" + prop + ">";
			}
			var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
			return xml

		},
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