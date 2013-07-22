/**
 * Module: `moduleOne`. Represents a simple js module, with dependencies,
 * a name, and an init function.
 */
app.module('moduleOne',   
    // Declare dependencies. 
    // Needs to resolve to a property name of app.modules.
    [
        'moduleTwo',
        'moduleThree'
    ],

    // The module definition.
    function() {
        var self = {};

        var modTwo = {};
        var modThree = {};

        // Initialization occurs after all listed dependencies are loaded.
        self.init = function() {
            // Retreive references to dependencies.
            modTwo = app.require('moduleTwo');
            modThree = app.require('moduleThree');
            
            console.log('================================================\n');

            console.log('[Info] ' +
                'Initializing module: ' +
                'moduleOne');

            console.log('[Info] ' +
                'Accessing module: ' +
                modTwo.name + ' from ' +
                'moduleOne');

            console.log('[Info] ' +
                'Accessing module: ' +
                modThree.name + ' from ' +
                'moduleOne');

            console.log('\n================================================');
        };

        return self;
    }
);