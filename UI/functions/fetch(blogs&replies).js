// export let blogs=fetch('https://my-brand-production-b3f0.up.railway.app/blogs')
// .then((response)=>{
//     return response.json()
// })
// .then((data)=>{
//    blogs= data
// })
// .catch((err)=>{
//     console.log(err)
// })

//    nbr of replies
export async function nbrOfReplies(id){
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/users/${id}`,{
        method:'',
        headers:{
            'Authentication': `Bearer ${cookies.jwt}`,
            'Content-Type': 'application/json',
     }
    })
    const data=await res.json()
    console.log(data)
    window.location.reload()
   }

