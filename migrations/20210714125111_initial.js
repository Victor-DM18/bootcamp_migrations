
exports.up = async (knex) => {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.text("username").notNullable();
        table.text("email").notNullable();
        table.text("password").notNullable();
        table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
        table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
        table.datetime("deletedAt").nullable();
    })
    await knex.schema.createTable("posts", (table) => {
        table.increments("id");
        table.text("content").notNullable();
        table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
        table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
        table.datetime("deletedAt").nullable();
        table.integer("userId").unsigned().notNullable();
        
        table.foreign("userId").references("id").inTable("users");
    })
    await knex.schema.createTable("comments", (table) => {
        table.increments("id");
        table.text("content").notNullable();
        table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
        table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
        table.datetime("deletedAt").nullable();
        table.integer("userId").unsigned().notNullable();
        table.integer("postId").unsigned().notNullable();

        table.foreign("userId").references("id").inTable("users");
        table.foreign("postId").references("id").inTable("posts");
    })
  
};

exports.down = async (knex) => {
    await knex.schema.dropTable("comments");
    await knex.schema.dropTable("posts");
    await knex.schema.dropTable("users");
  
};
