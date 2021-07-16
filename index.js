const express = require("express");
const knex = require("knex");
const knexfile = require("./knexfile");
const { readdir, stat } = require("fs/promises");
const { resolve } = require("path");

const app = express();
const db = knex(knexfile);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).send({ error: "internal error" });
});

app.use(express.json());

const loadRoutesFromDir = async (path) => {
  const entries = await readdir(path);

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve(path, entry);
      const entryStat = await stat(entryPath);

      if (entryStat.isDirectory()) {
        loadRoutesFromDir(entryPath);

        return;
      }

      const route = require(entryPath);

      route(app, { db });
    })
  );
};

loadRoutesFromDir("./src/routes");

app.listen(3000);
