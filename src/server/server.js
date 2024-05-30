const express = require("express");
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
    req.client.release();
    const time = Date.now();
    console.log(`Client Disconnected - ${time} (${time - req.connectionTime}ms)`);
    next();
}

const query = async (client, query) => {
    const response = await client.query(query);
    return response;
}

// Make pool connect a new client
app.use(connectClient);

// GET all users
app.get('/api/users', async (req, res, next) => {
    const result = await query(req.client, "SELECT * FROM users");
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send("Couldn't locate any users.");
    }
    next();
});

// GET a specific user by email
app.get('/api/users/:userEmail', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM users WHERE email = '${req.params.userEmail}'`); 
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find user with email ${req.params.userEmail}`});
    }
    next();
});

// GET all orders
app.get('/api/orders', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM orders`);
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't locate any orders.`});
    }
    next();
});

// GET an order by an ID
app.get('/api/orders/:orderId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM orders WHERE id = '${req.params.orderId}'`);
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find order with ID ${req.params.orderId}`});
    }
    next();
});

// GET orders by userId
app.get('/api/user-orders/:userId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM orders WHERE user_id = '${req.params.userId}'`);
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find orders by User ID ${req.params.userId}`});
    }
    next();
});

// GET all items
app.get('/api/items', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM items`);
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't locate any items.`});
    }
    next();
});

// GET a specific item by ID
app.get('/api/items/:itemId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM items WHERE id = '${req.params.itemId}'`);
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find item by Item ID ${req.params.itemId}`});
    }
    next();
});

// GET all catgories
app.get('/api/categories', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM categories`);
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find any categories.` });
    }
    next();
});

// GET items by category
app.get('/api/category/:categoryId', async (req, res, next) => {
    const result = await query(req.client, `SELECT * FROM items WHERE category_id = '${req.params.categoryId}'`);
    if (result.rowCount > 0) {
        res.send({ result: result.rows });
    } else {
        res.status(500).send({ error: `Couldn't find items by Category ID ${req.params.categoryId}`});
    }
    next();
});

app.use(disconnectClient);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
});