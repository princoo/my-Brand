
export  async function updateBlog(id,formData) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/blogs/${id}`, 
    {
     method: 'PATCH',
     body:formData ,
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
            //  'Content-Type': 'multipart/form-data',
        },
     }); 
     const data= await res.json()
     return data
 }


 export  async function update(id,formData) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/blogs/${id}`, 
    {
     method: 'PATCH',
     body:JSON.stringify(formData)  ,
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
             'Content-Type': 'application/json',
        },
     }); 
     const data= await res.json()
     return data
 }