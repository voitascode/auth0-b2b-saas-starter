import { neon } from "@neondatabase/serverless"

export async function getData() {
  const sql = neon(process.env.DATABASE_URL_NEON!)
  return sql
}
