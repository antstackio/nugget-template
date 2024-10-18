import { Knex, knex } from 'knex';
import ParameterStore from './ssm';


type ItemStructure = { [key: string]: any };

class PostgresDB {
  private knex!: Knex;

  async initializeKnex() {
    const parameterStore = new ParameterStore();
    const connectionString = await parameterStore.getParameter('PSQL_CONNECTION_STRING');
    this.knex = knex({
      client: 'pg',
      connection: connectionString,
    });
    console.log('Knex initialized', this.knex);
  }

  async addItem(table: string, item: ItemStructure): Promise<void> {
    await this.knex(table).insert(item);
  }

  async getItem(table: string, id: number): Promise<ItemStructure | null> {
    const result = await this.knex(table).where('id', id).select();
    return result[0] || null;
  }

  async updateItem(table: string, id: number, updates: ItemStructure): Promise<void> {
    await this.knex(table).where('id', id).update(updates);
  }

  async deleteItem(table: string, id: number): Promise<void> {
    await this.knex(table).where('id', id).del();
  }

  async query(queryString: string, params: any[] = []): Promise<ItemStructure[]> {
    const result = await this.knex.raw(queryString, params);
    return result.rows;
  }

  async end(): Promise<void> {
    await this.knex.destroy();
  }
}

export default PostgresDB;