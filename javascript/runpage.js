// fa icons functions
const navlinks= document.querySelector("nav");
const background= document.querySelector(".back")
    function showmenu(){
        navlinks.style.right="0";
}
    function hidemenu(){
        navlinks.style.right="-200px"
        background.style.display="none";

    }
// active nav
    const activepath=window.location.pathname;
    const link= document.querySelectorAll('nav a').forEach(a=>{
        if(a.href.includes(`${activepath}`)) {
                a.classList.add('active')
        }  
    })

const contact= document.getElementsByClassName('contact');



// login
const a='princeineza@gmail.com';
const b= 'test123'
function login(event){
    event.preventDefault();
    const email= document.querySelector('.email').value;
    const password= document.querySelector('.subject').value;
if(email==a && password==b){
    window.location.replace('dashboard.html');
}
else{
    console.log("unmatched")
}
// }

}


const span=document.querySelectorAll("span")
index=0;
inTimer=3000
outTimer=2000;
function addclass(){
    for(let i=0;i<span.length;i++){
        span[i].classList.remove("text-in","text-out");
    }
    span[index].classList.add("text-in");

    setTimeout(function(){
        span[index].classList.add("text-out");
    },outTimer)

   
    setTimeout(function(){
        if(index==(span.length-1)){
            index=0;
        }
        else{
            index=index+1;
        }
        addclass()
    },inTimer)
}
window.onload= addclass


// dark mode section
function change(){
    const  changes= document.getElementById("theme");
    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){
        changes.src= "../html/images/sun.png";
    }else{
        changes.src= "../html/images/moon.png"

    }

}