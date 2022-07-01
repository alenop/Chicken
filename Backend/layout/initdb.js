const PostgresClient = require("./PostgresClient.js")
const chicken = require("./models/chicken.model")

async function initdb() {
    await PostgresClient.init()
    console.log("ok")
    await PostgresClient.client.query(chicken.toSQLTable())
    console.log("tables crées");
}
initdb()