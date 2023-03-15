 let allGames;
 let navLinks = [...document.querySelectorAll('nav li')];
 for(let i=0;i<navLinks.length;i++){
    navLinks[i].addEventListener('click',function(e){
        let genregame = e.target.getAttribute('data-code');
        // console.log(genregame);
        getGame(genregame);
    })
 }
 getGame('shooter')
 async function getGame(genregame){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '15a178694cmshfbf69d3921a7dd1p13fad2jsnbe65031aae76',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

  let api =   await  fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${genregame}&sort-by=release-date', options`, options)
	let response= await  api.json();
    allGames = response; 
    display();
}
function display(){
    game= '';
    for(var i=0;i<allGames.length;i++){
       game+=`
       <div class="col-md-3">
       <div class="item shadow text-center">
           <img  class="w-100" src="${allGames[i].thumbnail}" alt="">
           <h5 class="fw-bold fs-6 text-warning mt-2">${allGames[i].title}</h5>
           <p>platform:${allGames[i].platform}</p>
           <a class="btn btn-success text-warning mb-3 fw-bold" href="${allGames[i].game_url}">Go to Game</a>
       </div>
   </div>
       `
    }
    document.getElementById('games').innerHTML = game
}
 let singupname = document.getElementById('singupname');
 let singupemail = document.getElementById('singuemail');
 let singuppass = document.getElementById('singuppass');
let singupBtn = document.getElementById('singupBtn');
let allplayers;
let player;
if(singupBtn !=null){
    singupBtn.addEventListener('click',function(){
    addplayer()
})
}
if(localStorage.getItem('player') != ""){
    allplayers=JSON.parse(localStorage.getItem('player'));
}else{
    allplayers=[];
}
 function addplayer(){
    if(singupname.value!=""||singupemail.value!=""||singuppass.value!="" ){
        player={
            name:singupname.value ,
            email:singupemail.value,
            pass:singuppass.value
        }
        allplayers.push(player)
        localStorage.setItem('player',JSON.stringify(allplayers));
        $('#singup').fadeOut(400,function(){
            $('#login').fadeIn(400);
        })
        clear()
    }else if(singupname.value==""||singupemail.value==""||singuppass.value==""){
        document.getElementById('emptyMsg').classList.replace('d-none','d-block')
       singupname.classList.add('is-invalid');
       singupemail.classList.add('is-invalid');
       singuppass.classList.add('is-invalid');
    }
 }
 function clear(){
    singupname.value ="",
    singupemail.value ="",
    singuppass.value =""
 }

let singinemail = document.getElementById('singinemail');
let singinpass = document.getElementById('singinpass');

let loginBtn = document.getElementById('loginBtn');
if(loginBtn !=null){
    loginBtn.addEventListener('click',function(){
    checkplayer();
})
}

function checkplayer(){
    if(singinemail.value == ""||singinpass.value ==""){
        document.getElementById('emptymsg').classList.replace('d-none','d-block')
        singinemail.classList.add('is-invalid');
        singinpass.classList.add('is-invalid');
    }else if(singinemail.value!= ""||singinpass.value !=""){
        check()
    }
}
let playerName;
 function check(){
    for(let i=0;i<allplayers.length;i++){
        if(singinemail.value.toLowerCase()==allplayers[i].email.toLowerCase()&&singinpass.value.toLowerCase()==allplayers[i].pass.toLowerCase()){
          localStorage.setItem('playername',allplayers[i].name);
            $('#login').fadeOut(400,function(){
                $('#home').fadeIn(400);
            })
        }else if (singinemail.value.toLowerCase()!=allplayers[i].email.toLowerCase()&&singinpass.value.toLowerCase()!=allplayers[i].pass.toLowerCase()){
            document.getElementById('notregist').classList.replace('d-none','d-block')
            document.getElementById('emptymsg').classList.replace('d-block','d-none')

        }
    }
 }
 $('#home').ready(function(){
    playername();
 })
 function playername(){
    playerName = localStorage.getItem('playername')
    document.getElementById('p-name').innerHTML =`welcome ${playerName}`;
 }
 $('#logind').click(function(){
    $('#login').fadeIn(0);
    $('#singup').fadeOut(0);
 })
 $('#singupd').click(function(){
    $('#singup').fadeIn(0);
    $('#login').fadeOut(0);
 })
