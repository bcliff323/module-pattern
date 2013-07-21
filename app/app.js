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
            mod.initialized = false;

            app.resolve(deps, name, mod);
        },

        require : function(name) {
            return app.modules[name];
        },

        resolve : function(deps, n, mod) {
            if(mod.deps.length) {
                var depsLoaded = 0;
                for (var i = 0, len = mod.deps.length; i < len; i++) {
                    if(app.modules[mod.deps[i]] !== undefined) {
                        depsLoaded++;

                        if(depsLoaded === len) {
                            app.modules[n].init();
                        }
                    } else {
                        domReady(function () {
                            if(!app.modules[n].initialized) {
                                app.init(app.modules[n]);
                            }
                        }); 
                    }
                }
            } else {
                mod.init();
                mod.initialized = true;
            }
        },

        init : function(mod) {
            var depsLoaded = 0;
            for (var i = 0, len = mod.deps.length; i < len; i++) {
                if (app.modules[mod.deps[i]] === undefined) {
                    if(window.console !== undefined) {
                        console.log('[Error] Module : ' +
                            mod.name +
                            ' contains an undefined dependency, ' +
                            mod.deps[i]);
                    }
                } else {
                    depsLoaded++;

                    if(depsLoaded === len) {
                        mod.init();
                        mod.initialized = true;
                    }
                }
            }
        }

    };

})(window);
