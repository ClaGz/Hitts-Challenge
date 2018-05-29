var hittsApp = angular.module('Hitts', ['ui.router','ui.bootstrap', 'ngBootbox', 'toastr']);
hittsApp.config(($httpProvider, $stateProvider, $urlRouterProvider)=>{
	$urlRouterProvider.when('/', '/home').otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'static/views/home.html',
	        controller: 'HomeController',
		})
		.state('register', {
			url: '/register',
			templateUrl: 'static/views/register.html',
	        controller: 'RegisterController',
		})
		.state('login', {
			url: '/login',
			templateUrl: 'static/views/login.html',
	        controller: 'LoginController',
		})
		.state('mobile', {
	        url: '/mobile',
	        templateUrl: 'static/views/mobile.html',
	        controller: 'MobileController',
		})
		.state('about', {
	        url: '/about',
	        templateUrl: 'static/views/about.html',
	        controller: 'AboutController',
		})
		.state('help', {
	        url: '/help',
	        templateUrl: 'static/views/help.html',
	        controller: 'HelpController',
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