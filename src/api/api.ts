import { IDBPDatabase, openDB } from 'idb'

export default class API {
    private readonly database: string;
    private db!: IDBPDatabase;

    constructor (database: string) {
      this.database = database
    }

    async createObjectStore (tableName: string): Promise<boolean | unknown> {
      try {
        this.db = await openDB(this.database, 1, {
          upgrade (db: IDBPDatabase) {
            if (!db.objectStoreNames.contains(tableName)) {
              db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' })
            }
          }
        })
      } catch (error) {
        return false
      }
    }

    async getValue (tableName: string, id: number): Promise<void> {
      const tx = this.db.transaction(tableName, 'readonly')
      const store = tx.objectStore(tableName)
      const result = await store.get(id)
      console.log('Get Data ', JSON.stringify(result))
      return result
    }

    async getAllValue (tableName: string): Promise<Array<unknown>> {
      const tx = this.db.transaction(tableName, 'readonly')
      const store = tx.objectStore(tableName)
      const result = await store.getAll()
      console.log('Get All Data', JSON.stringify(result))
      return result
    }

    public async putValue (tableName: string, value: unknown): Promise<IDBValidKey> {
      const tx = this.db.transaction(tableName, 'readwrite')
      const store = tx.objectStore(tableName)
      const result = await store.put(value)
      console.log('Put Data ', JSON.stringify(result))
      return result
    }

    async putBulkValue (tableName: string, values: Array<unknown>): Promise<Array<unknown>> {
      const tx = this.db.transaction(tableName, 'readwrite')
      const store = tx.objectStore(tableName)
      for (const value of values) {
        const result = await store.put(value)
        console.log('Put Bulk Data ', JSON.stringify(result))
      }
      return this.getAllValue(tableName)
    }

    async deleteValue (tableName: string, id: number): Promise<number> {
      const tx = this.db.transaction(tableName, 'readwrite')
      const store = tx.objectStore(tableName)
      const result = await store.get(id)
      if (!result) {
        console.log('Id not found', id)
        return result
      }
      await store.delete(id)
      console.log('Deleted Data', id)
      return id
    }
}
