const pg = require("pg");

class PostgresClient {
    client
    async init() {
        const config = {
            user: 'postgres',
            host: 'localhost',
            database: 'examen',
            password: 'Azeazeaz1',
            port: 5432
        }

        this.client = new pg.Client(config);
        await this.client.connect()
    }
}

module.exports = new PostgresClient()