import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareasRoutes from "./routes/tareaRoutes.js";

// este app representaa toda la funcionlidad de express
const app = express();

// para procesar la informacion tipo json
app.use(express.json());

// lo que hace es buscar un archivo .env
dotenv.config();

// inicia la base de Datos
conectarDB();


//configurar cors
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

// req-> lo que envias al servidor
// res -> lo que responde el servidor



// Routing
// el verbo use responde a todos los verbos http
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareasRoutes);

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// Socket io
import { Server} from 'socket.io'

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,

  }
})

io.on('connection', (socket) => {
    console.log('conectado a socket.io')

    // Definir los eventes de socket io
    socket.on('abrir proyecto', (proyecto) => {
      socket.join(proyecto)      
    })

    socket.on('nueva tarea', (tarea) => {        
      socket.to(tarea.proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
      const proyecto = tarea.proyecto
      socket.in(proyecto).emit('tarea eliminada', tarea)
    })

})