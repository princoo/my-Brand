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
}

// homepage animation
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


// token
const maxAge= 3*24*60*60;
function createtoken(id){
    const jwt = require('jsonwebtoken')

    return jwt.sign({id},"secret string",{expiresIn:maxAge})
}

// signup
function signup(event){
    event.preventDefault();
     let a= localStorage.getItem("Users");
    //  console.log(a)
    if(a==null){
        localStorage.setItem("Users",JSON.stringify([{email:"admin",password:"admin"}]))
         a= localStorage.getItem("Users");
    }

    let email=document.getElementById("email").value;
    let password=document.getElementById("subject").value;
    if(email&&password){
            const newuser={
            email:email,
            password:password
        }
        const newarray=JSON.parse(a);
        console.log(b)
        newarray.push({email:newuser.email,password:newuser.password});
        localStorage.setItem("Users",JSON.stringify(newarray)); 
    }
    else{
        console.log("fill all spaces provided")
    }
    }

// login
function login(event){
    event.preventDefault();
    let count=0;
    let a=localStorage.getItem("Users")
    let users=JSON.parse(a);
    const email=document.getElementById("email").value;
    const password=document.getElementById("subject").value;
    const object={
        email:email,
        password:password
    }

    if(email&&password){
        const index= users.findIndex(user =>user.email===email);
        if(index!=(-1)){
            if(users[index].password===password){
                console.log("its a match");
                // const token = createtoken(index);
                const q=JSON.stringify(object)
                document.cookie= "jwt:q"
                console.log(document.cookie)
            }
            else{
                console.log("incorrect password")
            }
        }
        else{
            console.log("please enter the correct email")
        }
     }
}
