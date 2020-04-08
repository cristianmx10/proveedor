const mongoose = require('mongoose');

const mongodbUri = 'mongodb+srv://example:1UuhMpnBC4CodU5J@cluster0-qf0af.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongodbUri, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('mongoDB online'))
    .catch(error => console.log(error));