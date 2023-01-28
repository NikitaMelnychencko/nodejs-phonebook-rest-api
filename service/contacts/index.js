const { CustomError } = require("../../middlewares/error-handler");
const contactMethod = require("../../models/index");
const { getContactById, listContacts, getStatistics } =
  contactMethod.listContacts;
const { addContact } = contactMethod.addContact;
const { updateContact } = contactMethod.updateContact;
const { removeContact } = contactMethod.removeContact;

class ContactService {
  async getAll(query, user) {
    const { limit = 5, page = 0, sortBy, sortByDesc, filter, favorite } = query;
    let sortCriteria = null;
    let select = null;
    if (sortBy) {
      sortCriteria = { [sortBy]: 1 };
    }
    if (sortByDesc) {
      sortCriteria = { [sortByDesc]: -1 };
    }
    if (filter) {
      select = filter.split("|").join(" ");
    }
    return await listContacts(
      { limit, page, sortCriteria, select, favorite },
      user
    );
  }

  async getById(id, user) {
    const getContact = await getContactById(id, user);
    if (!getContact) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
    return getContact;
  }

  async create(name, email, age, phone, favorite, user) {
    return await addContact(name, email, age, phone, favorite, user);
  }

  async update(id, body, user) {
    const upContact = await updateContact(id, body, user);
    if (!upContact) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
  }

  async putchFavorite(id, favorite, user) {
    const contactFild = await contactMethod.putchFavorite(id, favorite, user);
    if (!contactFild) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
    return contactFild;
  }

  async remove(id, user) {
    const updateContact = await removeContact(id, user);
    if (!updateContact) {
      throw new CustomError(404, `Contacts ${id} Not found`);
    }
  }

  async getAgeStatistics(user) {
    const result = await getStatistics(user);
    return result;
  }
}

module.exports = new ContactService();
