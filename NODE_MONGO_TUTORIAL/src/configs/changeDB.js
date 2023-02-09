const {connect,close}= require('../configs/database')
before(async () => {
    await connect("test");
  });
  after(async () => {
    await close();
  });