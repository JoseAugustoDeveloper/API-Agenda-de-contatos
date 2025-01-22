import {  Contact, ContactCreate, ContactRepository } from "../interfaces/contacts.interface";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase{
  private contactRepository: ContactRepository
  private userRepository: UserRepositoryPrisma
  constructor(){
    this.contactRepository = new ContactsRepositoryPrisma()
    this.userRepository = new UserRepositoryPrisma()
  }
  async create ( { name, email, phone, userEmail }: ContactCreate){
    //email do usuario logado
    //buscar o usuario pelo email
    //se nao existir, retornar erro
    //se existir, criar o contato
    //antes de criar o contato, validar se ele ja existe pelo telefone ou email

    const user = await this.userRepository.findByEmail(userEmail);

    if(!user){
      throw new Error('User not found');
    }

    const verifyExistsContacts = await this.contactRepository.findByEmailOrPhone(email, phone);

    if(verifyExistsContacts){
      throw new Error('Contact already registered');
    }

    const contact = await this.contactRepository.create({
      name,
      email,
      phone,
      userId: user.id,
    })
    return contact;
  }
  async listAllContacts(userEmail: string){
    const user = await this.userRepository.findByEmail(userEmail);
    if(!user){
      throw new Error('User not found');
    }
    
    const contacts = await this.contactRepository.findAllContacts(user.id);

    return contacts;
  }

  async updateContact({id, name, email, phone}: Contact){
    const data = await this.contactRepository.updateContact({
      id, 
      name, 
      email, 
      phone
    })
    return data;
  }
  async delete(id: string){
    const data = await this.contactRepository.delete(id)

    return data;
  }
}

export { ContactUseCase };