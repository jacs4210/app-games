import mysql from 'promise-mysql';
import keys from './keys';

/*
Crea un pool de conexiones que permite basicamente tener un conjunto de conexiones para
ser usadas por el proceso que la necesite, siempre permanecen abiertas y se puede definir
un limite para la cantidad de sesiones a tener en el pool.
*/
const pool = mysql.createPool(keys.database);

// Obtiene una conexión disponible del pool, una vez la establece, se retorna el objeto.
pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is connected');
    });

export default pool;