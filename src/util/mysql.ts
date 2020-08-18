import mysql from 'mysql'
import { MysqlConfig } from '../model/config'

let pool: mysql.Pool

const initPool = (mysqlConfig: MysqlConfig): void => {
  pool = mysql.createPool(mysqlConfig)
}

function queryOne<T>(sql: string, args: unknown): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) reject(err)
      conn.query(sql, args, (err, results) => {
        if (err) reject(err)
        if (results.length > 0) {
          resolve(results[0])
        } else {
          resolve()
        }
      })
    })
  })
}

export { initPool, queryOne }
