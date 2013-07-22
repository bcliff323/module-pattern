(function(window){
    /**
     * The `root` application object. Holds all defined modules 
     * and provides methods for adding modules and retrieving
     * references to them.
     */
    window.app = {

        /** Contains all application modules */
        modules : {},

        /**
         * Defines application modules and adds them to the 
         * app.modules object. The module name, dependencies,
         * and function body are retrieved from the args object.
         */
        module : function() {
            var args = Array.prototype.slice.call(arguments);
            var name = args[0];
            var deps = args[1];
            var mod = args.pop().call();

            app.modules[name] = mod;
            mod.name = name;
            mod.deps = deps;
            mod.initialized = false;

            app.resolve(mod);
        },

        /**
         * Returns a reference to a given module.
         *
         * @param {String} name - The name of the requested module.
         */
        require : function(name) {
            return app.modules[name];
        },

        /**
         * Executes dependency resolution. Immediately Initializes modules 
         * that do not have dependencies and modules who's dependencies
         * have already been loaded. Delays initialization of modules with
         * missing dependencies until document.ready.
         *
         * @param {Object} mod - The module to resolve.
         */
        resolve : function(mod) {
            if(mod.deps.length) {
                // keep track of loaded dependencies.
                var depsLoaded = 0;

                for (var i = 0, len = mod.deps.length; i < len; i++) {
                    // check application modules for existence of dependency
                    if(app.modules[mod.deps[i]] !== undefined) {
                        depsLoaded++;

                        // Initialize module if all dependencies exist.
                        if(depsLoaded === len) {
                            app.modules[mod.name].init();
                        }
                    } else {
                        // Init remaining modules after all are loaded.
                        domReady(function () {
                            if(!app.modules[mod.name].initialized) {
                                app.init(app.modules[mod.name]);
                            }
                        }); 
                    }
                }
            } else {
                // immediately load modules without dependencies.
                mod.init();
                mod.initialized = true;
            }
        },

        /**
         * Initializes unresolved modules when all modules are present, 
         * on document.ready. Runs a passed module's init function only 
         * if the module has not been initialized. Logs an error message
         * if a dependency is invalid (missing from app.modules).
         *
         * @param {Object} mod - The module to initialize.
         */
        init : function(mod) {
            // keep track of loaded dependencies.
            var depsLoaded = 0;

            for (var i = 0, len = mod.deps.length; i < len; i++) {
                // All the dependencies should be loaded at this point,
                // if a dependency is not present, log an error message.
                if (app.modules[mod.deps[i]] === undefined) {
                    console.log('[Error] Module : ' +
                        mod.name +
                        ' contains an undefined dependency, ' +
                        mod.deps[i]);
                } else {
                    depsLoaded++;

                    // Initialize module if all dependencies are loaded.
                    if(depsLoaded === len) {
                        mod.init();
                        mod.initialized = true;
                    }
                }
            }
        }

    };

})(window);

