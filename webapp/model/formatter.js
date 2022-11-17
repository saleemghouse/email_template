sap.ui.define([], function () {
    "use strict";

    return {

        setHeaderTitle: function (sTempName, sTempType, sMode) {
            var sTitle,
                oResource = this.getResourceBundle();
            if (sMode === 'C') {
                sTitle = sTempType === 'EMP' ? oResource.getText('TxtEmpTitle') : oResource.getText('TxtDMSTitle');
                return sTitle;
            } else {
                return sTempName;
            }

        }

    };

});