import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../', '.env') })

export const PORT = process.env?.PORT ?? 3002
export const DB_CONNECT_STRING = process.env?.DB_CONNECT_STRING ?? ''