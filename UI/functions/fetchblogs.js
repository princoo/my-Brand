var wooo
fetch('https://my-brand-production-b3f0.up.railway.app/blogs')
.then((response)=>{
    return response.json()
})
.then((data)=>{
   wooo= data
})
console.log(wooo)


