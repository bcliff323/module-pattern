Synchronous Module Definition
=============================

An approach to managing modular JavaScript dependencies synchronously.  Addresses problems caused by circular dependencies in situations where AMD is not an option.


Usage
-----

All modules are defined and attached to a single global object, named *app*.  All modules are stored the object *app.modules*. App provides a *module* method, to which you pass a module name, an array of dependencies, and a function that acts as your module.

```js
app.module(MODULE_NAME,   
    // Declare dependencies. 
    [ DEPENDENCIES ],

    // The module definition.
    function() {
        var self = {};

        // Init function is run once all dependencies are loaded.
        // Each module must have an init function.
        self.init = function() {   
        };

        return self;
    }
);
```


###    Grunt Tasks

I've included a basic grunt configuration to help with development.  Install via npm:

```shell
npm install
```

This gives you access to the following tasks:

+   Start a grunt server on port 9000: `grunt server`
+   Start a grunt watch, which will lint, concatenate, and minify project js files: `grunt watch`

