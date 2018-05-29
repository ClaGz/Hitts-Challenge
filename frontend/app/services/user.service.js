angular.module('Hitts').factory('UserService', UserService);

function UserService($http) {
	//TODO -  set to config file
	var apiBaseUrl = 'http://localhost:3000'
	return {
	    create: (data) => {
	    	return $http({
    			method: 'POST',
				url: apiBaseUrl + `/user`,
    			data: data,
    			params: {},
  			});
	    },
	    list: (id, queryParams) => {
	    	return $http({
    			method: 'GET',
				url: apiBaseUrl + (id ? `/user/${id}` : '/user'),
    			data: null,
    			params: (queryParams||{}),
  			});
	    },
	    update: (id, data) => {
	    	return $http({
    			method: 'PUT',
				url: apiBaseUrl + `/user/${id}`,
    			data: data,
    			params: ({}),
  			});
	    },
	    delete: (id) => {
	    	return $http({
    			method: 'DELETE',
				url: apiBaseUrl + `/user/${id}`,
    			data: null,
    			params: ({}),
  			});
	    }
	}
}