angular.module('Hitts').controller('RegisterController', function ($scope, UserService, toastr, $state) {
	$scope.create = (user) => {
		//TODO - validar no client-side
		UserService.create(user).then(resp =>{
			toastr.success('Usuário criado com sucesso', 'Sucesso');
			$state.go('login');
		}).catch(err => {
			console.error('err', err);
			toastr.error('Erro ao tentar criar usuário', 'Erro');
			if(Array.isArray(err.data))
				$scope.formErrors = err.data.map(it => ({field: it.param, msg: it.msg}));
			else
				$scope.formErrors = [].concat(err.data);
			$scope.$on('$stateChangeStart', 
      			function(event, toState, toParams, fromState, fromParams){ 
          			event.preventDefault(); 
      				// transitionTo() promise will be rejected with 
          			// a 'transition prevented' error
			})
		})
	}
})
