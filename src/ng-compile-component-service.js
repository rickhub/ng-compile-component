angular.module('rckd.utils').factory('CompileComponentService', [
	'$rootScope',
	'$compile',
	function($rootScope, $compile){

		const toLowerDash = function(string){
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}
    
		const stdExpr = attr => toLowerDash(attr) + '=\'$ctrl["' + attr + '"]\'';
		const strExpr = attr => toLowerDash(attr) + '=\'{{ $ctrl["' + attr + '"] }}\'';
		const fnExpr = attr => toLowerDash(attr) + '=\'$ctrl["' + attr + '"]()\'';

		const factories = {
			'=': stdExpr,
			'<': stdExpr,
			'>': stdExpr,
			'@': strExpr,
			'&': fnExpr,
		};

		return{

			/**
			 * @param  {String} attribute
			 * @param  {Object} value
			 * @param  {Object} config
			 * @return {Function}
			 */
			resolveBindingFactory(attribute, value, config = {}){
				let attrConfig = config[attribute];
				if(attrConfig){
					if(typeof attrConfig === 'function'){
						return attrConfig;
					}
					return factories[attrConfig];
				}
				return factories[typeof value !== 'function' ? '=' : '&'];
			},

			/**
			 * @param  {String} component
			 * @param  {Object} bindings
			 * @param  {Object} config
			 * @return {String}
			 */
			buildHtml(component, bindings, config = {}){
				const attrs = [];
				for(const attribute in bindings){
					const value = bindings[attribute];
					const factory = this.resolveBindingFactory(attribute, value, config);
					attrs.push(factory(attribute, value));
				}
				return '<' + component + ' ' + attrs.join(' ') + '></' + component + '>';
			},

			/**
			 * @param  {Stromg} component
			 * @param  {Object} bindings
			 * @param  {Object} config
			 * @return {Element}
			 */
			compile(component, bindings, config = {}){
				const html = this.buildHtml(toLowerDash(component), bindings, config);
				const scope = angular.extend($rootScope.$new(), {
					$ctrl: bindings
				});
				return $compile(html)(scope);
			},

		};
	}
]);