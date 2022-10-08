const mongoose = require('mongoose');

const conectionString = 'mongodb+srv://taller_user:ydgee0e3AeMPsBl3@cluster0.9wx4x.mongodb.net/fastifyTads';

mongoose
  .connect(conectionString, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log('DB CONNECTED SUCCESSFULLY');
  });
