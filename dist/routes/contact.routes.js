"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsRoutes = contactsRoutes;
const contact_usecase_1 = require("../usecases/contact.usecase");
const auth_middleware_1 = require("../middlewares/auth.middleware");
async function contactsRoutes(fastify) {
    const contactUseCase = new contact_usecase_1.ContactUseCase();
    fastify.addHook('preHandler', auth_middleware_1.authMiddleware);
    fastify.post('/', async (request, reply) => {
        const { name, email, phone } = request.body;
        const emailUser = request.headers['email'];
        try {
            const data = await contactUseCase.create({
                email,
                name,
                phone,
                userEmail: emailUser
            });
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    fastify.get('/', async (req, reply) => {
        const emailUser = req.headers['email'];
        try {
            const data = await contactUseCase.listAllContacts(emailUser);
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    fastify.put('/:id', async (req, reply) => {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        try {
            const data = await contactUseCase.updateContact({
                id,
                name,
                email,
                phone
            });
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    fastify.delete('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await contactUseCase.delete(id);
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
}
