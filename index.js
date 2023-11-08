import { program } from "commander";
import { listContacts } from "./contacts/listContacts.js";
import { getContactsById } from "./contacts/getContactsById.js";
import { removeContact } from "./contacts/removeContact.js";
import { addContact } from "./contacts/addContact.js";

program
  .option("-a, --action [string]", "choose action")
  .option("-i, --id [string]", "user id")
  .option("-n, --name [string]", "user name")
  .option("-e, --email [string]", "user email")
  .option("-p, --phone [string]", "user phone");

const { action, id, name, email, phone } = program.parse(process.argv).opts();
console.log(action, id, name, email, phone);

function invokeAction(action, id, name, email, phone) {
  switch (action) {
    case "list":
      listContacts().then((data) => console.table(data));
      break;
    case "get":
      getContactsById(id).then((data) => {
        console.log(data);
      });
      break;
    case "add":
      addContact(name, email, phone).then((data) => console.log(data));
      break;
    case "remove":
      removeContact(id).then((data) => console.log(data));
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(action, id, name, email, phone);
