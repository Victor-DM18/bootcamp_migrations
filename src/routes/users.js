const usersRoute = (app, { db }) => {
  app.get("/users", async (req, res) => {
    res.send(await db("users"));
  });

  app.get("users/:id", async (req, res, next) => {
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
    } catch (err) {
      next(err);
    }
  });

  app.post("/users", async (req, res, next) => {
    const {
      body: { username, email, password },
    } = req;

    try {
      const user = await db("users")
        .insert({ username, email, password })
        .returning("*");

      res.send(user);
    } catch (err) {
      next(err);
    }
  });

  app.put("/users/:id", async (req, res, next) => {
    const {
      params: { id },
      body: { username, email, password },
    } = req;

    try {
      const [user] = await db("users")
        .where({ id })
        .update({ username, email, password })
        .returning("*");

      res.send(user);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/users/:id", async (req, res, next) => {
    const {
      params: { id },
      body: { username, email, password },
    } = req;

    try {
      const user = await db("users").where({ id }).delete().returning("*");

      res.send(user);
    } catch (err) {
      next(err);
    }
  });
};

module.exports = usersRoute;
