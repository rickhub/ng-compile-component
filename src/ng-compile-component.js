angular.module('rckd.utils').component('ngCompileComponent', {
	bindings:{
		component: '=',
		bindings: '='
	},
	controller:[
		'$element',
		'CompileComponentService',
		function($element, CompileComponentService){
			this.$onInit = function(){
				$element.append(CompileComponentService.compile(
					this.component,
					this.bindings
				));
			};
		}
	]
});