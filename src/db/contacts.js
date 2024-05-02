import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";


const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    // ...твій код. Повертає масив контактів.
    try {
        const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
        return JSON.parse(data)
    }
    catch (error) { 
         if (error.code === 'ENOENT') {
      return [];
    }
    }
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    
    try {
        const data = await listContacts();

        const contact = data.find(contact => contact.id === contactId) ;
    return contact || null;

    } catch (error) {
        throw error;
    }
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const contact = await getContactById(contactId);
        if ( contact === null) {
            return null;
        }
        else {
            const data = await listContacts();
            
            const newData = data.filter(contact => contact.id !== contactId);
            await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
            return contact;
        }
    } catch (error) {
        throw error;
    }
}

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    try {
        const data = await listContacts();
        const newContact = {
            id: crypto.randomUUID(),
           name,
            email,
            phone,
        }
        data.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
        return newContact;
    } catch (error) {
        throw error;
    }
    
}

export default { listContacts, getContactById, removeContact, addContact };