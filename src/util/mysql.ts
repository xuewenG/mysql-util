import mysql from 'mysql'
import { MysqlConfig } from '../model/config'

let pool: mysql.Pool

export const initPool = (mysqlConfig: MysqlConfig): void => {
  pool = mysql.createPool(mysqlConfig)
}

export function queryList<T>(sql: string, args: unknown): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) reject(err)
      conn.query(sql, args, (err, results) => {
        if (err) reject(err)
        resolve(results || [])
      })
    })
  })
}

export async function queryOne<T>(
  sql: string,
  args: unknown
): Promise<T | null> {
  const list = await queryList<T>(sql, args)
  return list[0] || null
}
