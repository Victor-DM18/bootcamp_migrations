const express = require("express");
const knex = require("knex");
const knexfile = require("./knexfile");

const app = express();
const db = knex(knexfile);

app.use(express.json());

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
}
catch(err) {
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
  }
  catch(err) {
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
  }
  catch(err) {
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
  }
  catch(err) {
    next(err);

    return;
  }
});

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

app.listen(3000);
