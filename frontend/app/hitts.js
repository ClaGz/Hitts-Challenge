var hittsApp = angular.module('Hitts', ['ui.router','ui.bootstrap', 'ngBootbox', 'toastr']);
hittsApp.config(($httpProvider, $stateProvider, $urlRouterProvider)=>{
	$urlRouterProvider.when('/').otherwise('/mobile');

	$stateProvider
		.state('mobile', {
	        url: '/mobile',
	        templateUrl: 'static/views/mobile.html',
	        controller: 'MobileController',
		});

	$httpProvider.interceptors.push(function($q, $location) {
      	return {
	        response: function(response) {
	          // do something on success
	          return response;
	        },
	        responseError: function(response) {
	          if (response.status === 401){
	            $location.url('/login');
	          }
	          if (response.status === 404){
	            $location.url('/404');
	          }
	          if (response.status === 500){
	            $location.url('/500');
	          }

	          return $q.reject(response);
	        }
  		};
    });
}).run(($rootScope, $templateCache) => {
	$templateCache.put('modal.tpl',
      '<div class="modal-dialog {{size ? \'modal-\' + size : \'\'}}">' +
        '<div class="modal-content" uib-modal-transclude>' +
        '</div>' +
      '</div>');
    $templateCache.put('modal-full-size.tpl',
      '<div class="modal-full-size modal-dialog {{size ? \'modal-\' + size : \'\'}}">' +
      '<div class="modal-content" uib-modal-transclude>' +
      '</div>' +
      '</div>'
    );
});