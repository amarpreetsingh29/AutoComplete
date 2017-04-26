/// <reference path="../ts-declarations/jquery.d.ts" />

import {Constants} from "../src/Constants"

export  class InfoDialogUtils {
    public static teamsContainer(){
        let teams = this.getTeams();
        let df = $('<div class="team-list">')
        teams.forEach((team)=>{
            let str = `<div data-action="t-click" class="team-option">${team}</div>`;
            df.append($(str));
        });
        return df;
    }
    public static getTeams(){
        return Constants.data.map((temp)=>{
            return temp.team;
        })
    }
    public static employeeContainer(team){
        let temp= this.getEmployees(team);
        let df = $('<div class="emp-list">')
        temp.forEach((emp)=>{
            let str = `<div data-action="e-click" class="emp-option">${emp}</div>`;
            df.append($(str));
        });
        return df;
    }
    public static getEmployees(team){
        let temp=new Array();
        let data = Constants.data;
        for(let i=0; i<data.length;i++){
            if(data[i].team.toLowerCase() === team.toLowerCase()){ // has to be modified as per req.
                temp = data[i].employees;
            }
        }
        return temp;
    }
}