angular.module('rckd.utils').component('ngCompileComponent', {
	bindings:{
		component: '<',
		bindings: '<'
	},
	controller:[
		'$scope',
		'$element',
		'CompileComponentService',
		function($scope, $element, CompileComponentService){
			this.$onChanges = function(changes){
				if(changes.component || (changes.bindings && changes.bindings.currentValue !== changes.bindings.previousValue)){
					$element.html('');
					$element.append(CompileComponentService.compile(
						this.component,
						this.bindings
					));
				}
			};
		}
	]
});