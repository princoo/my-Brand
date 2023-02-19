export let numberOfLikes
export  async function generateBlog(id) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/blogs/${id}`, 
    {
     method: 'GET',
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
             'Content-Type': 'application/json',
        },
     }); 
     const data= await res.json()
     return data
 }


