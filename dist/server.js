"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const user_routes_1 = require("./routes/user.routes");
const contact_routes_1 = require("./routes/contact.routes");
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default, {
    origin: "*", // Permite todas as origens (ou especifique origens permitidas)
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
});
app.register(user_routes_1.userRoutes, {
    prefix: '/users',
});
app.register(contact_routes_1.contactsRoutes, {
    prefix: '/contacts',
});
app.listen({
    port: 3100
}, () => console.log('Server is running on port 3100'));
