const chai= require('chai')
const chaiHttp= require('chai-http')
// const fs = require('fs')
// const FormData = require('form-data');
// const admin = require('./NODE_MONGO_TUTORIAL/src/middlewares/adminActions')
const chaiAspromise= require('chai-as-promised')
// const request= require('supertest')
const server= require('./NODE_MONGO_TUTORIAL/app')
const dotenv = require('dotenv')
const emailval= require('./NODE_MONGO_TUTORIAL/src/middlewares/emailvalidation')
dotenv.config();
chai.should()
chai.use(chaiHttp)
chai.use(chaiAspromise)

describe("TASKS TEST",()=>{

    describe("GET /blogs",()=>{
        it("it should get all blogs",(done)=>{
            chai.request(server)
            .get("/blogs")
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('array')
                done()
            })
        })
    })

    describe("GET /blogs/:id",()=>{
        it("should get single blog",(done)=>{
            chai.request(server)
            .get("/blogs/"+ process.env.BLOG_ID)
            .end((err,res)=>{
                res.should.have.status(200)
                done()
            })
        })
    })

    describe("POST /login",()=>{
        it("it should login the Admin",(done)=>{
            const user={
                email:"admin@gmail.com",
                password:"admin"
            }
            chai.request(server)
            .post("/login")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(200)
                response.should.be.json
                done()
            })
        })
    })

    describe("POST /login",()=>{
        it("it should not login (empty fields)",(done)=>{
            const user={
                email:"",
                password:"admin"
            }
            chai.request(server)
            .post("/login")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(400)
                response.should.be.json
                done()
            })
        })
    })


    describe("POST /login",()=>{
        it("it should login the normal user",(done)=>{
            const user={
                email:"paul@gmail.com",
                password:"paul"
            }
            chai.request(server)
            .post("/login")
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                done()
            })
        })
    })

    describe("POST /login",()=>{
        it("it should not login the user (incorect password)",(done)=>{
            const user={
                email:"rash@gmail.com",
                password:"uoo"
            }
            chai.request(server)
            .post("/login")
            .send(user)
            .end((err,res)=>{
                res.should.have.status(403)
                res.should.be.json
                done()
            })
        })
    })

    describe("POST /signup",()=>{
        it("it should signup a new user",(done)=>{
            const user={
                username:process.env.USERNAME,
                email:process.env.EMAIL,
                password:process.env.PASSWORD
            }
            chai.request(server)
            .post("/signup")
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                done()
            })
        })
    })

    describe("POST /signup",()=>{
        it("it should not sign a new user if he exists",(done)=>{
            const user={
                username:"rash",
                email:"rash@gmail.com",
                password:"rash"
            }
            chai.request(server)
            .post("/signup")
            .send(user)
            .end((err,res)=>{
                res.should.have.status(403)
                res.should.be.json
                res.body.should.have.property('Error')
                done()
            })
        })
    })

    describe("POST /blogs/add",()=>{
        it("should send a blog",(done)=>{
          
        const filePath = __dirname + '/1.jpg'; // path to the file you want to upload

            chai.request(server)
            .post("/add")
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .field('title', 'new title')
            .field('body', 'new body test')
            .attach('image',fs.readFileSync(filePath),'1.jpg')
            .end((err,res)=>{
                res.should.have.status(201)
                done()
                
            })
        })
    })

    describe("POST /blogs/add",()=>{
        it("should not send a blog (empty fields)",(done)=>{
          
        const filePath = __dirname + '/1.jpg'; // path to the file you want to upload

            chai.request(server)
            .post("/add")
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .field('title', '')
            .field('body', 'new body test')
            .attach('image',fs.readFileSync(filePath),'1.jpg')
            .end((err,res)=>{
                res.should.have.status(400)
                done()
                
            })
        })
    })


    describe("POST /blogs/:id",()=>{
        it("should delete a blog",(done)=>{
            chai.request(server)
            .delete("/blogs/" + process.env.DELETED_BLOG_ID)
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .end((err,res)=>{
                res.should.have.status(200)
                done()
                
            })
        })
    })
    describe("POST /blogs/:id",()=>{
        it("should not delete a blog(not admin)",(done)=>{
            chai.request(server)
            .delete("/blogs/" + process.env.DELETED_BLOG_ID)
            .set('cookie',`jwt=${process.env.USER_TOKEN}`)
            .end((err,res)=>{
                res.should.have.status(400)
                done()
                
            })
        })
    })
    describe("POST /blogs/:id",()=>{
        it("should not delete a blog(not loged in)",(done)=>{
            chai.request(server)
            .delete("/blogs/" + process.env.DELETED_BLOG_ID)
            .set('cookie',`jwt=${process.env.INVALID_TOKEN}`)
            .end((err,res)=>{
                res.should.have.status(401)
                done()
                
            })
        })
    })
   
    describe("POST /blogs/:id",()=>{
        it("should update a blog",(done)=>{
            const blog={
                title: "updated"
            }
            chai.request(server)
            .patch("/blogs/" + process.env.BLOG_ID)
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .send(blog)
            .end((err,res)=>{
                res.should.have.status(200)
                done()
                
            })
        })
    })

    describe("POST /blogs/comment/:id",()=>{
        it("it should send a new comment if the token is valid(loged in)", (done)=>{
              const cmnt={
                comment:"yesss"
              }
            chai.request(server)
            .post("/blogs/comment/" + process.env.BLOG_ID)
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .send(cmnt)
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                done()
            })
        })
    })

    describe("POST /blogs/comment/:id",()=>{
        it("it should not add a comment when the token is not valid(loged out)",(done)=>{
              const cmnt={
               comment:"yesss"
              }
            const id= '63debceecbf59035753ac630'
            chai.request(server)
            .post("/blogs/comment/" + id)
            .set('cookie',`jwt=${process.env.INVALID_TOKEN}`)
            .send(cmnt)
            .end((err,res)=>{
                res.should.have.status(401)
                res.should.be.json
                res.body.should.have.property('Error').to.equal("Please Login First !!!")
                done()
            })
        })
    })

    describe("POST /blogs/comment/:id",()=>{
        it("it should not add a comment (empty fields)",(done)=>{
              const cmnt={
               comment:""
              }
            const id= '63debceecbf59035753ac630'
            chai.request(server)
            .post("/blogs/comment/" + id)
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .send(cmnt)
            .end((err,res)=>{
                res.should.have.status(400)
                res.should.be.json
                done()
            })
        })
    })

    describe("POST /blogs/comment/:id",()=>{
        it("it should not add a comment (invalid id)",(done)=>{
              const cmnt={
               comment:""
              }
            const id= '63debceecbf59035753ac63'
            chai.request(server)
            .post("/blogs/comment/" + id)
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .send(cmnt)
            .end((err,res)=>{
                res.should.have.status(400)
                res.should.be.json
                done()
            })
        })
    })


    describe("POST /blogs/like/:id",()=>{
        it("it should  add a like to a blog ( when loged in)",(done)=>{
            const blogID= process.env.BLOG_ID
            chai.request(server)
            .post("/blogs/like/" + blogID)
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .end((err,res)=>{
                 res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property('message')
                done()
            })
        })
    })


    describe("POST /blogs/like/:id",()=>{
        it("it should  not add a like to a blog ( invalid id)",(done)=>{
            const blogID= process.env.INVALID_BLOG_ID
            chai.request(server)
            .post("/blogs/like/" + blogID)
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .end((err,res)=>{
                res.should.have.status(401)
                res.should.be.json
                res.body.should.have.property('message')
                done()
            })
        })
    })

    describe("POST /messages",()=>{
        it("it should send add a new message",(done)=>{
            const msg={
                email:"princeineza@gmail.com",
                message:" to text"
            }
            chai.request(server)
            .post("/messages")
            .send(msg)
            .end((err,res)=>{
                res.should.have.status(201)
                res.should.be.json
                res.body.should.have.property("message")
                done()
            })
        })
    })

    describe("POST /messages",()=>{
        it("it should  not send add a new message (empty fields)",(done)=>{
            const msg={
                email:"",
                message:" to text"
            }
            chai.request(server)
            .post("/messages")
            .send(msg)
            .end((err,res)=>{
                res.should.have.status(400)
                res.should.be.json
                res.body.should.have.property("error")
                done()
            })
        })
    })

    describe("POST /users/update/:id",()=>{
        it("it should update user info (when admin)",(done)=>{
            const msg={
                username:" james"
            }
             chai.request(server)
            .patch("/users/update/" + process.env.USER_ID)
            .set('Cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .send(msg)
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property("message")
                done()
            })
        })
    })

    describe("POST /users/update/:id",()=>{
        it("it should not update user info (invalid id)",(done)=>{
            const msg={
                username:" james"
            }
             chai.request(server)
            .patch("/users/update/" + process.env.INVALID_USER_ID)
            .set('Cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .send(msg)
            .end((err,res)=>{
                res.should.have.status(400)
                res.should.be.json
                res.body.should.have.property("error")
                done()
            })
        })
    })

    describe("POST /blogs/:blogID/:commentID",()=>{
        it("it should delete comment (when admin)",(done)=>{
            const id= process.env.BLOG_ID
            const comment_id= process.env.DELETED_COMMENT_ID
            chai.request(server)
            .delete("/blogs/" + id + "/" + comment_id)
            .set('Cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property("Message")
                done()
            })
        })
    })



    describe("POST /messages",()=>{
        it("it should display all messages (when admin)",(done)=>{
            chai.request(server)
            .get("/messages")
            .set('Cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property("message")
                done()
            })
        })
    })

    describe("GET /logout",()=>{
        it("it should logout a user",(done)=>{

            chai.request(server)
            .get("/logout")
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property("message")
                done()
            })
        })
    })

    describe("EMAIL VALIDATION",()=>{
        it("it should check an email validation",(done)=>{
                const validate= emailval("princeineza@gmail.com")
                validate.should.equal(true);
                done()
        })
    })

    
    

})
