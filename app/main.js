(function(window){
	
	window.app = {
		modules : [],
		require : function() {
			var args = Array.prototype.slice.call(arguments);
			var mod = args.pop().call();

			app.modules.push(mod);
		}
	};

})(window);

	
app.require(	
	[
		'foo',
		'bar',
		'dep'
	],

	function(msg) {
		var self = {};

		self.name = 'baz';

		self.getName = function() {
			return self.name;
		};

		return self;
	}
);

console.log(app.modules);
