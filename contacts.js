const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data)
}

const getContactById = async (id) => {
    const data = await listContacts()
    const result = data.find(item => item.id === id)
    return result || null
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    return newContact;
};

const removeContact = async (contactId) => {
    const data = await listContacts();
    const index = await data.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null
    }
    const [result] = data.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
    return result
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};