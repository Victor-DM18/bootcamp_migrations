const commentsRoute = (app, {db}) => {

app.get("/comments", async (req, res) => {
  res.send(await db("comments"));
});

app.get("/users/:usersId/posts/:postId/comments/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
  const [comment] = await db("comments").where({ userId, postId, id });

  if (!comment) {
    res.status(404).send({ error: "doesn't exist" });

    return;
  }
  res.send(comment);
}
catch(err) {
  next(err);

  return;
}
});

app.post("/users/:userId/posts/:postId/comments", async (req, res) => {
  const {
    params: { userId, postId },
    body: { content },
  } = req;

  try {
  const comment = await db("comments")
    .insert({ userId, postId, content })
    .returning("*");

  res.send(comment);
  }
  catch(err) {
    next(err);

    return;
  }
});

app.put("/users/:userId/posts/:postId/comments", async (req, res) => {
  const {
    params: { userId, postId },
    body: { content },
  } = req;

  try {
  const [comment] = await db("conmment")
    .where({ id })
    .update({ userdId, postId, content })
    .returning("*");

  res.send(comment);
  }
  catch(err) {
    next(err);

    return;
  }
});

app.delete("/users/:userId/posts/:postId/comments//id", async (req, res) => {
  const {
    params: { userId, postId, id },
    body: { content },
  } = req;

  try {
  const comment = await db("comments").where({ id }).delete().returning("*");

  res.send(comment);
  }
  catch(err) {
    next(err);

    return;
  }
});
};

module.exports = commentsRoute;