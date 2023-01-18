
function yoo(id){
const a= localStorage.getItem("Blogs");
const b= JSON.parse(a);
const result= b.filter(blog =>b.indexOf(blog)==id);
return result;
}


// fa icons functions
const navlinks= document.querySelector("nav");
    function showmenu(){
        navlinks.style.right="0";
}
    function hidemenu(){
        navlinks.style.right="-200px"
    }

// active nav
    const activepath=window.location.pathname;
    const link= document.querySelectorAll('nav a').forEach(a=>{
        if(a.href.includes(`${activepath}`)) {
                a.classList.add('active')
        }  
    })

const contact= document.getElementsByClassName('contact');

// read more button
function more(){
    const read= document.querySelector("#more");
    const newblogs= document.querySelectorAll(".new");
    read.addEventListener('click',()=>{
        newblogs.forEach(blog =>{
            blog.style.display="block";

        })
        read.style.display="none"
    })
}
// story page


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
// const maxAge= 3*24*60*60;
// function createtoken(id){
//     const jwt = require('jsonwebtoken')

//     return jwt.sign({id},"secret string",{expiresIn:maxAge})
// }

// signup
function signup(event){
    event.preventDefault();
     let a= localStorage.getItem("Users");
let count=0;
    if(a==null){
        localStorage.setItem("Users",JSON.stringify([{email:"admin@gmail.com",password:"admin"}]))
         a= localStorage.getItem("Users");
    }
    let email=document.getElementById("email").value;
    let password=document.getElementById("subject1").value;
    let confirm= document.getElementById("subject2").value;
    const err= document.getElementById('error');
    const newarray=JSON.parse(a);


    if(email&&password&&confirm){
        err.innerHTML=""
        if(!ValidateEmail(email)){
            err.innerHTML="Email is not valid"
        }
        else{
            if(password!=confirm){
                err.innerHTML="Passwords do not match !!"
             }
             else{
                 const result= newarray.forEach(user=>{
                     if(user.email==email){
                          count++;
                    }})
                    if(count==0){
                     const newuser={
                         email:email,
                         password:password
                     }
                     newarray.push({email:newuser.email,password:newuser.password});
                     localStorage.setItem("Users",JSON.stringify(newarray));
             
                     window.location.href="login.html";
                    }
                    else{
                err.innerHTML="Email exists"         
                    }
             }
        }
   
    }
            else{
                err.innerHTML="Please fill all fields !!"
            }   
    }
    // email validation
    function ValidateEmail(mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}


