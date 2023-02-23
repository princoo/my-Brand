export async function eraseDraft(id){
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/drafts/${id}`,{
        method:'DELETE',
        headers:{
            'Authentication': `Bearer ${cookies.jwt}`,
            'Content-Type': 'application/json',
     }
    })
    const data=await res.json()
    console.log(data)
    window.location.reload()
   }
//delete a blog 
   export async function erase(id){
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/blogs/${id}`,{
        method:'DELETE',
        headers:{
            'Authentication': `Bearer ${cookies.jwt}`,
            'Content-Type': 'application/json',
     }
    })
    const data=await res.json()
    console.log(data)
    window.location.reload()
   }

//    delete a user
export async function eraseUser(id){
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/users/${id}`,{
        method:'DELETE',
        headers:{
            'Authentication': `Bearer ${cookies.jwt}`,
            'Content-Type': 'application/json',
     }
    })
    const data=await res.json()
    console.log(data)
    window.location.reload()
   }
//    deleting a draft


