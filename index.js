const { program } = require('commander');
const contacts = require('./contacts.js');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();
const options = program.opts();

//console.log('options',options);
//console.log('process',program.opts);

const invokeAction = async ({ action, id, name, email, phone }) => {
  console.log(action);
  switch (action) {
    case 'list':
        const allContacts = await contacts.getAllContacts();
        return console.log(allContacts);
    case 'get':
      const oneContact= await contacts.getContactById(id);
      return console.log(oneContact);
    case 'add':
      // ... name email phone
      const newContact = await contacts.addContact({name, email, phone});
      return console.log(newContact);
    case 'remove':
      // ... id
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
    default:
      console.warn('Unknown action type!');
  }
}

invokeAction(options);