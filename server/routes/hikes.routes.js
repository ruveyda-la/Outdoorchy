
const HikeController = require('../controllers/hikes.controller');

module.exports = (app) => {
    app.get('/api/hikes',HikeController.getAllHikes);
    app.post('/api/hikes', HikeController.createHike);
    app.get('/api/hikes/:_id',HikeController.getHikeById);
    app.patch('/api/hikes/:_id', HikeController.updateHike);
    app.delete('/api/hikes/:_id', HikeController.deleteHike);
    
}