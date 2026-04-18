

import {Database} from 'bun:sqlite'

const db = new Database('dars.db', {create: true})
db.exec('PRAGMA journal_mode = WAL')

export default db; 
