const express = require("express");
const knex = require("knex");
const knexfile = require("./knexfile");

const app = express ();
const db = knex(knexfile);

app.use(express.json());

app.get("/users", async (req, res) => {
    res.send(await db("users"));
});

app.get("users/:id", async (req, res) => {
    const {
        params : { id },
    } = req;
    const [user] = await db("users").where({ id });

    if(!user) {
        res.status(404).send({ error: "doesn't exist"});

        return;
    }

    res.send(user);
})

app.post("/users", async (req, res) => {
    const {
        body: {usename, email, password},
    } =req;

    const user = await db("users").insert({ usename, email, password});

    res.send(user);
});

app.put("/users/:id", async (req, res) => {
    const {
        params: { id },
        body: { usename, email, password},
    } = req;

    const [user] = await("users").where({ id}).update({ usename, email, password}).returning("*");

    res.send(user);

})

app.get("/posts", async (req, res) => {
    res.send(await db("posts"));
});

app.post("/posts", async (req, res) => {
    const {
        body: { content },
    } = req;

    const post = await db("posts").insert({ content });

    res.send(post);
})

app.put("/posts/:id", async (req, res) => {
    const {
        params: { id },
        body: { content },
    } = req;

    const [post] = await db("posts").where({ id }).update({ content }).returning("*");

    res.send(post);
})
app.listen(3000)
