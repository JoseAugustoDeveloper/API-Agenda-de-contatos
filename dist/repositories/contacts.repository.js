"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsRepositoryPrisma = void 0;
const prisma_client_1 = require("../database/prisma-client");
class ContactsRepositoryPrisma {
    async create(data) {
        const result = await prisma_client_1.prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId,
            }
        });
        return result;
    }
    async findByEmailOrPhone(email, phone) {
        const result = await prisma_client_1.prisma.contacts.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });
        return result || null;
    }
    async findAllContacts(userId) {
        const result = await prisma_client_1.prisma.contacts.findMany({
            where: {
                userId
            }
        });
        return result;
    }
    async updateContact({ id, name, email, phone }) {
        const result = await prisma_client_1.prisma.contacts.update({
            where: { id },
            data: {
                name,
                email,
                phone
            },
        });
        return result;
    }
    async delete(id) {
        const result = await prisma_client_1.prisma.contacts.delete({ where: { id } });
        return result ? true : false;
    }
}
exports.ContactsRepositoryPrisma = ContactsRepositoryPrisma;
