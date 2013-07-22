/**
 * Module: `moduleOne`. Represents a simple js module, no dependencies
 * a name, and an init function. Dependencies are optional, but an empty
 * array must be passed.
 */
app.module('moduleThree',    
    // No dependencies.
    [],

    // The module definition.
    function() {
        var self = {};

        // Initialization occurs immediately after module is defined, because
        // there are no dependencies.
        self.init = function() {
            console.log('================================================\n');

            console.log('[Info] ' +
                'Initializing module: ' +
                'moduleThree');

            console.log('[Info] ' +
                'No Dependencies');

            console.log('\n================================================');
        };

        return self;
    }
);