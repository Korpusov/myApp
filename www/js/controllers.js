angular.module('starter.controllers', ['firebase', 'ionic'])

.controller('DashCtrl', function($scope, $ionicPopup) {
    $scope.scale = "";
    if(localStorage.getItem("scale") == null && localStorage.getItem("numberRoom") == null && localStorage.getItem("numberWC") == null){    
    $scope.room = 1;
    $scope.WC = 1;
    }else{
    $scope.room = Number(localStorage.getItem('numberRoom'));
    $scope.WC = Number(localStorage.getItem("numberWC"));
    }
    $scope.next = function() {
        if ($scope.scale == "") {
            var alertPopup = $ionicPopup.alert({
                title: 'Ошибка',
                template: "Укажите площадь вашей квартиры!"
            });
            alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
   });
        } else {
            localStorage.setItem("scale", $scope.scale);
            localStorage.setItem("numberRoom", $scope.room);
            localStorage.setItem("numberWC", $scope.WC);
            document.location.href = '#/typeclean';
        }

    }
})

.controller('FinishCtrl', function($scope, $ionicPopup) {
    $scope.city = localStorage.getItem("city");

    if (localStorage.getItem("phone") == null && localStorage.getItem("street") == null && localStorage.getItem("numberHome") == null && localStorage.getItem("numberApartment") == null) {} else {
        $scope.phone = localStorage.getItem("phone");
        $scope.street = localStorage.getItem("street");
        $scope.numberHome = localStorage.getItem("numberHome");
        $scope.numberApartment = localStorage.getItem("numberApartment");
    }
    $scope.finish = function() {
        if ($scope.phone == "" || $scope.phone == null || $scope.city == "" || $scope.city == null || $scope.street == "" ||$scope.street == null || $scope.numberHome == "" ||$scope.numberHome == null || $scope.numberApartment == "" ||$scope.numberApartment == null) {
            var alertPopup = $ionicPopup.alert({
                title: 'Ошибка',
                template: "Проверьте правильность введенных данных"
            });
        } else {
            var ordersRef = new Firebase("https://cleanapps.firebaseio.com/orders");
            var city = localStorage.getItem("city");
            var cityRef = ordersRef.child(city);
            var newPostRef = cityRef.push();
            var date = new Date();
            localStorage.setItem("phone", $scope.phone);
            localStorage.setItem("cityOrders", $scope.city);
            localStorage.setItem("street", $scope.street);
            localStorage.setItem("numberHome", $scope.numberHome);
            localStorage.setItem("numberApartment", $scope.numberApartment);

            newPostRef.set({
                Company: city,
                Date: date.getTime(),
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
                uid: localStorage.getItem("uid"),
                NumberApartment: $scope.numberApartment,
                status: false
            });
            var usersRef = new Firebase("https://cleanapps.firebaseio.com/users");
            var cityRef = usersRef.child($scope.city);
            var uidRef = cityRef.child(localStorage.getItem("uid"));
            uidRef.update({
                Mail: "",
                NumberHome: $scope.numberHome,
                NumberRoom: localStorage.getItem("numberRoom"),
                NumberScale: localStorage.getItem("scale"),
                NumberTypeClean: localStorage.getItem("typeClean"),
                NumberWC: localStorage.getItem("numberWC"),
                Phone: $scope.phone,
                City: city,
                Street: $scope.street,
                NumberApartment: $scope.numberApartment
            });
            var alertPopup = $ionicPopup.alert({
                title: 'Заказ принят',
                template: "Спасибо, что оставили заказ у нас! Наши сотрудники непременно с вами свяжутся!"
            });
            alertPopup.then(function(res) {
                document.location.href = '#/tab/dash';
            });
        }
    }
})

.controller('TypeCleanCtrl', function($scope, $ionicPopup) {
    $scope.numberTypeClean = 3;
    $scope.setActive = function(evt) {
        console.log(evt.target.classList[1] !== "button-clear")
        if (evt.target.classList[1] !== "button-clear") {
            console.log('hi')
            $("#RepairID").removeClass("button-assertive")
            $("#GeneralID").removeClass("button-assertive")
            $("#HourID").removeClass("button-assertive")
            angular.element(evt.target).addClass('button-assertive');
        }


    }
    $scope.infoCleanHour = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Уборка за час',
            template: 'Соберем и вынесем мусор \nОчистим мебель и детали интерьера от пыли (на высоте до 2-х метров)\nТщательно пропылесосим ковры и полы \nПомоем напольные покрытия с применением гипоаллергенных средств\nПочистим сантехнику в ванной и туалетной комнате, а также раковину и плиту на кухне'
        });

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }
    $scope.infoGeneral = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Генеральная уборка',
            template: 'Помоем гардины, люстры, потолки\nПроведем обеспыливание стен, удалим стойкие загрязнения\nУдалим пятна и пыль со всех поверхностей, даже в труднодоступных местах\nОтполируем зеркальные и стеклянные поверхности\nОчистим и продезинфицируем сантехнику на кухне, в ванной и туалетной комнатах\nОчистим кухонную мебель и бытовую технику от всех загрязнений (с наружной стороны) \nТщательно пропылесосим ковровые покрытия и мягкую мебель \nПроведем очистку и влажную уборку напольных покрытий, плинтусов \nВынесем мусор'
        });

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }
    $scope.infoRepair = function() {

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
        var messagesRef = new Firebase("https://cleanapps.firebaseio.com/message");
        $scope.error = null;
        // An elaborate, custom popup
        var city = localStorage.getItem("city");
        var uid = localStorage.getItem("uid");
        var name = localStorage.getItem("name");
        var cityRef = messagesRef.child(city);
        var UidRef = cityRef.child(uid);
        $scope.chats = $firebaseArray(UidRef);
        var query = messagesRef.orderByChild("timestamp").limitToLast(25);
        $scope.filteredMessages = $firebaseArray(query);
        scrollTo(0, 9999, [])
        $scope.sendChat = function(chat) {
            var date = new Date();
            $scope.chats.$add({
                uid: uid,
                author: name,
                message: chat.message,
                date: date.getTime()
            });
            chat.message = "";
        }
    }
])


