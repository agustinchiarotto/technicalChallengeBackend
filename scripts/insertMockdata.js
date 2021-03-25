const Contact = require('../src/models/contact');
const mockData = require('../testing/contact/mockData/contactData.json');
require('../database');

const insertMockContacts = async () => {
  console.log('inserting mock data...');
  const r = await Contact.insertMany(mockData);
  console.log(r);
  console.log('Job done!');
};

insertMockContacts();
