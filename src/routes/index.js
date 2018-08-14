import userRoutes from './userRoutes';
import contactRoutes from './contactRoutes';
import chatRoutes from './chatRoutes';

function initRoutes(app) {
    app.use('/user', userRoutes);
    app.use('/contact',contactRoutes);
    app.use('/chat',chatRoutes);
}

module.exports = initRoutes;