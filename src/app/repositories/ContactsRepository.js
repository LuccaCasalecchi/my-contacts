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
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts ORDER BY name ASC');
    return rows;
  }

  async findById(id) {
    const rows = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return rows;
  }

  async findByEmail(email) {
    const rows = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return rows;
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
