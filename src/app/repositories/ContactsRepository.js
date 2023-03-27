const {v4} = require('uuid');
const db = require('../../database/index');

let contacts = [
  {
    id: v4(),
    name: 'Lucca',
    email: 'lucca@mail.com',
    phone: '111112222',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Jose',
    email: 'Jose@mail.com',
    phone: '95892222',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create(name, email, phone, category_id) {
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
