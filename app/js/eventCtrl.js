//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject,Helper) {
		Auth.$onAuthStateChanged(function(authData){
            if (authData){
                $scope.authData = authData;
                console.log(authData.uid);
                var ref = firebase.database().ref('users/' + authData.uid + '/writable');
                $scope.myEvents = $firebaseObject(ref);

                ref = firebase.database().ref('events');
                $scope.events = $firebaseArray(ref);



            }
            else console.log("signed out");
		});

        $scope.input={
            name:"",
            ddl: "",
            min:"",
            max:"",
            desc:"",
        }




        $scope.submit = function(){
            var event = {
                eventInfo:
                {name:"",
                ddl:"",
                min:"",
                max:"",
                desc:""}

            };


            event.eventInfo.name = $scope.input.name;
            event.eventInfo.min = $scope.input.min;
            event.eventInfo.max = $scope.input.max;
            event.eventInfo.desc = $scope.input.desc;



            event.eventInfo.ddl = $scope.input.ddl.toJSON();

            event.eventInfo.isClosed = false;
            console.log(event);


            event.eventInfo.admin = $scope.authData.uid;
            Helper.createEvent($scope.authData.uid,event);



        }


		console.log("event");
	}
);