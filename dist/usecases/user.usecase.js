"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserUseCase {
    constructor() {
        this.userRepository = new user_repository_1.UserRepositoryPrisma();
    }
    async create({ name, email }) {
        const verifyUserExists = await this.userRepository.findByEmail(email);
        if (verifyUserExists) {
            throw new Error('Email already registered');
        }
        const result = await this.userRepository.create({ email, name });
        return result;
    }
}
exports.UserUseCase = UserUseCase;
