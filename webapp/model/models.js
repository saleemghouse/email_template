sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/base/util/ObjectPath"
], function (JSONModel, Device, ObjectPath) {
	"use strict";
	return {
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createFLPModel: function () {
			var fnGetUser = ObjectPath.get("sap.ushell.Container.getUser"),
				bIsShareInJamActive = fnGetUser ? fnGetUser().isJamActive() : false,
				oModel = new JSONModel({
					isShareInJamActive: bIsShareInJamActive
				});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createTemplate: function () {
			var oModel = new JSONModel({
				Templates: [{
					Emailid: 'saleem.ghouse325@gmail.com',
					Template_name: 'ZGEAEM001',
					Temoplate_desc: 'Account creation',
					Email_body: '',
					Email_subject: 'Account created successfully',
					Attach_req: false,
					Created_by: "NCS_SHAP",
					Type: "pdf",
					Created_Date: new Date('2022-11-01'),
					Modified_By: 'NCS_SHAP',
					Modified_Date: new Date('2022-11-08')
				}, {
					Emailid: 'saleem.ghouse325@gmail.com',
					Template_name: 'ZGEAEM002',
					Temoplate_desc: 'Account created successfully',
					Email_body: '',
					Email_subject: 'Account created successfully',
					Attach_req: false,
					Created_by: "NCS_SHAP",
					Type: "xml",
					Created_Date: new Date('2022-11-01'),
					Modified_By: 'NCS_SHAP',
					Modified_Date: new Date('2022-11-08')
				}, {
					Emailid: 'saleem.ghouse325@gmail.com',
					Template_name: 'ZGEAEM003',
					Temoplate_desc: 'Account created successfully',
					Email_body: '',
					Email_subject: 'Account created successfully',
					Attach_req: false,
					Created_by: "NCS_SHAP",
					Created_Date: new Date('2022-11-01'),
					Modified_By: 'NCS_SHAP',
					Type: "pdf",
					Modified_Date: new Date('2022-11-08')
				}, {
					Emailid: 'saleem.ghouse325@gmail.com',
					Template_name: 'ZGEAEM004',
					Temoplate_desc: 'Account created successfully',
					Email_body: '',
					Email_subject: 'Account created successfully',
					Attach_req: false,
					Created_by: "NCS_SHAP",
					Created_Date: new Date('2022-11-01'),
					Modified_By: 'NCS_SHAP',
					Modified_Date: new Date('2022-11-08')
				}, {
					Emailid: 'saleem.ghouse325@gmail.com',
					Template_name: 'ZGEAEM005',
					Temoplate_desc: 'Account created successfully',
					Email_body: '',
					Email_subject: 'Account created successfully',
					Attach_req: false,
					Type: "pdf",
					Created_by: "NCS_SHAP",
					Created_Date: new Date('2022-11-01'),
					Modified_By: 'NCS_SHAP',
					Modified_Date: new Date('2022-11-08')

				}]
			});
			return oModel;
		},
		createOverview: function () {
			var oModel = new JSONModel({
				TemplateType: "EMP",
				Template: ''
			});
			return oModel;
		},

		createObjectView: function () {
			var oView = new JSONModel({
				mode: "C",
				TemplateType: "",
				Placeholders: [{
					Name: "Logo",
					Phnam: "$LOGO$"
				}, {
					Name: "Address",
					Phnam: "$ADDRESS$"
				}, {
					Name: "Start Body",
					Phnam: "$Start_Body$"
				}, {
					Name: "End Body",
					Phnam: "$End_Body$"
				}, {
					Name: "Items",
					Phnam: "$T_POITEMS$"
				}]

			});
			return oView;
		},
		createTemplateId: function () {
			var oModel = new JSONModel({
					Email_body: '',
					Attach_req: false,
					Type:'',
					EMAILBODY:''
			});
			return oModel;
		}

	};
});