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


firebase.initializeApp(firebaseConfig);

  
user_name = localStorage.getItem("user_name");
//Na linha acima, você está pegando o nome do usuário dentro do localStorage
//Faça o mesmo com o 'room_name'
//??
room_name = localStorage.getItem("room_name");
function send()
{
  msg = document.getElementById("msg").value;
  //Utilize o firebase.database().ref para referenciar o nome da sala que está no firebase

  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() { 
//Utilize o código que referencia o firebase
firebase.database().ref("/"+room_name).on('value',
  function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
	       name = message_data['name'];
	       message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = name_with_tag + message_with_tag +like_button + span_with_tag;       
        document.getElementById("output").innerHTML += row;

      } });  }); }
getData();

function updateLike(message_id)
{
  
	button_id = message_id;
	likes = document.getElementById(button_id).value;
  //Utilize '+1'para que sempre que o botão de like for clicado, o número de likes seja adicionado mais 1
	updated_likes = Number(likes) +1;
	firebase.database().ref(room_name).child(message_id).update({
    //Na linha 53, uma variável 'updated_likes' foi criado
    //Adicione esse variável dentro da variável 'likes'
		like : updated_likes
	 });

}
function logout() {
    localStorage.removeItem("user_name");
    window.location = "index.html";
}
//Crie a função logout
//Você ja criou essa função no arquivo 'kwiter_room.js'
