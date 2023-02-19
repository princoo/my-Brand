
export  async function generateLikes(id) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/blogs/like/${id}`, 
    {
     method: 'POST',
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
        },
     }); 
     const data= await res.json()
     return data
 }

 export  async function generateDislikes(id) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/blogs/dislike/${id}`, 
    {
     method: 'POST',
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
        },
     }); 
     const data= await res.json()
     return data
 }


