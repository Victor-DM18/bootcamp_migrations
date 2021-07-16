const postsRoute = (app, { db }) => {
  app.get("/posts", async (req, res) => {
    res.send(await db("posts"));
  });

  app.get("/users/:userId/posts/:postId", async (req, res, next) => {
    const {
      params: { postId, userId },
    } = req;

    try {
      const [post] = await db("posts").where({ userId, postId });

      if (!post) {
        res.status(404).send({ error: "doesn't exist" });

        return;
      }

      res.send(post);
    } catch (err) {
      next(err);
    }
  });

  app.post("/users/:userId/posts", async (req, res, next) => {
    const {
      params: { userId },
      body: { content },
    } = req;

    try {
      const post = await db("posts").insert({ userId, content }).returning("*");

      res.send(post);
    } catch (err) {
      next(err);
    }
  });

  app.put("/users/:userId/posts/:postId", async (req, res, next) => {
    const {
      params: { postId, userId },
      body: { content },
    } = req;

    try {
      const [post] = await db("posts")
        .where({ id: postId, userId, postId })
        .update({ content })
        .returning("*");

      res.send(post);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/users/:userId/posts/:postId", async (req, res, next) => {
    const {
      params: { userId, postId },
      body: { content },
    } = req;

    try {
      const post = await db("posts")
        .where({ id: postId })
        .delete()
        .returning("*");

      res.send(post);
    } catch (err) {
      next(err);
    }
  });
};

module.exports = postsRoute;
