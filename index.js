const express = require ("express");

const app = express ();

app.use(express.json());

app.get("/users", async (req, res) => {
    res.send(awaitdb("users"));
});
app.post("/users", async (req, res) => {
    const {
        body: {usename, email, password},
    } =req;

    const user = await db("users").insert({ usename, email, password});

    res.send(user);
})

app.put("/users/:id", async (req, res) => {
    const {
        params: { id },
        body: { usename, email, password},
    } = req;

    const [user] = await("users").where({ id}).update({ usename, email, password}).returning("*");

    res.send(user);

})

app.listen(3000)
