const socket = io();
let Name;
let textArea = document.querySelector("#textarea");
let messageArea= document.querySelector(".massage_area")
let show_time = document.getElementById("show_time");
let  d= new Date();
show_time.innerHTML = d.toLocaleString();

do{
 Name=prompt("please Enter your name")
}while(!Name);
function validateform(){
    let text = document.getElementById('text').value;
    let error = document.getElementById('error');
    let check=true;
  if(text==""){
      error.innerHTML=" ** please frist enter your name ***";
      check = false;
    }
    else{
        check =true;
        Name = text.value;
  }
return check;
}
let header = document.getElementById("header");
header.innerHTML =Name;

textArea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
    sendmsg(e.target.value);
    textArea.value=t;
    scroll();
    }
})

function sendmsg(message){
    let msg = {
        user:Name,
        msgSend:message.trim()
    }
    appendMsg(msg,'outgoing')
    //send msg
    socket.emit('message',msg);
}

function appendMsg(msg,type){
   let mainDiv = document.createElement('div')
   let className= type;
   mainDiv.classList.add(className,'message')
//    setInterval(myTime, 1000);
   let markup = 
   `
   <h2>${msg.user}</h2>
   <p>${msg.msgSend}</p>
   ` 
   mainDiv.innerHTML= markup;
   messageArea.appendChild(mainDiv);
}

//recieve msg 

socket.on('message',(msg)=>{
    // setInterval(myTime, 1000);
    appendMsg(msg,'incoming');
    scroll();
})
function scroll(){
    messageArea.scrollTop=messageArea.scrollHeight;
}
