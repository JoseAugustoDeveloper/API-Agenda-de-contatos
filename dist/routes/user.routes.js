"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const user_usecase_1 = require("../usecases/user.usecase");
async function userRoutes(fastify) {
    const userUseCase = new user_usecase_1.UserUseCase();
    fastify.post('/', async (req, reply) => {
        const { name, email } = req.body;
        try {
            const data = await userUseCase.create({
                name,
                email,
            });
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    fastify.get('/', (req, reply) => {
        reply.send({ hello: "world" });
    });
}
