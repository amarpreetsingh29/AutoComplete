define(["require", "exports"], function (require, exports) {
    "use strict";
    var Constants;
    (function (Constants) {
        Constants.data = [
            { team: 'Engineering', employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway'] },
            { team: 'Executive', employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj'] },
            { team: 'Finance', employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen'] },
            { team: 'Sales', employees: ['Ankit Jain', 'Anjali Maulingkar'] }
        ];
        Constants.MESSAGES = {
            INVALID_TEAM: 'Please select a valid team',
            INVALID_EMPLOYEE: 'Please select a valid employee',
            CANCEL: 'You have pending edits! Are you sure you want to close the dialog ?'
        };
    })(Constants = exports.Constants || (exports.Constants = {}));
});
//# sourceMappingURL=Constants.js.map