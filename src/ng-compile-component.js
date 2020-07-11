angular.module('rckd.utils').component('ngCompileComponent', {
	bindings:{
		component: '<',
		bindings: '<',
		config: '<'
	},
	controller:[
		'$scope',
		'$element',
		'CompileComponentService',
		function($scope, $element, CompileComponentService){
			this.$onChanges = function(changes){
				if(
					changes.component ||
					(changes.bindings && changes.bindings.currentValue !== changes.bindings.previousValue) ||
					(changes.config && changes.config.currentValue !== changes.config.previousValue)
				){
					$element.html('');
					$element.append(CompileComponentService.compile(
						this.component,
						this.bindings,
						this.config
					));
				}
			};
		}
	]
});
