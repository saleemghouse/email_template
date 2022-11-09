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
			var oModel = new JSONModel({Templates:[{
				Emailid: 'saleem.ghouse325@gmail.com',
				Template_name: 'ZGEAEM001',
				Temoplate_desc: 'Account creation',
				Email_body: '',
				Email_subject: 'Account created successfully',
				Attach_req: false,
				Created_by: "NCS_SHAP",
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
				Created_Date: new Date('2022-11-01'),
				Modified_By: 'NCS_SHAP',
				Modified_Date: new Date('2022-11-08'),
				Placeholders:[{
				Name:"Full Name",
				Phnam:"$ZGES_EMAIL-NAME$"
				},{
				Name:"Address",
				Phnam:"$ZGES_EMAIL-ADDR$"
				},{
				Name:"Date",
				Phnam:"$ZGES_EMAIL-Date$"
				},{
				Name:"Admin",
				Phnam:"$ZGES_EMAIL-ADMIN$"
				}]
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
				Modified_Date: new Date('2022-11-08'),
				Placeholders:[{
				Name:"Full Name",
				Phnam:"$ZGES_EMAIL-NAME$"
				},{
				Name:"Address",
				Phnam:"$ZGES_EMAIL-ADDR$"
				},{
				Name:"Date",
				Phnam:"$ZGES_EMAIL-Date$"
				},{
				Name:"Admin",
				Phnam:"$ZGES_EMAIL-ADMIN$"
				}]
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
				Modified_Date: new Date('2022-11-08'),
				Placeholders:[{
				Name:"Full Name",
				Phnam:"$ZGES_EMAIL-NAME$"
				},{
				Name:"Address",
				Phnam:"$ZGES_EMAIL-ADDR$"
				},{
				Name:"Date",
				Phnam:"$ZGES_EMAIL-Date$"
				},{
				Name:"Admin",
				Phnam:"$ZGES_EMAIL-ADMIN$"
				}]
			}, {
				Emailid: 'saleem.ghouse325@gmail.com',
				Template_name: 'ZGEAEM005',
				Temoplate_desc: 'Account created successfully',
				Email_body: '',
				Email_subject: 'Account created successfully',
				Attach_req: false,
				Created_by: "NCS_SHAP",
				Created_Date: new Date('2022-11-01'),
				Modified_By: 'NCS_SHAP',
				Modified_Date: new Date('2022-11-08'),
				Placeholders:[{
				Name:"Full Name",
				Phnam:"$ZGES_EMAIL-NAME$"
				},{
				Name:"Address",
				Phnam:"$ZGES_EMAIL-ADDR$"
				},{
				Name:"Date",
				Phnam:"$ZGES_EMAIL-Date$"
				},{
				Name:"Admin",
				Phnam:"$ZGES_EMAIL-ADMIN$"
				}]
			}]});
			return oModel;
		}

	};
});