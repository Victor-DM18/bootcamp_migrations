const commentsRoute = (app, { db }) => {
  app.get("/comments", async (req, res) => {
    res.send(await db("comments"));
  });

  app.get(
    "/users/:usersId/posts/:postId/comments/:commentId",
    async (req, res, next) => {
      const {
        params: { commentId },
      } = req;

      try {
        const [comment] = await db("comments").where({
          userId,
          postId,
          id: commentId,
        });

        if (!comment) {
          res.status(404).send({ error: "doesn't exist" });

          return;
        }

        res.send(comment);
      } catch (err) {
        next(err);
      }
    }
  );

  app.post("/users/:userId/posts/:postId/comments", async (req, res, next) => {
    const {
      params: { userId, postId },
      body: { content },
    } = req;

    try {
      const comment = await db("comments")
        .insert({ userId, postId, content })
        .returning("*");

      res.send(comment);
    } catch (err) {
      next(err);
    }
  });

  app.put(
    "/users/:userId/posts/:postId/comments/:commentId",
    async (req, res, next) => {
      const {
        params: { userId, postId, commentId },
        body: { content },
      } = req;

      try {
        const [comment] = await db("conmment")
          .where({ id: commentId, userdId, postId })
          .update({ content })
          .returning("*");

        res.send(comment);
      } catch (err) {
        next(err);
      }
    }
  );

  app.delete(
    "/users/:userId/posts/:postId/comments/:commentId",
    async (req, res, next) => {
      const {
        params: { userId, postId, commentId },
        body: { content },
      } = req;

      try {
        const comment = await db("comments")
          .where({ id: commentId })
          .delete()
          .returning("*");

        res.send(comment);
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = commentsRoute;
