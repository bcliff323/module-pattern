/** domReady v3.0.0 - MIT license - https://github.com/freelancephp/DOMReady */
(function(e){"use strict";var t=e.document;var n=[];var r=[];var i=false;var s=null;var o=function(e){try{e.apply(this,r)}catch(t){if(s!==null){s.call(this,t)}}};var u=function(){var e;i=true;for(e=0;e<n.length;e=e+1){o(n[e])}n=[]};var a=function(){if(e.addEventListener){t.addEventListener("DOMContentLoaded",function(){u()},false)}else{var n=function(){if(!t.uniqueID&&t.expando){return}var r=t.createElement("document:ready");try{r.doScroll("left");u()}catch(i){e.setTimeout(n,10)}};t.onreadystatechange=function(){if(t.readyState==="complete"){t.onreadystatechange=null;u()}};n()}};var f=function(e){return f.on(e)};f.on=function(e){if(i){o(e)}else{n[n.length]=e}return this};f.params=function(e){r=e;return this};f.error=function(e){s=e;return this};a();e.domReady=f})(window);
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
                var depsLoaded = 0;
                for (var i = 0, len = mod.deps.length; i < len; i++) {
                    if(app.modules[mod.deps[i]] !== undefined) {
                        depsLoaded++;

                        if(depsLoaded === len) {
                            app.modules[n].init();
                        }
                    } else {
                        domReady(function () {
                            app.init(app.modules[n]);
                        }); 
                    }
                }
            } else {
                mod.init();
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
                    }
                }
            }
        }

    };

})(window);

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