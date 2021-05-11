import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const { createRoles } = require('./libs/initialSetup');
require('dotenv').config();

const app = express();
createRoles();

app.set('pkg', pkg)

app.use(morgan('dev'))
app.use(express.json())


app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes)

app.get('/', (req, res) => {
    res.json({
        name : app.get('pkg').name,
        author : app.get('pkg').author,
        description : app.get('pkg').description,
        version : app.get('pkg').version
    })
});

export default app;