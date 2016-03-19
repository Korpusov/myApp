angular.module('starter.controllers', ['firebase', 'ionic'])

.controller('DashCtrl', function($scope) {
        $scope.next = function() {
            console.log($scope.number.room)
            console.log($scope.number.WC)
            console.log($scope.scale)
            localStorage.setItem("scale", $scope.scale);
            localStorage.setItem("numberRoom", $scope.number.room);
            localStorage.setItem("numberWC", $scope.number.WC);
            document.location.href = '#/typeclean';
        }
    })
    .controller('FinishCtrl', function($scope, $ionicPopup) {
        console.log($scope.phone == null)
        console.log($scope.phone)
        $scope.finish = function() {
            console.log($scope.phone == "")
            if ($scope.phone == null && $scope.city == null && $scope.street == null && $scope.numberHome == null && $scope.numberApartment == null) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ошибка',
                    template: "Проверьте правильность введенных данных"
                });
            } else {
                localStorage.setItem("phone", $scope.phone);
                localStorage.setItem("city", $scope.city);
                localStorage.setItem("street", $scope.street);
                localStorage.setItem("numberHome", $scope.numberHome);
                localStorage.setItem("numberApartment", $scope.numberApartment);
                console.log(localStorage.getItem("scale"))
                var ref = new Firebase("https://cleanapps.firebaseio.com/orders");
                var newPostRef = ref.push();
                newPostRef.set({
                    Company: "Хабаровск",
                    Date: "date",
                    Mail: "",
                    NumberHome: $scope.numberHome,
                    NumberRoom: localStorage.getItem("numberRoom"),
                    NumberScale: localStorage.getItem("scale"),
                    NumberTypeClean: localStorage.getItem("typeClean"),
                    NumberWC: localStorage.getItem("numberWC"),
                    Phone: $scope.phone,
                    Price: "",
                    City: $scope.city,
                    Street: $scope.street,
                    id: newPostRef.key(),
                    numberApartment: $scope.numberApartment,
                    status: false
                });
                document.location.href = '#/tab/dash';
            }
        }
    })
    .controller('TypeCleanCtrl', function($scope, $ionicPopup) {
        $scope.numberTypeClean = 3;
        $scope.infoCleanHour = function() {
            console.log('vre')
            var alertPopup = $ionicPopup.alert({
                title: 'Уборка за час',
                template: 'Соберем и вынесем мусор \nОчистим мебель и детали интерьера от пыли (на высоте до 2-х метров)\nТщательно пропылесосим ковры и полы \nПомоем напольные покрытия с применением гипоаллергенных средств\nПочистим сантехнику в ванной и туалетной комнате, а также раковину и плиту на кухне'
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        }
        $scope.infoGeneral = function() {
            console.log('vre')
            var alertPopup = $ionicPopup.alert({
                title: 'Генеральная уборка',
                template: 'Помоем гардины, люстры, потолки\nПроведем обеспыливание стен, удалим стойкие загрязнения\nУдалим пятна и пыль со всех поверхностей, даже в труднодоступных местах\nОтполируем зеркальные и стеклянные поверхности\nОчистим и продезинфицируем сантехнику на кухне, в ванной и туалетной комнатах\nОчистим кухонную мебель и бытовую технику от всех загрязнений (с наружной стороны) \nТщательно пропылесосим ковровые покрытия и мягкую мебель \nПроведем очистку и влажную уборку напольных покрытий, плинтусов \nВынесем мусор'
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        }
        $scope.infoRepair = function() {
            console.log('vre')
            var alertPopup = $ionicPopup.alert({
                title: 'Уборка после ремонта',
                template: "Очистим дом от строительной пыли\n" +
                    "Удалим пятна и загрязнения с влагостойких стен, мебели, напольных покрытий и предметов интерьера, осветительных приборов, плинтусов.\n" +
                    "Удалим грязь с радиаторов отопления, оконных рам, подоконников и дверей\n" +
                    "Отполируем деревянные, зеркальные и стеклянные поверхности интерьера\n" +
                    "Отмоем выключатели, электрические розетки, пожарные датчики, вентиляционные решетки, экраны радиаторов и кондиционеры, огнетушители и сантехнические трубы\n" +
                    "Почистим, удалим пятна и продезинфицируем сантехнику на кухне, в ванной и туалетной комнатах\n" +
                    "Вынесем мусор"
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        }
        $scope.next = function() {

            if ($scope.numberTypeClean == 3) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ошибка',
                    template: "Выберите тип уборки"
                });
            } else {
                localStorage.setItem("TypeClean", $scope.TypeClean);
                localStorage.setItem("numberTypeClean", $scope.numberTypeClean);
                document.location.href = '#/finish';

            }


        }
    })

.controller('ChatsCtrl', ['$scope', '$firebase', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$rootScope', '$ionicPopup', '$timeout',
        function($scope, $firebase, $firebaseArray, $firebaseAuth, $firebaseObject, $rootScope, $ionicPopup, $timeout) {
            var ref = new Firebase("https://cleanapps.firebaseio.com");
            var messagesRef = new Firebase("https://cleanapps.firebaseio.com/message");
            $scope.error = null;
            var authData = ref.getAuth();
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
            } else {
                console.log("User is logged out");
            }
            // An elaborate, custom popup

            $scope.chats = $firebaseArray(messagesRef);
            var query = messagesRef.orderByChild("timestamp").limitToLast(25);
            $scope.filteredMessages = $firebaseArray(query);
            console.log(authData)
            $scope.sendChat = function(chat) {
                console.log(getName(authData))
                $scope.chats.$add({
                    uid: authData.uid,
                    author: getName(authData),
                    message: chat.message,
                    date: Firebase.ServerValue.TIMESTAMP
                });
                chat.message = "";
            }

            function getName(authData) {
                switch (authData.provider) {
                    case 'password':
                        return authData.password.email.replace(/@.*/, '');
                    case 'twitter':
                        return authData.twitter.displayName;
                    case 'facebook':
                        return authData.facebook.displayName;
                }
            }
        }
    ])
    .controller('loginCtrl', ['$scope', '$firebase', '$firebaseAuth', '$rootScope', function($scope, $firebase, $rootScope, $firebaseAuth) {
        $scope.login = function(user) {
            var ref = new Firebase("https://cleanapps.firebaseio.com/");
            console.log($scope.email)
            console.log($scope.password)
            ref.authWithPassword({
                email: $scope.email,
                password: $scope.password
            }, function(error, authData) {
                if (error) {
                    alert("Login Failed!");
                } else {
                    $rootScope.authData = authData;
                    console.log($rootScope.authData);
                    document.location.href = '#/tab/dash';
                }
            });
        }
        $scope.loginFacebook = function() {
            var ref = new Firebase("https://cleanapps.firebaseio.com/");

            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $rootScope.authData = authData;
                    console.log("Authenticated successfully with payload:", authData);
                    document.location.href = '#/tab/dash';
                }
            })
        }
        $scope.loginTwitter = function() {
            var ref = new Firebase("https://cleanapps.firebaseio.com");
            ref.authWithOAuthPopup("twitter", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    document.location.href = '#/tab/dash';
                }
            });
        }
        $scope.loginGoogle = function() {
            var ref = new Firebase("https://cleanapps.firebaseio.com");
            ref.authWithOAuthPopup("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    document.location.href = '#/tab/dash';
                }
            });
        }
        $scope.loginVK = function() {
            "https://oauth.vk.com/authorize?client_id=5279031&display=popup&redirect_uri=https://cleanapps.firebaseio.com/&scope=friends&response_type=code&v=5.50"
            var ref = new Firebase("https://cleanapps.firebaseio.com");
            ref.authWithOAuthPopup("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    document.location.href = '#/tab/dash';
                }
            });
        }
    }])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})


.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});