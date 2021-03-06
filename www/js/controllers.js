angular.module('app.controllers', ['app.services'])

.controller('introCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])

.controller('loginCtrl', ['$scope', '$http', '$location', 'Auth', '$stateParams',
  function($scope, $http, $location, Auth, $stateParams) {
    $scope.user = {
      email: '',
      password: ''
    };
    $scope.userLogin = function() {
      $http.post('https://whatiwore.herokuapp.com/api/auth', $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token);
        console.log('Token:', res.data.token);
        $location.path('/welcome');   // or use $state.go('intro');
      }, function error(res) {
          console.log(res);
      });
    }
}])

.controller('signupCtrl', ['$scope', '$http', '$location', '$stateParams',
  function ($scope, $http, $location, $stateParams) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    // sending the user signup data (email and password) to backend controller
    $http.post('https://whatiwore.herokuapp.com/api/users', $scope.user).then(function success(res) {
      // redirecting the front end to the root path
      $location.path('/');
    }, function error(res) {
        console.log(res);
    });
  }
}])

.controller('welcomeCtrl', ['$scope', 'Auth', '$location',
function ($scope, Auth, $location) {
  console.log('Token is:', Auth.getToken());
  $scope.Auth = Auth;

// see if user is logged in and if not redirect using $location.path
  if (!Auth.currentUser()) {
    $location.path('/login');
  }

  $scope.logout = function() {
    Auth.removeToken();
    console.log('Token removed:', Auth.getToken());
  }

  // user clicks on 'what i'm wearing' button and this calls a function that determines if user is signed in
  // $scope.checkIfLoggedIn = function() {
  //   if (!Auth.currentUser())
  //     $location.path('/login');
  // }

}])

.controller('addOutfitCtrl', ['$scope', '$stateParams', '$state', '$location', 'Auth', 'Outfit',
function ($scope, $stateParams, $state, $location, Auth, Outfit) {
  console.log('addOutfitCtrl reached');
  console.log(Outfit);
  $scope.Auth = Auth;

// see if user is logged in and if not redirect using $location.path
  if (!Auth.currentUser()) {
    $location.path('/login');
  }

//create new outfit instance. Properties will be set via ng-model on UI
  $scope.outfit = new Outfit();

// create a new outfit. Issues a post to /api/outfits
  $scope.saveOutfit = function() {
    $scope.outfit.$save(function() {
      $state.go('outfits');
    });
  };

// Old code....
  // $scope.outfit = {
  //   image: '',
  //   description: '',
  //   date: ''
  // };

  // $scope.saveOutfit = function() {
  //   console.log('saveOutfit called', $scope.outfit);
  //   Outfit.save($scope.outfit, function success(res) {
  //     $location.path('/welcome');
  //   }, function error(res) {
  //       console.log(res);
  //   });
  // };

}])

.controller('editOutfitCtrl', ['$scope', '$location', '$stateParams', '$state', 'Auth', 'Outfit',
function ($scope, $location, $stateParams, $state, Auth, Outfit) {
  $scope.Auth = Auth;

// see if user is logged in and if not redirect using $location.path
  if (!Auth.currentUser()) {
    $location.path('/login');
  }

// Updating the outfit. Issues a PUT to /api.outfits/:id
  $scope.editOutfit = function() {
    $scope.outfit.$update(function() {
      $state.go('outfits');
    });
  };

// issues a GET request to api/outfits/:id to fetch the outfit we want to update
  $scope.displayOutfit = function() {
    $scope.outfit = Outfit.get({ id: $stateParams.id});
  };

  // Now we call the function so that the outfit will appear on the UI
  $scope.displayOutfit();

}])

.controller('outfitCtrl', ['$scope', '$state', '$location', '$window', 'Auth', 'Outfit',
function ($scope, $state, $location, $window, Auth, Outfit) {
  $scope.Auth = Auth;

// see if user is logged in and if not redirect using $location.path
  if (!Auth.currentUser()) {
    $location.path('/login');
  }

// fetches all outfits. Issues a GET to /api/outfits
  $scope.outfits = Outfit.query();

  $scope.deleteOutfit = function(outfit) {
    // Add modal here w/ if statement, ask "do you want to delete this outfit?"
      outfit.$delete();
  };

  $scope.urlForImage = function(imageName){
    var name = imageName.substr(imageName.lastIndexOf('/') + 1);
    var trueOrigin = cordova.file.dataDirectory + name;
    console.log('In calendar controller, url changer: ', trueOrigin);
    return trueOrigin;
  }


// old code...
//   $scope.outfits = [];

//   Outfit.query(function success(res) {
//     console.log(res)
//     $scope.outfits = res;
//   }, function error(res) {
//     console.log(res);
//   });

//   $scope.urlForImage = function(imageName){
//     var name = imageName.substr(imageName.lastIndexOf('/') + 1);
//     var trueOrigin = cordova.file.dataDirectory + name;
//     console.log('In calendar controller, url changer: ', trueOrigin);
//     return trueOrigin;
//   }

// // delete route is not deleting the correct outfit
//   $scope.deleteOutfit = function(id, outfitIdx) {
//     Outfit.delete({id: id}, function success(res) {
//       $scope.outfits.splice(outfitIdx, 1);
//     }, function error(res) {
//       console.log(res);
//     });
//   };

//   $scope.viewOutfit = function() {
//     // Outfit.get({id: id})
//     $state.go('viewEntry')
//     console.log()
//   };

}])

.controller('viewOutfitCtrl', ['$scope', '$location', '$stateParams', 'Auth', 'Outfit',
function ($scope, $location, $stateParams, Auth, Outfit) {
  $scope.Auth = Auth;

// see if user is logged in and if not redirect using $location.path
  if (!Auth.currentUser()) {
    $location.path('/login');
  }

 // fetches a single outfit. Issues a GET to /api/outfits/:id
  $scope.outfit = Outfit.get({id: $stateParams.id});

// old code...
  // $scope.outfit = {};

  //   Outfit.get({ id: $stateParams.id }, function success(res) {
  //     console.log('viewEntryCtrl scope outfit', res);
  //     console.log(Outfit.description)
  //     $scope.outfit = res;
  //   }, function error(res) {
  //       console.log(res);
  //   });

}])

.controller("CameraCtrl", function($scope, $cordovaCamera) {

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = imageData;
            console.log('The image data:', imageData);
            window.resolveLocalFileSystemURL(imageData, copyFile, fail);

            function copyFile(fileEntry){
              var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
              var newName = makeId() + name;

              console.log('name: ', name);

              window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2){
                fileEntry.copyTo(fileSystem2, newName, onCopySuccess, fail);
              }, fail);
            }

            function onCopySuccess(entry){
              console.log('entry: ', entry.nativeURL);
              console.log('scope parent: ', $scope.$parent);
              $scope.$apply(function(){
                $scope.$parent.outfit.image = entry.nativeURL;
              });
            }

            function fail(error){
              console.log('error: ', error);
            }

            function makeId(){
              var text = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for(var i = 0; i<5; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
              }
              return text;
            }



        }, function(err) {
            // An error occured. Show a message to the user
            console.log(err);
        });
    }
});
