app.module('that',    
    [],

    function() {
        var mods = app.modules;
        var self = {};
        var foo = {};

        self.init = function() {
            console.log('init that');
        };

        return self;
    }
);