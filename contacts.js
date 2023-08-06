const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const getAllContacts = async () => {
  // Читает из db все данные. Парсит и возвращает полный список контактов.
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log('My EVA Error:', error.message)
  }
}

const getContactById = async (id) => {
  // Возвращает объект контакта с id.
  // Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await getAllContacts();
    const result = contacts.find(elem => elem.id === id);
    return result || null;
  } catch (error) {
    console.log('My EVA Error:', error.message)
  }
}

const removeContact = async (id) => {
  // Удаляет контакт по id из db. Возвращает объект удаленного контакта.
  //Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(elem => elem.id === id);
    if (index === -1) { return null };
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return result;
  } catch (error) {
    console.log('My EVA Error:', error.message)
  }
}

const addContact = async (data) => {
  // Добавляет новый контакт. Возвращает объект добавленного контакта. 
  try {
    const contacts = await getAllContacts();
    const newContact = { id: nanoid(), ...data };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log('My EVA Error:', error.message)
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact
}