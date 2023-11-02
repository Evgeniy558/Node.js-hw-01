const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action [string]", "choose action", "list")
  .option("-i, --id [string]", "user id", "A0qFklw8pf5umurxmshgo")
  .option("-n, --name [string]", "user name", "testname12")
  .option("-e, --email [string]", "user email", "testemail1")
  .option("-p, --phone [string]", "user phone", "testphone1");

const { action, id, name, email, phone } = program.parse(process.argv).opts();
console.log(action, id, name, email, phone);

function invokeAction(action, id, name, email, phone) {
  switch (action) {
    case "list":
      contacts.listContacts().then((data) => console.table(data));
      break;
    case "get":
      contacts.getContactsById(id).then((data) => {
        console.log(data);
      });
      break;
    case "add":
      contacts.addContact(name, email, phone).then((data) => console.log(data));
      break;
    case "remove":
      contacts.removeContact(id).then((data) => console.log(data));
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(action, id, name, email, phone);
