export  async function addDraft(draftData) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/drafts/add`, 
    {
     method: 'POST',
     body:JSON.stringify(draftData) ,
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
             'Content-Type': 'application/json',
        },
     });
     const data= await res.json()
     console.log(data)
    //  return data

 }