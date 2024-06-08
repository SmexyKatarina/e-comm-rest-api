const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 3000;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DABA,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const connectClient = async (req, res, next) => {
    req.client = await pool.connect();
    req.connectionTime = Date.now();
    console.log(`Client Connected - ${req.connectionTime}`);
    next();
}

const disconnectClient = (req, res, next) => {
    if (!req.clientReleased ) { 
        req.client.release();
        const time = Date.now();
        console.log(`Client Disconnected - ${time} (${time - req.connectionTime}ms)`);
        req.client = null;
        req.clientReleased = true;
        if (!res.headersSent) res.sendStatus(200);
    }
}

const query = async (client, query) => {
    const response = await client.query(query);
    return response;
}

// Make pool connect a new client
// app.use(cors({
//     origin: 'https://localhost:3000/'
// }));

app.use(connectClient);

app.use(bodyParser.json());

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    async (username, password, done) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, user) => {
        const userInfo = user.rows[0];
        if (err) { return done(err); }  
        if (!userInfo) { return done(null, false, { message: 'Incorrect username / password.'}); }
        bcrypt.compare(password, userInfo.password, (err, result) => {
            if (err) { return done(err); }
            if (!result) { return done(null, false); }
            return done(null, { userID: userInfo.id, username: userInfo.username, display_name: userInfo.display_name });
        });
    });
    
}));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,   
}));

app.use(passport.authenticate('session'));

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, user.userID);
    })
});

passport.deserializeUser((id, done) => {
    process.nextTick(() => {
        pool.query('SELECT * FROM users WHERE id = $1', [ id ], (err, user) => {
            if (err) { done(err); }
            done(null, user.rows[0]);
        });
    });
});

// LOGIN RELATED ENDPOINTS

app.post("/login", passport.authenticate('local'), (r, s) => {
    r.client.release();
    const time = Date.now();
    console.log(`Client Disconnected - ${time} (${time - r.connectionTime}ms)`);
    s.status(200).json({ display_name: r.user.display_name });
});

app.post("/logout", (r, s, n) => {
    r.logout((err) => {
        if (err) next(err);
        s.sendStatus(200);
    });
});

// GET all users
app.get('/api/users', async (req, res, next) => {
    const result = await query(req.client, "SELECT * FROM users ORDER BY id");
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send("Couldn't locate any users."); 
    }
    next();
});

// GET a specific user by email
app.get('/api/users/:userEmail', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM users WHERE email = '${req.params.userEmail}'`); 
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find user with email ${req.params.userEmail}`});
    }
    next();
});

// GET all orders
app.get('/api/orders', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM orders ORDER BY id`);
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't locate any orders.`});
    }
    next();
});

// GET an order by an ID
app.get('/api/orders/:orderId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM orders WHERE id = '${req.params.orderId}'`);
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find order with ID ${req.params.orderId}`});
    }
    next();
});

// GET orders by userId
app.get('/api/user-orders/:userId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM orders WHERE user_id = '${req.params.userId}'`);
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find orders by User ID ${req.params.userId}`});
    }
    next();
});

// GET all items
app.get('/api/items', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM items ORDER BY id`);
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't locate any items.`});
    }
    next();
});

// GET a specific item by ID
app.get('/api/items/:itemId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM items WHERE id = '${req.params.itemId}'`);
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find item by Item ID ${req.params.itemId}`});
    }
    next();
});

// GET all catgories
app.get('/api/categories', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM categories ORDER BY id`);
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find any categories.` });
    }
    next();
});

// GET items by category
app.get('/api/category/:categoryId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM items WHERE category_id = '${req.params.categoryId}'`);
    if (result.rowCount > 0) {
        res.send({ result: await result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find items by Category ID ${req.params.categoryId}`});
    }
    next();
});

app.use(disconnectClient);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
});