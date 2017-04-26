export var tmpl = `
        <div class="info-dialog-close" >
             <span class="glyphicon glyphicon-remove " data-action="cancel"></span>
        </div>
        <div class="info-dialog-header">
            <h2>Select an Employee</h2>
        </div>
        <div class="info-dialog-body">
            <input type="checkbox" id="mail-chkbx">
            <span><label for="mail-chkbx">Send welcome mail to the employees</label></span>
            <div class="team-info" >
                <label>Select a Team in the Organization</label>
                <input type="text" class="team-input form-control" placeholder="Select Team...">
                <div class="team-container" style="display: none"></div>
            </div>
            <div class="employee-info">
                <label>Select an Employee</label>
                <input type="text" class="emp-input form-control" placeholder="Select Employee..." >
                <div class="emp-container" style="display: none"></div>
            </div>
        </div>
        <div class="info-dialog-footer">
            <button class="btn-cancel btn" data-action="cancel">Cancel</button>
            <button class="btn-ok btn btn-info" data-action="ok">OK</button>
        </div>
`;