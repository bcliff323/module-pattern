app.module('foo',    
    [
        'baz'
    ],

    function() {
        var root = app;
        var self = {};
        var baz = {};

        self.init = function() {
            console.log('init foo');
        };

        return self;
    }
);