.controller('loginCtrl', ['$scope', '$ionicPopup', '$firebase', '$firebaseAuth', '$rootScope', function($scope, $ionicPopup, $firebase, $rootScope, $firebaseAuth) {
    if (localStorage.getItem("uid") == null) {
        var ref = new Firebase("https://cleanapps.firebaseio.com/");
        $scope.city = "";
        $scope.login = function() {
            console.log($scope.city == "")
            console.log($scope.name == null)
            if ($scope.city == "" && $scope.name == null) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ошибка',
                    template: 'Введите все данные'
                });
                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            } else {
                console.log($scope.city)
                var usersRef = ref.child("users");
                var cityRef = usersRef.child($scope.city);
                var newPostRef = cityRef.push();
                newPostRef.set({
                    uid: newPostRef.key(),
                    City: $scope.city,
                    Name: $scope.name
                });
                localStorage.setItem('uid', newPostRef.key())
                localStorage.setItem('city', $scope.city)
                localStorage.setItem('name', $scope.name)

                document.location.href = '#/tab/dash'
            }
        }
    } else {
        document.location.href = '#/tab/dash'
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

function getMail(authData) {
    switch (authData.provider) {
        case 'password':
            return authData.password.email;
        case 'twitter':
            return authData.twitter.displayName;
        case 'facebook':
            return authData.facebook.email;
    }
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

function saveUsers(authData, ref) {
    var usersRef = ref.child("users/Хабаровск");
    var uid = usersRef.child(authData.uid);
    uid.set({
        uid: authData.uid,
        name: getName(authData),
        email: getMail(authData)
    })
    document.location.href = '#/tab/dash'
};;;;;;;;;;;;;;;;;

// .controller('loginCtrl', ['$scope', '$firebase', '$firebaseAuth', '$rootScope', function($scope, $ionicLoading, $firebase, $rootScope, $firebaseAuth) {
//     var ref = new Firebase("https://cleanapps.firebaseio.com/");
//     $scope.login = function(user) {
//         console.log($scope.email)
//         console.log($scope.password)
//         ref.authWithPassword({
//             email: $scope.email,
//             password: $scope.password
//         }, function(error, authData) {
//             if (error) {
//                 alert("Login Failed!");
//             } else {
//                 $rootScope.authData = authData;
//                 saveUsers(authData, ref)
//                     // document.location.href = '#/tab/dash';
//             }
//         });
//         //$ionicLoading.hide();
//     }
//     $scope.loginFacebook = function() {
//         ref.authWithOAuthPopup("facebook", function(error, authData) {
//             if (error) {
//                 console.log("Login Failed!", error);
//             } else {
//                 $rootScope.authData = authData;
//                 console.log("Authenticated successfully with payload:", authData);
//                 saveUsers(authData, ref)
//             }
//         })

//     }
//     $scope.loginTwitter = function() {
//         ref.authWithOAuthPopup("twitter", function(error, authData) {
//             if (error) {
//                 console.log("Login Failed!", error);
//             } else {
//                 console.log("Authenticated successfully with payload:", authData);
//                 saveUsers(authData, ref)
//             }
//         });
//     }
//     $scope.loginGoogle = function() {
//         ref.authWithOAuthPopup("google", function(error, authData) {
//             if (error) {
//                 console.log("Login Failed!", error);
//             } else {
//                 console.log("Authenticated successfully with payload:", authData);
//                 saveUsers(authData, ref)
//             }
//         });
//     }
//     $scope.loginVK = function() {
//         "https://oauth.vk.com/authorize?client_id=5279031&display=popup&redirect_uri=https://cleanapps.firebaseio.com/&scope=friends&response_type=code&v=5.50"
//         ref.authWithOAuthPopup("google", function(error, authData) {
//             if (error) {
//                 console.log("Login Failed!", error);
//             } else {
//                 console.log("Authenticated successfully with payload:", authData.uid);
//                 saveUsers(authData)
//             }
//         });
//     }


// }])