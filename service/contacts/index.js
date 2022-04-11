const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { CustomError } = require("../../middlewares/error-handler");
const contactMethod = require("../../models/index");
const { getContactById, listContacts } = contactMethod.listContacts;
const { addContact } = contactMethod.addContact;
const { updateContact } = contactMethod.updateContact;
const { removeContact } = contactMethod.removeContact;

class ContactService {
  async getAll(query) {
    return await listContacts(query);
  }

  async getById(id) {
    const getContact = await getContactById(id);
    if (!getContact) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
    return getContact
  }

  async create(name, email, phone, favorite) {
    return await addContact(name, email, phone, favorite)
  }

  async update(id, body) {
    const upContact = await updateContact(id, body);
    if (!upContact) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
  }

  async putchFavorite(id, favorite){
    const contactFild = await contactMethod.putchFavorite(id, favorite);
    if (!contactFild) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
    return contactFild
  }

  async remove(id) {
    const updateContact = await removeContact(id);
    if (!updateContact) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
  }
}

module.exports = new ContactService();
