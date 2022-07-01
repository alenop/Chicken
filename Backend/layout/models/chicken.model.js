const PostgresStore = require("../PostgresClient")
const chickens = require('./chicken.model')

class Chicken {
    tableName = "chickens"
    /**@type {number} */
    idchicken
    /**@type {string} */
    name
    /**@type {Date} */
    birthday
    /**@type {number} */
    weight
    /**@type {number} */
    steps
    /**@type {boolean} */
    isRunning

    constructor() {
        this.tableName = "chickens"
    }
    static async getAll() {
        const result = await PostgresStore.client.query(
            `SELECT * FROM ${Chicken.tableName}`
        );
        return result.rows;
    }

    static async delete(name){
        await PostgresStore.client.query(
            `DELETE FROM ${Chicken.tableName}
            WHERE name=$1`,
            [name]
            )
    }
    static async getAllBy(category) {
        const result = await PostgresStore.client.query(
            `SELECT ${category} FROM ${Chicken.tableName}`
        );
        return result.rows;
    }
    static async run(name){
        const result = await PostgresStore.client.query({
            text: `UPDATE  ${Chicken.tableName}
            set isRunning=true,steps=steps+1
        where name=$1`,
            values: [name]
        })
    }
    static async rest(name){
        const result = await PostgresStore.client.query({
            text: `UPDATE  ${Chicken.tableName}
            set isRunning=false
        where name=$1`,
            values: [name]
        })
    }

    static async getById(id) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Chicken.tableName}
             where idchicken=$1`,
            values: [id]
        })
        return result.rows[0]
    }

    static async getName(id) {
        const result = await PostgresStore.client.query({
            text: `Select name FROM ${Chicken.tableName}
         where idchicken=$1`,
            values: [id]
        })
        return result.rows[0]
    }

    static async create(chicken) {
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Chicken.tableName}
                        (name,birthday,weight)
             VALUES ($1,$2,$3)`,
            values: [chicken.name, chicken.birthday, chicken.weight]
        })
        return result.rows[0]
    }

    static async getByName(name) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM  ${Chicken.tableName}
        where name=$1`,
            values: [name]
        })
        return result.rows[0];
    }
    static async alterCategoryByName(name,category,value){
        const result = await PostgresStore.client.query({
            text: `UPDATE  ${Chicken.tableName}
            set $2=$3
        where name=$1`,
            values: [name,category,value]
        })
        return result.rows[0];
    }

    static toSQLTable() {
        return `
          CREATE TABLE ${Chicken.tableName} (
              idchicken SERIAL PRIMARY KEY,
              name TEXT ,
              weight INT NOT NULL,
              birthday DATE ,
              steps INT DEFAULT(0),
              isRunning BOOLEAN DEFAULT(false)
          )`
    }
}
Chicken.tableName = "chickens"
module.exports = Chicken