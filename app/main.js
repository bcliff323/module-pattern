(function(window){
    
    window.app = {

        modules : {},

        module : function() {
            var args = Array.prototype.slice.call(arguments);
            var name = args[0];
            var deps = args[1];
            var mod = args.pop().call();

            app.modules[name] = mod;
            mod.name = name;
            mod.deps = deps;

            app.resolve(deps, name, mod);
        },

        resolve : function(deps, n, mod) {
            if(mod.deps.length) {
                var safe = false;

                for (var i = 0, len = mod.deps.length; i < len; i++) {
                    if(app.modules[mod.deps[i]] !== undefined) {
                        app.modules[n].init();
                    } else {
                        domReady(function () {
                            if(app.modules[mod.deps[i-1]] !== undefined) {
                                app.modules[n].init();
                            } else {
                                if (window.console) {
                                    console.log('[Error] Module: ' + app.modules[n].name + 
                                    ' contains a reference to non-existent module - ' +
                                        mod.deps[i-1] );
                                }
                            }
                        }); 
                    }
                }
            } else {
                mod.init();
            }
        }

    };

})(window);

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


app.module('that',    
    [
        'foo',
        'baz'
    ],

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
