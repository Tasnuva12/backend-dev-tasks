// contacts.js
const fs = require("fs");
const path = require("path");

const CONTACTS_FILE = "contacts.json";

// Initialize contacts file if it doesn't exist
function initializeFile() {
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2));
  }
}

// Read all contacts from file
function readContacts() {
  initializeFile();
  const data = fs.readFileSync(CONTACTS_FILE, "utf-8");
  return JSON.parse(data);
}

// Write contacts to file
function writeContacts(contacts) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

// Get command from CLI args
const args = process.argv.slice(2);
const command = args[0];

if (command === "add") {
  // Add a new contact
  if (args.length < 4) {
    console.error("❌ Error: add requires 3 arguments (name, email, phone)");
    console.log(
      'Usage: node contacts.js add "Name" "email@example.com" "01711-123456"',
    );
    process.exit(1);
  }

  const name = args[1];
  const email = args[2];
  const phone = args[3];

  const contacts = readContacts();

  // Check if contact already exists
  if (contacts.find((c) => c.name === name)) {
    console.error(`Error: Contact "${name}" already exists`);
    process.exit(1);
  }

  // Add new contact
  contacts.push({ name, email, phone });
  writeContacts(contacts);
  console.log(`✅ Contact "${name}" added successfully`);
} else if (command === "list") {
  // List all contacts
  const contacts = readContacts();

  if (contacts.length === 0) {
    console.log("📋 No contacts found");
    return;
  }

  console.log("\n📋 Contacts List:");
  console.log("═".repeat(70));
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name}`);
    console.log(`   Email: ${contact.email}`);
    console.log(`   Phone: ${contact.phone}`);
  });
  console.log("═".repeat(70) + "\n");
} else if (command === "get") {
  // Get specific contact
  if (args.length < 2) {
    console.error("❌ Error: get requires a name");
    console.log('Usage: node contacts.js get "ContactName"');
    process.exit(1);
  }

  const name = args[1];
  const contacts = readContacts();
  const contact = contacts.find((c) => c.name === name);

  if (!contact) {
    console.error(`❌ Error: Contact "${name}" not found`);
    process.exit(1);
  }

  console.log("\n📇 Contact Details:");
  console.log("═".repeat(50));
  console.log(`Name: ${contact.name}`);
  console.log(`Email: ${contact.email}`);
  console.log(`Phone: ${contact.phone}`);
  console.log("═".repeat(50) + "\n");
} else {
  console.error("❌ Unknown command:", command);
  console.log("Available commands: add, list, get");
  process.exit(1);
}
