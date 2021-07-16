const usersRoute =(app, { db }) => {

app.get("/users", async (req, res) => {
  res.send(await db("users"));
});

app.get("users/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const [user] = await db("users").where({ id });

    if (!user) {
      res.status(404).send({ error: "doesn't exist" });

      return;
    }

    res.send(user);
  } 
  catch (err) {
    next(err);

    return;
  }
});

app.post("/users", async (req, res) => {
  const {
    body: { usename, email, password },
  } = req;

  try {

  const user = await db("users").insert({ usename, email, password });

  res.send(user);
  }
  catch(err) {
    next(err);
  }
});

app.put("/users/:id", async (req, res) => {
  const {
    params: { id },
    body: { usename, email, password },
  } = req;

  try {

  const [user] = await db("users")
    .where({ id })
    .update({ usename, email, password })
    .returning("*");

  res.send(user);
  }
  catch(err) {
    next(err);

    return;
  }
});

app.delete("/users/:id", async (req, res) => {
  const {
    params: { id },
    body: { usename, email, password },
  } = req;

  try {

  const user = await db("users").where({ id }).delete().returning("*");

  res.send(user);
  }
  catch(err) {
    next(err);

    return;
  }
});

};

module.exports = usersRoute;