/// <reference path="../ts-declarations/jquery.d.ts" />
define(["require", "exports", "../src/Constants"], function (require, exports, Constants_1) {
    "use strict";
    var InfoDialogUtils = (function () {
        function InfoDialogUtils() {
        }
        InfoDialogUtils.teamsContainer = function () {
            var teams = this.getTeams();
            var df = $('<div class="team-list">');
            teams.forEach(function (team) {
                var str = "<div data-action=\"t-click\" class=\"team-option\">" + team + "</div>";
                df.append($(str));
            });
            return df;
        };
        InfoDialogUtils.getTeams = function () {
            return Constants_1.Constants.data.map(function (temp) {
                return temp.team;
            });
        };
        InfoDialogUtils.employeeContainer = function (team) {
            var temp = this.getEmployees(team);
            var df = $('<div class="emp-list">');
            temp.forEach(function (emp) {
                var str = "<div data-action=\"e-click\" class=\"emp-option\">" + emp + "</div>";
                df.append($(str));
            });
            return df;
        };
        InfoDialogUtils.getEmployees = function (team) {
            var temp = new Array();
            var data = Constants_1.Constants.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].team.toLowerCase() === team.toLowerCase()) {
                    temp = data[i].employees;
                }
            }
            return temp;
        };
        return InfoDialogUtils;
    }());
    exports.InfoDialogUtils = InfoDialogUtils;
});
//# sourceMappingURL=InfoDialogUtils.js.map