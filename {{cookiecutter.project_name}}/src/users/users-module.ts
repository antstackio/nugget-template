import { randomInt } from "crypto";
import PostgresDB from "../modules/psql";

class Users extends PostgresDB {
    tablename: string;
    constructor() {
        super();
        this.tablename = "user_table";
        if(!this.tablename) {
            throw new Error("USER_TABLE environment variable is not set.");
        }
    }

    
    async addUser(username: string, email: string): Promise<number> {
      // USER_TABLE environment variable contains the name of the table meant for storing user information
      const id = randomInt(1000);
      console.log(`Adding user with id ${id}`);
      await this.addItem(this.tablename, {id, username, email});
      return id;
    }
    
    async getUser(id: number): Promise<{id: number, username: string, email: string} | null> {
      // USER_TABLE environment variable contains the name of the table meant for storing user information
      return await this.getItem(this.tablename, id) as {id: number, username: string, email: string} | null;
    }

    // Add additional methods or override existing ones as needed

    async listUsers(): Promise<{id: number, username: string, email: string}[]> {
      // USER_TABLE environment variable contains the name of the table meant for storing user information
      return await this.query(`SELECT * FROM ${this.tablename}`) as {id: number, username: string, email: string}[];
    }

}

const users = new Users();
export default users;