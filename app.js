require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { db_init } = require('./db');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const ApiError = require('./errors/ApiError');
const passport = require('./config/passport');

const port = process.env.SERVER_PORT || 3000;

app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'lax'
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/', routes);

app.use((req, res, next) => {
    next(new ApiError(404, 'Route not found'));
});

app.use(errorHandler);

async function startServer() {
    try {
        await db_init();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
        });
    } catch (err) {
        console.error('Failed to initialize database. Server not started.', err);
        process.exit(1);
    }
}

startServer().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});