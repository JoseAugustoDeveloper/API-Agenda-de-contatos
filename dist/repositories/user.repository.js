"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPrisma = void 0;
const prisma_client_1 = require("../database/prisma-client");
class UserRepositoryPrisma {
    async create(data) {
        const result = await prisma_client_1.prisma.user.create({
            data: {
                email: data.email,
                name: data.name
            }
        });
        return result;
    }
    async findByEmail(email) {
        const result = await prisma_client_1.prisma.user.findFirst({
            where: {
                email
            }
        });
        return result || null;
    }
}
exports.UserRepositoryPrisma = UserRepositoryPrisma;
