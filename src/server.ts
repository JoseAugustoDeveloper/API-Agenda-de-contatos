import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from './routes/user.routes'
import  {contactsRoutes} from './routes/contact.routes'

const app: FastifyInstance = fastify({ logger: true });

const port = parseInt(process.env.PORT || "3100", 10);

app.register(cors, {
  origin: "*", // Permite todas as origens (ou especifique origens permitidas)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
});

app.register(userRoutes,{
  prefix: '/users',
 });

app.register(contactsRoutes,{
  prefix: '/contacts',
 });

app.listen(
  { port },
() => console.log(`Server is running on port ${port}`),
);