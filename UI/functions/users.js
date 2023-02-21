export  async function generateUsers(id) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/users`, 
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


