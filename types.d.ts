import { Connection } from "mongoose"

Connection
declare global {
  var mongoose:{
    conn: Connection | null
    promise: Promise<Connection> | null
  }
}

export {};