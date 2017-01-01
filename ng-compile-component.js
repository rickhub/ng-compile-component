angular.module('rckd.utils').directive('ngCompileComponent', [
	'$rootScope',
	'$compile',
	function($rootScope, $compile){

		/**
		 * Transforms "myComponentName" to "my-component-name".
		 *
		 * @param {String} string
		 * @return {String}
		 */
		function toLowerDash(string){
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		/**
		 * Builds the component's html:
		 *
		 * <my-component
		 *	two-way='$ctrl["twoWay"]'
		 *	one-way='$ctrl["oneWay"]'
		 *	string='{{ $ctrl["string"] }}'
		 * ></my-component>
		 *
		 * @param {String} component
		 * @return {Object} bindings
		 * @return {String}
		 */
		function buildHtml(component, bindings){
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
		}

		return{
			restrict: 'E',
			scope:{
				component: '=',
				bindings: '='
			},
			link: function(scope, element){
				var elementScope = angular.extend($rootScope.$new(), {
					$ctrl: scope.bindings
				});
				var html = buildHtml(scope.component, scope.bindings);
				element.append($compile(html)(elementScope));
			}
		};

	}
]);