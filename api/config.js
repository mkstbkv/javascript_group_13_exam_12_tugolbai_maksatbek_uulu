const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/gallery',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '557518385561604',
        appSecret: '36127b7271d65adcb1e0f18068ecd318'
    }
};