const firebaseConfig = {
  apiKey: "AIzaSyAfvUeYd4e7AVSetOz9IgdPxNxKsJP6dlY",
  authDomain: "banco-de-dados-80425.firebaseapp.com",
  databaseURL: "https://banco-de-dados-80425-default-rtdb.firebaseio.com",
  projectId: "banco-de-dados-80425",
  storageBucket: "banco-de-dados-80425.appspot.com",
  messagingSenderId: "712789558884",
  appId: "1:712789558884:web:6af1554451a2f74517c171",
  measurementId: "G-2J64CJFJJ1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Bem-vindo(a) " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adicionar sala"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}
