var cookies= document.cookie
.split(';')
.map(cookie => cookie.split('='))
.reduce((accumulator, [key,value]) =>
({ ...accumulator,[key.trim()]: decodeURIComponent(value)}),{})

// module.exports= cookies
  async function viewAdmin() {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/admin`, 
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


