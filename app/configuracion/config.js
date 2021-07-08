module.exports={
    PORT: process.env.PORT || 3000, /* Toma el puerto asignado por el servidor y si no existe, le asigna el 3000 */
    BD: process.env.BD || 'mongodb://localhost:27017/api-rest'
}