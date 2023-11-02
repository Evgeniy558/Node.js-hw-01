const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = JSON.parse((await fs.readFile(contactsPath)).toString());
    return contacts;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}

async function getContactsById(contactsId) {
  try {
    const contacts = await listContacts();
    const contactByID =
      contacts.find((contact) => contact.id === contactsId) || null;
    return contactByID;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const indexDeleteContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexDeleteContact >= 0) {
      const editedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(editedContacts));
      const deleteContact = contacts.splice(indexDeleteContact, 1);
      return deleteContact;
    }
    return null;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}

module.exports = { listContacts, getContactsById, removeContact, addContact };
