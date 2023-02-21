//    nbr of replies
export async function nbrOfReplies(id){
    let way=[]
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/comments`,{
        method:'GET'
    })
    const data=await res.json()

// console.log(data.message[1].replies)
data.message.forEach((msg)=>{
    msg.replies.forEach((reply)=>{
    if(reply.comment_id==id){
        way.push(reply)
    }else{
    }
    })
})
return way
}
// sending a reply to a comment
export  async function newReply(id,replyData) {
    const res= await fetch(`https://my-brand-production-b3f0.up.railway.app/comment/reply/${id}`, 
    {
     method: 'POST',
     body:JSON.stringify(replyData),
     headers: {
             'Authentication': `Bearer ${cookies.jwt}`,
             'Content-Type': 'application/json',
        },
     }); 
     const data= await res.json()
     console.log(data)
    //  return data
 }

