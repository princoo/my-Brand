const chai= require('chai')
const chaiHttp= require('chai-http')
const fs = require('fs')
const chaiAspromise= require('chai-as-promised')
const request= require('supertest')
const server= require('../app')
const dotenv = require('dotenv')
const emailval= require('../src/middlewares/emailvalidation')
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
                response.body.should.have.property('Message').to.equal('Loged In As Admin');
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
                res.body.should.have.property('Message').to.equal('Loged In As User')
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
                res.body.should.have.property('token')
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

    describe.skip("POST /blogs/add",()=>{
        it("should send a blog",(done)=>{

            chai.request(server)
            .post("/blog/add")
            .set('cookie',`jwt=${process.env.ADMIN_TOKEN}`)
            .field('title', 'new title')
            .field('body', 'new body test')
            .attach('image', fs.readFileSync(__dirname + '/1.jpg'), '1.jpg')
            // .send(blog)
            .end((err,res)=>{
                res.should.have.status(200)
                // res.should.be.json
                // res.body.should.eventually.have.property('message')
            })
        })
    })

   

    describe("POST /blogs/comment/:id",()=>{
        it("it should send a new comment if the token is valid(loged in)",(done)=>{
              const cmnt={
                comment:"yesss"
              }
            chai.request(server)
            .post("/blogs/comment/" + process.env.BLOG_ID)
            .set('cookie',`jwt=${process.env.USER_TOKEN}`)
            .send(cmnt)
            .end((err,res)=>{
                res.should.have.status(200)
                res.should.be.json
                res.body.should.have.property('Message').to.equal("comment Added")
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

    describe("POST /blogs/like/:id",()=>{
        it("it should  add a like to a blog ( when loged in)",(done)=>{
            chai.request(server)
            .post("/blogs/like/" + process.env.BLOG_ID)
            .set('cookie',`jwt=${process.env.USER_TOKEN}`)
            .end((err,res)=>{
                 res.should.have.status(200)
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

    describe("POST /blogs/:blogID/:commentID",()=>{
        it("it should delete comment (when admin)",(done)=>{
            const id= process.env.BLOG_ID
            const comment_id= process.env.COMMENT_ID
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
