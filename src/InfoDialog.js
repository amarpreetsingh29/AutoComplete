/// <reference path="../ts-declarations/backbone.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Constants", "../templates/InfoDialogTmpl", "../Utils/InfoDialogUtils"], function (require, exports, Constants_1, InfoDialogTmpl_1, InfoDialogUtils_1) {
    "use strict";
    var InfoDialog = (function (_super) {
        __extends(InfoDialog, _super);
        function InfoDialog(options) {
            _super.call(this, options);
            this.model = new Backbone.Model({ team: '', employee: '' });
            this.render();
        }
        InfoDialog.prototype.events = function () {
            return {
                'click [data-action]': 'onClickAction',
                'change .team-input': 'renderEmployeeContainer',
                'keyup .team-input': 'teamTypeAhead',
                'keyup .emp-input': 'empTypeAhead'
            };
        };
        InfoDialog.prototype.render = function () {
            var compiled = _.template(InfoDialogTmpl_1.tmpl);
            this.$el.html(compiled());
            this.renderTeamContainer();
            return this;
        };
        InfoDialog.prototype.onClickAction = function (evt) {
            var action = $(evt.target).attr('data-action');
            switch (action) {
                case 't-click':
                    this.updateTeam(evt);
                    break;
                case 'e-click':
                    this.updateEmployee(evt);
                    break;
                case 'ok':
                    this.ok();
                    break;
                case 'cancel':
                    this.cancel();
                    break;
                default:
                    break;
            }
        };
        //team
        InfoDialog.prototype.renderTeamContainer = function () {
            this.$el.find('.team-container').append(InfoDialogUtils_1.InfoDialogUtils.teamsContainer());
        };
        InfoDialog.prototype.updateTeam = function (evt) {
            this.setTeam($(evt.currentTarget).text());
            this.$el.find('.team-input').val(this.model.get('team'));
            this.hideTeamContainer();
            this.renderEmployeeContainer();
        };
        /**
         *
         * auto complete for team - can be made common
         * @param evt
         */
        InfoDialog.prototype.teamTypeAhead = function (evt) {
            var updatedSearchTerm = this.$el.find('.team-input').val().trim().toLowerCase();
            this.setTeam(updatedSearchTerm);
            updatedSearchTerm ? this.showTeamContainer() : this.hideTeamContainer();
            if (updatedSearchTerm) {
                var children = this.$el.find('.team-list').children();
                for (var i = 0; i < children.length; i++) {
                    var child = $(children[i]);
                    var index = child.text().toLowerCase().indexOf(updatedSearchTerm);
                    (index === -1) ? child.css('display', 'none') : child.css('display', 'block');
                }
            }
        };
        InfoDialog.prototype.showTeamContainer = function () {
            this.$el.find('.team-container').show();
        };
        InfoDialog.prototype.hideTeamContainer = function () {
            this.$el.find('.team-container').hide();
        };
        InfoDialog.prototype.setTeam = function (val) {
            this.model.set('team', val);
        };
        //team-end
        //employee
        InfoDialog.prototype.showEmpContainer = function () {
            this.$el.find('.emp-container').show();
        };
        InfoDialog.prototype.hideEmpContainer = function () {
            this.$el.find('.emp-container').hide();
        };
        InfoDialog.prototype.renderEmployeeContainer = function () {
            this.hideEmpContainer();
            this.resetEmployee();
            this.$el.find('.emp-container').empty().append(InfoDialogUtils_1.InfoDialogUtils.employeeContainer(this.model.get('team')));
        };
        InfoDialog.prototype.resetEmployee = function () {
            this.model.set('employee', '');
            this.$el.find('.emp-input').val('');
        };
        InfoDialog.prototype.updateEmployee = function (evt) {
            this.hideEmpContainer();
            this.setEmployee($(evt.currentTarget).text());
            this.$el.find('.emp-input').val(this.model.get('employee'));
        };
        /**
         *
         * auto complete for employee
         * @param evt
         */
        InfoDialog.prototype.empTypeAhead = function (evt) {
            var updatedSearchTerm = this.$el.find('.emp-input').val().trim().toLowerCase();
            this.setEmployee(updatedSearchTerm);
            updatedSearchTerm ? this.showEmpContainer() : this.hideEmpContainer();
            if (updatedSearchTerm) {
                var children = this.$el.find('.emp-list').children();
                for (var i = 0; i < children.length; i++) {
                    var child = $(children[i]);
                    var index = child.text().toLowerCase().indexOf(updatedSearchTerm);
                    (index === -1) ? child.css('display', 'none') : child.css('display', 'block');
                }
            }
        };
        InfoDialog.prototype.setEmployee = function (val) {
            this.model.set('employee', val);
        };
        //employee-end
        //dialog-validation
        InfoDialog.prototype.ok = function () {
            this.validateTeam() ? this.validateEmployee() ? this.destroy() : this.employeeInvalid() : this.teamInvalid();
        };
        InfoDialog.prototype.validateTeam = function () {
            var _this = this;
            return InfoDialogUtils_1.InfoDialogUtils.getTeams().filter(function (team) {
                return team.toLowerCase() === _this.model.get('team').toLowerCase();
            }).length ? true : false;
        };
        InfoDialog.prototype.validateEmployee = function () {
            var _this = this;
            return InfoDialogUtils_1.InfoDialogUtils.getEmployees(this.model.get('team')).filter(function (emp) {
                return emp.toLowerCase() === _this.model.get('employee').toLowerCase();
            }).length ? true : false;
        };
        InfoDialog.prototype.teamInvalid = function () {
            alert(Constants_1.Constants.MESSAGES.INVALID_TEAM);
        };
        InfoDialog.prototype.employeeInvalid = function () {
            alert(Constants_1.Constants.MESSAGES.INVALID_EMPLOYEE);
        };
        InfoDialog.prototype.cancel = function () {
            this.closeDialog();
        };
        InfoDialog.prototype.closeDialog = function () {
            if (this.model.get('team') || this.model.get('employee')) {
                var r = confirm(Constants_1.Constants.MESSAGES.CANCEL);
                if (r == true) {
                    this.destroy();
                }
            }
            else {
                this.destroy();
            }
        };
        /**
         *
         * remove events and destroy the dialog
         */
        InfoDialog.prototype.destroy = function () {
            this.model.destroy();
            this.undelegateEvents();
            this.$el.remove();
        };
        return InfoDialog;
    }(Backbone.View));
    return InfoDialog;
});
//# sourceMappingURL=InfoDialog.js.map