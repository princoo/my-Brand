export let blogs
fetch('https://my-brand-production-b3f0.up.railway.app/blogs')
.then((response)=>{
    return response.json()
})
.then((data)=>{
   blogs= data
})
.catch((err)=>{
    console.log(err)
})


