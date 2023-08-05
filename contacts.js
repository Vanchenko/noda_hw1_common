const fs = require('fs/promises');
const path =require('path'); 
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname,'db','contacts.json');

const getAllContacts = async () => {
   // Читает из db все данные. Парсит и возвращает полный список контактов.
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  }
  
 const getContactById = async(id) => {
    // Возвращает объект контакта с id. 
    // Возвращает null, если объект с таким id не найден.
    const contacts = await getAllContacts();
    const result = contacts.find(elem => elem.id === id);
    return result || null; 
  }
  
  const removeContact = async(id) => {
    // Удаляет контакт по id из db. Возвращает объект удаленного контакта. 
    //Возвращает null, если объект с таким id не найден.
    const contacts = await getAllContacts();
    const index = contacts.findIndex(elem => elem.id === id);
    if (index === -1) {return null};
    const [result] = contacts.splice(index,1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return result;
  }
  
 const addContact = async(data) => {
    // Добавляет новый контакт. Возвращает объект добавленного контакта. 
    const contacts = await getAllContacts();
    const newContact = { id: nanoid(), ...data };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

  module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    removeContact
}