requirejs.config({
    shim: {
        'libs/backbone': {
            deps: ['libs/underscore', 'libs/jquery/src/jquery'],
        }
    }
});
require(['libs/jquery/src/jquery','libs/underscore', 'libs/backbone'],function ($,_,Backbone) {
    require(['src/InfoDialog'],function (InfoDialog) {
       var _dlg= new InfoDialog({className:'info-dialog'});
        $('body').find('.app-container').append(_dlg.$el);
    })
});