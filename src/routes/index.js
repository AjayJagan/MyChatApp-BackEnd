import userRoutes from './userRoutes';
import contactRoutes from './contactRoutes';

function initRoutes(app) {
    app.use('/user', userRoutes);
    app.use('/contact',contactRoutes);
}

module.exports = initRoutes;