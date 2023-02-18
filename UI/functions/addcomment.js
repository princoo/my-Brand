export  async function newComment(id,commentData) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/blogs/comment/${id}`, 
    {
     method: 'POST',
     body:JSON.stringify(commentData) ,
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
             'Content-Type': 'application/json',
        },
     }); 
     const data= await res.json()
     return data
 }