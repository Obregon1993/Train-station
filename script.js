var firebaseConfig = {
    apiKey: "AIzaSyBa7U9_mU-w7GF_H_vOdw3wG3TqS-M1kOE",
    authDomain: "train-943b8.firebaseapp.com",
    databaseURL: "https://train-943b8.firebaseio.com",
    projectId: "train-943b8",
    storageBucket: "train-943b8.appspot.com",
    messagingSenderId: "1042891644557",
    appId: "1:1042891644557:web:ec742d5925b6e75bc30cc4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName= $("#train-name-input").val().trim();
    var trainDestination= $("#destination-input").val().trim();
    var trainStart = moment($("#first-time-input").val().trim(),"HH:mm").format("HH:mm");
    var trainFrecuency= Number($("#frecuency-input").val().trim());
      
var newTrain={
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frecuency: trainFrecuency
}
database.ref().push(newTrain);


    console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrecuency );

  alert("Train succefully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frecuency-input").val("");


  });
  
  database.ref().on("child_added", function (childSnapshot) {
      
    var trainName= childSnapshot.val().name;
    var trainDestination= childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrecuency= childSnapshot.val().frecuency;

    var firstTime=moment(trainStart, "HH:mm").subtract(1,"year");
    var frecuency=trainFrecuency;
    var diffTime =moment().diff(moment(firstTime),"minutes");
    var remainder = diffTime % frecuency;
    var minsAway= frecuency-remainder;
    var nextArrival=moment().add(minsAway,"minutes").format("hh:mm")

    var newRow= $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrecuency),
        $("<td>").text(nextArrival),
        $("<td>").text(minsAway),
    )
        $("#train-table > tbody").append(newRow);


  });