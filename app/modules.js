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