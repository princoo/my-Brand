const check= window.location.search
if(check!=""){
let parameter= new URLSearchParams(window.location.search)
let id = parameter.get("page")
let draftid =parameter.get("draft")
if(draftid){
    let a=localStorage.getItem("Drafts")
    const b= JSON.parse(a);
    b.forEach(draft => {
        if (b.indexOf(draft)==draftid) {
        draft.title= title.value;
        draft.body= body.value;
        draft.image= url;
        }
    })
    localStorage.setItem("Drafts",JSON.stringify(b))
    loader.style.display="block"
    wait.textContent="UPDATING ..."

    setTimeout(()=>{
        loader.style.display="none"
    },2000)
    setTimeout(()=>{
    window.location.href="dashboard.html"
    },2000)

}
else if(id){

    if (image.value){
        console.log('image')
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('body', body.value);
        formData.append('image', image.files[0]);
        const result= updateBlog(id,formData)
        console.log(result)
    }else{
            const formData={
            title: title.value,
            body: body.value,
             }
             const result= update(id,formData)
             result.then((data)=>{
                console.log(data)
             })
            }}}