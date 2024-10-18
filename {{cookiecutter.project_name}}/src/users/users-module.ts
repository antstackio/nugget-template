import { randomUUID } from "crypto";
import PostgresDB from "../modules/psql";

class Users extends PostgresDB {
    tablename: string;
    constructor() {
        super();
        this.tablename = "user";
        if(!this.tablename) {
            throw new Error("USER_TABLE environment variable is not set.");
        }
    }

    
    async addUser(username: string, email: string): Promise<void> {
      // USER_TABLE environment variable contains the name of the table meant for storing user information
      const id = randomUUID();
      await this.addItem(this.tablename, {id, username, email});
    }
    
    async getUser(id: number): Promise<{id: number, username: string, email: string} | null> {
      // USER_TABLE environment variable contains the name of the table meant for storing user information
      return await this.getItem(this.tablename, id) as {id: number, username: string, email: string} | null;
    }

    // Add additional methods or override existing ones as needed

}

const users = new Users();
export default users;