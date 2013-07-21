app.module('baz',   
    [
        'foo',
        'that'
    ],

    function() {
        var mods = app.modules;
        var self = {};
        var foo = {};

        self.init = function() {
            console.log('init baz');
        };

        return self;
    }
);