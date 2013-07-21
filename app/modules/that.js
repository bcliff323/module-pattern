app.module('that',    
    [
        'foo',
        'baz'
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