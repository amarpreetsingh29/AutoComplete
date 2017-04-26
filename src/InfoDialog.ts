
/// <reference path="../ts-declarations/backbone.d.ts" />

import {Constants} from "./Constants";
import {tmpl} from "../templates/InfoDialogTmpl";
import {InfoDialogUtils} from "../Utils/InfoDialogUtils";


class InfoDialog extends Backbone.View<any> {
    constructor(options?) {
        super(options);
        this.model = new Backbone.Model({team:'',employee:''});
        this.render();
    }

    events() {
        return {
            'click [data-action]': 'onClickAction',
            'change .team-input':'renderEmployeeContainer',
            'keyup .team-input': 'teamTypeAhead',
            'keyup .emp-input': 'empTypeAhead',
        }
    }

    render() {
        let compiled = _.template(tmpl);
        this.$el.html(compiled());
        this.renderTeamContainer();
        return this;
    }

    onClickAction(evt: JQueryEventObject) {
        let action = $(evt.target).attr('data-action');
        switch (action) {
            case 't-click':
                this.updateTeam(evt)
                break;
            case 'e-click':
                this.updateEmployee(evt)
                break;
            case 'ok':
                this.ok()
                break;
            case 'cancel':
                this.cancel()
                break;
            default:
                break;
        }
    }


    //team
    renderTeamContainer() {
        this.$el.find('.team-container').append(InfoDialogUtils.teamsContainer());
    }


    updateTeam(evt: JQueryEventObject) {
        this.setTeam($(evt.currentTarget).text());
        this.$el.find('.team-input').val(this.model.get('team'));
        this.hideTeamContainer();
        this.renderEmployeeContainer();
    }

    /**
     *
     * auto complete for team - can be made common
     * @param evt
     */

    teamTypeAhead(evt: JQueryEventObject) {
        let updatedSearchTerm: string = this.$el.find('.team-input').val().trim().toLowerCase();
        this.setTeam(updatedSearchTerm);
        updatedSearchTerm ? this.showTeamContainer() : this.hideTeamContainer();
        if (updatedSearchTerm) {
            let children = this.$el.find('.team-list').children();
            for (var i = 0; i < children.length; i++) {
                var child = $(children[i]);
                let index = child.text().toLowerCase().indexOf(updatedSearchTerm);
                (index === -1) ? child.css('display', 'none') : child.css('display', 'block');
            }
        }
    }

    showTeamContainer() {
        this.$el.find('.team-container').show();
    }

    hideTeamContainer() {
        this.$el.find('.team-container').hide();
    }

    setTeam(val) {
        this.model.set('team',val);
    }

    //team-end

    //employee

    showEmpContainer() {
        this.$el.find('.emp-container').show();
    }

    hideEmpContainer() {
        this.$el.find('.emp-container').hide();
    }

    renderEmployeeContainer() {
        this.hideEmpContainer();
        this.resetEmployee();
        this.$el.find('.emp-container').empty().append(InfoDialogUtils.employeeContainer(this.model.get('team')));
    }

    resetEmployee() {
        this.model.set('employee','');
        this.$el.find('.emp-input').val('');
    }

    updateEmployee(evt) {
        this.hideEmpContainer();
        this.setEmployee($(evt.currentTarget).text());
        this.$el.find('.emp-input').val( this.model.get('employee'));
    }

    /**
     *
     * auto complete for employee
     * @param evt
     */

    empTypeAhead(evt: JQueryEventObject) {
        let updatedSearchTerm: string = this.$el.find('.emp-input').val().trim().toLowerCase();
        this.setEmployee(updatedSearchTerm);
        updatedSearchTerm ? this.showEmpContainer() : this.hideEmpContainer();
        if (updatedSearchTerm) {
            let children = this.$el.find('.emp-list').children();
            for (var i = 0; i < children.length; i++) {
                var child = $(children[i]);
                let index = child.text().toLowerCase().indexOf(updatedSearchTerm);
                (index === -1) ? child.css('display', 'none') : child.css('display', 'block');
            }
        }
    }

    setEmployee(val){
        this.model.set('employee',val);
    }

    //employee-end

    //dialog-validation
    ok() {
        this.validateTeam() ? this.validateEmployee() ? this.destroy() : this.employeeInvalid() : this.teamInvalid();
    }

    validateTeam() {
       return InfoDialogUtils.getTeams().filter((team)=>{
            return team.toLowerCase() === this.model.get('team').toLowerCase();
        }).length ? true : false;
    }

    validateEmployee() {
        return InfoDialogUtils.getEmployees(this.model.get('team')).filter((emp)=>{
            return emp.toLowerCase() === this.model.get('employee').toLowerCase();
        }).length ? true : false;
    }

    teamInvalid() {
        alert(Constants.MESSAGES.INVALID_TEAM);
    }

    employeeInvalid() {
        alert(Constants.MESSAGES.INVALID_EMPLOYEE);
    }

    cancel() {
        this.closeDialog();
    }

    closeDialog() {
        if (this.model.get('team') || this.model.get('employee')) {
            var r = confirm(Constants.MESSAGES.CANCEL);
            if (r == true) {
                this.destroy();
            }
        } else {
            this.destroy();
        }
    }

    /**
     *
     * remove events and destroy the dialog
     */
    destroy() {
        this.model.destroy();
        this.undelegateEvents();
        this.$el.remove();
    }

    //dialog-validation end


}
export = InfoDialog;