'use strict';

angular.module('Hitts').controller('MobileController', function ($scope, $uibModal, MobileService, $ngBootbox, toastr){

	const list = () =>{
		MobileService.list().then((resp)=>{
			$scope.mobiles = [].concat(resp.data);
		}).catch(err=>{
			console.error('err', err);
			toastr.error('Erro ao listar os celulares', 'Erro');
		}).finally(()=>{
			$scope.selectMobile(null);
			$scope.displayCreateForm = false;
		});
	};
	
	$scope.selectMobile = (mobile) => {
		if(!mobile)
			$scope.mobileSelected = null;
		else
			$scope.mobileSelected = mobile;
	};

	$scope.showCreateForm = (display, mobile) => {
		$scope.selectMobile(mobile);
		$scope.displayCreateForm = display
	};

	$scope.create = (mobile) => {
		$scope.formErrors = null;
		if(mobile._id)
			$scope.editMode = true;
		
		let promise = $scope.editMode ? MobileService.update(mobile._id, mobile) : MobileService.create(mobile);
		promise.then((resp)=>{
			list();
			toastr.success(`Celular ${$scope.editMode ? 'editado' : 'criado'} com sucesso.`, 'Sucesso');
		}).catch(err=>{
			console.log('eee', err.data);
			if(Array.isArray(err.data))
				$scope.formErrors = [].concat(err.data.map(it => ({field: it.param, msg: it.msg})));
			else
				$scope.formErrors = err.data;
			console.error('err', err);
			toastr.error(`Erro ao tentar ${$scope.editMode ? 'editar' : 'criar'} celular`, 'Erro');
		});
	};
	$scope.delete = (mobile) => {
		$ngBootbox.confirm('Deseja realmente remover esse celular?')
			.then(function() {
        		MobileService.delete(mobile._id).then((resp) => {
					list();
					toastr.success('Celular removido com sucesso', 'Sucesso');
				}).catch(err=>{
					console.error('err', err);
					toastr.error('Erro ao tentar remover celular', 'Erro');
				});
    		}, function() {});
	};

	list();
})