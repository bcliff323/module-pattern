app.module('baz',   
    [
        'foo',
        'that'
    ],

    function() {
        var self = {};
        var require = app.require;
        var foo = {};

        self.init = function() {
            foo = require('foo');
            console.log('foo name: ' + foo.name);
        };

        return self;
    }
);