"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUseCase = void 0;
const contacts_repository_1 = require("../repositories/contacts.repository");
const user_repository_1 = require("../repositories/user.repository");
class ContactUseCase {
    constructor() {
        this.contactRepository = new contacts_repository_1.ContactsRepositoryPrisma();
        this.userRepository = new user_repository_1.UserRepositoryPrisma();
    }
    async create({ name, email, phone, userEmail }) {
        //email do usuario logado
        //buscar o usuario pelo email
        //se nao existir, retornar erro
        //se existir, criar o contato
        //antes de criar o contato, validar se ele ja existe pelo telefone ou email
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error('User not found');
        }
        const verifyExistsContacts = await this.contactRepository.findByEmailOrPhone(email, phone);
        if (verifyExistsContacts) {
            throw new Error('Contact already registered');
        }
        const contact = await this.contactRepository.create({
            name,
            email,
            phone,
            userId: user.id,
        });
        return contact;
    }
    async listAllContacts(userEmail) {
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error('User not found');
        }
        const contacts = await this.contactRepository.findAllContacts(user.id);
        return contacts;
    }
    async updateContact({ id, name, email, phone }) {
        const data = await this.contactRepository.updateContact({
            id,
            name,
            email,
            phone
        });
        return data;
    }
    async delete(id) {
        const data = await this.contactRepository.delete(id);
        return data;
    }
}
exports.ContactUseCase = ContactUseCase;
