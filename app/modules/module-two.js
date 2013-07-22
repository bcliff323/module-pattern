/**
 * Module: `moduleTwo`. Represents a simple js module, with dependencies,
 * a name, and an init function.
 */
app.module('moduleTwo',
    // Declare dependencies. 
    // Needs to resolve to a property name of app.modules.   
    [
        'moduleOne',
        'moduleThree'
    ],

    // The module definition.
    function() {
        var self = {};

        var modOne = {};
        var modThree = {};

        // Initialization occurs after all listed dependencies are loaded.
        self.init = function() {
            // Retreive references to dependencies.
            modOne = app.require('moduleOne');
            modThree = app.require('moduleThree');
            
            console.log('================================================\n');

            console.log('[Info] ' +
                'Initializing module: ' +
                'moduleTwo');

            console.log('[Info] ' +
                'Accessing module: ' +
                modOne.name + ' from ' +
                'moduleTwo');

            console.log('[Info] ' +
                'Accessing module: ' +
                modThree.name + ' from ' +
                'moduleTwo');

            console.log('\n================================================');
        };

        return self;
    }
);