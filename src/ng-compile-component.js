angular.module('rckd.utils').component('ngCompileComponent', {
	bindings:{
		component: '=',
		bindings: '='
	},
	controller:[
		'$element',
		'ngCompileComponentService',
		function($element, ngCompileComponentService){
			this.$onInit = function(){
				$element.append(ngCompileComponentService.compile(
					this.component,
					this.bindings
				));
			};
		}
	]
});