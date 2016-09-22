angular.module('app.services', ['ngResource'])

.factory('Outfit', ['$resource', function($resource) {
  return $resource('https://whatiwore.herokuapp.com/api/outfits/:id', {}, {
    // query: { isArray: false }
    // all: { method: 'GET', cache: false, isArray: false },
    get: { method: 'GET', isArray: true }
    // save: { method: 'POST', cache: false, isArray: false },
    // update: { method: 'PUT', cache: false, isArray: false },
    // delete: { method: 'DELETE', cache: false, isArray: false }
  });
}])

.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['user-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['user-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('user-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false;
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken();
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload;
        } catch(err) {
          return false;
        }
      }
    }
  }
}])

.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])

// .service('BlankService', [function(){

// }]);
