export function modify(id){
    window.location.href=`dashboard.html?page=${id}`
   }

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