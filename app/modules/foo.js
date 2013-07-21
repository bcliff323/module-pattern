app.module('foo',    
    [
        'baz',
        'that'
    ],

    function() {
        var self = {};
        var require = app.require;
        var baz = {};

        self.init = function() {
            baz = require('baz');
            console.log('baz name: ' + baz.name);
        };

        return self;
    }
);