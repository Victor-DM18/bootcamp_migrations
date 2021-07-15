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

app.get('/posts/:id', async (req, res) => {
    const {
        params: { id },
    } = req;
    const[post] = await db("posts").where({ id });

    if (!post) {
        res.status(404).send({ error: "doesn't exist"});

        return;
    }
    res.send(post);
})

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

app.get("/comments", async (req, res) => {
    res.send(await db("comments"));
})

app.get("/comments/:id", async (req, res) => {
    const {
        params: { id },
    }= req;
    const[comment] = await db("comments").where({ id });

    if (!comment) {

        res.status(404).send({ error: "doesn't exist"});

        return;
    }
    res.send(comment);
})

app.post("/comments", async (req, res) => {
    const {
        body: { content }
    }= req;

    const comment = await db("comments").insert({ cntent }).returning("*");

    res.send(comment);
})

app.put("/comments", async (req, res) => {
    const {
        params: { id },
        body: { content },
    } = req;

    const [comment] = await db("conmment").where({ id }).update({ content }).returning("*");

    res.send(comment);
})

app.listen(3000)
