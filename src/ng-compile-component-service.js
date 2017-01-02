angular.module('rckd.utils').factory('ngCompileComponentService', [
	'$rootScope',
	'$compile',
	function($rootScope, $compile){

		/**
		 * Transforms 'myFancyComponent' to 'my-fancy-component'.
		 * 
		 * @param  {String} string
		 * @return {String}
		 */
		function toLowerDash(string){
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		return{

			/**
			 * Builds the component's html like:
			 *
			 * <my-fancy-component
			 * 	one-way='$ctrl["one-way"]'
			 * 	two-way='$ctrl["two-way"]'
			 * 	string='{{ $ctrl["string"] }}'
			 * ></my-fancy-component>
			 * 
			 * @param  {String} component
			 * @param  {Object} bindings
			 * @return {String}
			 */
			render: function(component, bindings){
				var tag = toLowerDash(component);
				var attrs = '';
				var prop = null;
				for(prop in bindings){
					attrs += ' ' + toLowerDash(prop) + '=\'' + (
						typeof bindings[prop] === 'string'
						? '{{ $ctrl["' + prop + '"] }}'
						: '$ctrl["' + prop + '"]'
					) + '\'';
				}
				return '<' + tag + attrs + '></' + tag + '>';
			},

			/**
			 * Compiles the component.
			 * 
			 * @param  {String} component
			 * @param  {Object} bindings
			 * @return {Object}
			 */
			compile: function(component, bindings){
				var html = this.render(component, bindings);
				var scope = angular.extend($rootScope.$new(), {
					$ctrl: bindings
				});
				return $compile(html)(scope);
			}

		};

	}
]);