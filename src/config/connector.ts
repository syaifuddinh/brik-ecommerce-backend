const pool = require('./database');

module.exports = class Connector {
    #pool = null;
    result = null;

    async #connect(): Promise<any> {
        if(!this.#pool) this.#pool = await pool.connect(); 
        return this.#pool;
    }

    async get(query: string): Promise<any> {
        const client = await this.#connect();
        try {
            const result = await client.query(query);
            const rows = result.rows;
            this.result = rows;
            return this;
        } catch (error) {
            console.error('Error executing query:', error);
            throw 'Error executing query:' + error;
        } finally {
            client.release(); // Release the client back to the pool
        }
    }

    async getOne(query: string): Promise<any> {
        const client = await this.#connect();
        try {
            const result = await client.query(query);
            const rows = result.rows;
            this.result = rows.length > 0 ? rows[0] : null;
            return this;
        } catch (error) {
            console.error('Error executing query:', error);
            throw 'Error executing query:' + error;
        } finally {
            client.release(); // Release the client back to the pool
        }
    }

    async execute(query: string): Promise<any> {
        const client = await this.#connect();
        try {
            await client.query(query);
        } catch (error) {
            console.error('Error executing query:', error);
            throw 'Error executing query:' + error;
        } finally {
            client.release(); // Release the client back to the pool
        }   
    }
}