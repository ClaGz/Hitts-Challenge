angular.module('Hitts').factory('MobileService', MobileService);

function MobileService($http) {
	//TODO -  set to config file
	var apiBaseUrl = 'http://localhost:3000'
	return {
	    create: (data) => {
	    	return $http({
    			method: 'POST',
				url: apiBaseUrl + `/mobile`,
    			data: data,
    			params: {},
  			});
	    },
	    list: (id, queryParams) => {
	    	return $http({
    			method: 'GET',
				url: apiBaseUrl + (id ? `/mobile/${id}` : '/mobile'),
    			data: null,
    			params: (queryParams||{}),
  			});
	    },
	    update: (id, data) => {
	    	return $http({
    			method: 'PUT',
				url: apiBaseUrl + `/mobile/${id}`,
    			data: data,
    			params: ({}),
  			});
	    },
	    delete: (id) => {
	    	return $http({
    			method: 'DELETE',
				url: apiBaseUrl + `/mobile/${id}`,
    			data: null,
    			params: ({}),
  			});
	    }
	}
}