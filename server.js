import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import actorRoutes from './src/actor/routes.js'; 
import peliculaRoutes from './src/pelicula/routes.js';

const PORT = process.env.PORT || 3000; 
const app = express();


app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());


app.all('/', (req, res) => {
    return res.status(200).send('Bienvenido al Cine Iplacex');
});


app.use('/api/actores', actorRoutes);
app.use('/api/peliculas', peliculaRoutes);


async function startServer() {
    try {
        await client.connect(); 
        console.log('Conectado al Clúster');

       
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Ha ocurrido un error al conectarse al clúster de Atlas:', error);
    }
}


startServer();
