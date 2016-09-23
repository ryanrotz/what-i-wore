angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'introCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'welcomeCtrl'
  })

  .state('outfits', {
    url: '/outfits',
    templateUrl: 'templates/outfits.html',
    controller: 'outfitCtrl'
  })

  .state('addOutfit', {
    url: '/outfits/new',
    templateUrl: 'templates/add-outfit.html',
    controller: 'addOutfitCtrl'
  })

  .state('viewOutfit', {
    url: '/outfits/:id/view',
    templateUrl: 'templates/view-outfit.html',
    controller: 'viewOutfitCtrl'
  })

  .state('editOutfit', {
    url: '/outfits/:id/edit',
    templateUrl: 'templates/edit-outfit.html',
    controller: 'editOutfitCtrl'
  })

  // .state('viewEntry', {
  //   url: '/viewentry',
  //   templateUrl: 'templates/Entries/index.html',
  //   abstract: true
  // })

  // .state('viewEntry.index', {
  //   url:'/:id',
  //   views: {
  //     'viewEntry-index': {
  //       templateUrl: 'templates/viewEntry.html',
  //       controller: 'viewEntryCtrl'
  //     }
  //   }
  // })
  // .state('viewEntry.index.edit', {
  //   url: '/edit',
  //   views: {
  //     'ViewEntry-index-edit': {
  //       templateUrl: 'templates/editEntry.html',
  //       controller: 'viewEntryCtrl'
  //     }
  //   }
  // })

$urlRouterProvider.otherwise('/')
})

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);


