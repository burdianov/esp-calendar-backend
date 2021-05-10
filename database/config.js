const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('DB connected...');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar database');
  }
};

module.exports = { dbConnection };
