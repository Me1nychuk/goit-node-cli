import { program } from "commander";

import Contacts from "./db/contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await Contacts.listContacts())
      break;

    case "get":
       console.log(await Contacts.getContactById(id));
      break;

    case "add":
       console.log(await Contacts.addContact(name, email, phone));
      break;

    case "remove":
      console.log(await Contacts.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);