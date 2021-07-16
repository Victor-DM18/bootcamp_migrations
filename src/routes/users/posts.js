const postsRoute = (app, { db }) => {

  app.get("/posts", async (req, res) => {
    res.send(await db("posts"));
  });

  app.get("/users/:userId/posts/:id", async (req, res) => {
    const {
      params: { id, userId },
    } = req;

    try {
      const [post] = await db("posts").where({ userId, id });

      if (!post) {
        res.status(404).send({ error: "doesn't exist" });

        return;
      }
      res.send(post);
    } catch (err) {
      next(err);

      return;
    }
  });

  app.post("/users/:userId/posts", async (req, res) => {
    const {
      params: { userId },
      body: { content },
    } = req;

    try {
      const post = await db("posts").insert({ userId, content });

      res.send(post);
    } catch (err) {
      next(err);

      return;
    }
  });

  app.put("/users/:userId/posts/:id", async (req, res) => {
    const {
      params: { id, userId },
      body: { content },
    } = req;

    try {
      const [post] = await db("posts")
        .where({ id })
        .update({ userId, postId, content })
        .returning("*");

      res.send(post);
    } catch (err) {
      next(err);

      return;
    }
  });

  app.delete("/users/:userId/posts/:id", async (req, res) => {
    const {
      params: { userId, id },
      body: { content },
    } = req;

    try {
      const post = await db("posts").where({ id }).delete().returning("*");

      res.send(post);
    } catch (err) {
      next(err);

      return;
    }
  });
};

module.exports = postsRoute;