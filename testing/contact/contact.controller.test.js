const Contact = require('../../src/models/contact');
const ContactController = require('../../src/controllers/contact');
const DBManager = require('./dbManager');
const dbman = new DBManager();
const mockContacts = require('./mockData/contactData.json');
const mongoose = require('mongoose');

const wrongId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
const nobySainsbury = {
  name: 'Noby Sainsbury-Brown',
  email: 'nsainsburybrown0@dmoz.org',
  company: 'Skyba',
  profile_image: 'http://dummyimage.com/184x225.jpg/5fa2dd/ffffff',
  birtdate: '10/20/1995',
  phone_number: '808-692-6241',
  address: {
    state: 'Hawaii',
    city: 'Honolulu',
    street: 'Erie',
    number: '3265',
  },
};
const bettineCouvette = {
  name: 'Bettine Couvette',
  company: 'Aimbo',
  profile_image: 'http://dummyimage.com/196x187.bmp/ff4444/ffffff',
  birtdate: '4/2/1988',
  phone_number: '502-367-4360',
  address: {
    state: 'Kentucky',
    city: 'Frankfort',
    street: 'Welch',
    number: '85500',
  },
};

beforeAll(async () => {
  await dbman.start();
});

afterAll(async () => {
  await dbman.stop();
});

describe('Post contact - /contact', () => {
  it('should post a contact correctly', async () => {
    await insertMockContacts();
    const result = await ContactController.createContact(nobySainsbury);
    expect(result.name).toBe(nobySainsbury.name);
  });

  it('should return an error on posting a contact (duplicated email)', async () => {
    const result = await ContactController.createContact(nobySainsbury);
    expect(result.message).toBe('Email already exist');
  });
});

describe('Get contact - /contact/{_id}', () => {
  it('should get a contact from id', async () => {
    const auxContact = await ContactController.getByEmailOrPhoneNumber({
      email: 'nsainsburybrown0@dmoz.org',
    });
    const contact = await ContactController.getContactById({ _id: auxContact._id });
    expect(contact._id).toStrictEqual(auxContact._id);
  });

  it('should return null on searching a contact by id (id not exist on db)', async () => {
    const contact = await ContactController.getContactById({ _id: wrongId });
    expect(contact).toBe(null);
  });
});

describe('Patch contact - /contact/{_id}', () => {
  it('should update a contact correctly', async () => {
    const auxContact = await ContactController.getByEmailOrPhoneNumber({
      email: 'nsainsburybrown0@dmoz.org',
    });
    const contactUpdate = await ContactController.updateContact(bettineCouvette, {
      _id: auxContact._id,
    });
    expect(contactUpdate.name).toBe('Bettine Couvette');
  });

  it('should return an error updating a contact (id not exist in db)', async () => {
    const result = await ContactController.updateContact(bettineCouvette, { _id: wrongId });
    expect(result).toStrictEqual({ message: 'Contact not found', status: 404 });
  });
});

describe('Get contact - /contact/search/address', () => {
  it('should get a list of contacts with a certain state', async () => {
    const contacts = await ContactController.getByStateOrCity({ state: 'California' });
    expect(contacts.length).toBe(12);
  });
  it('should get a list of contacts with a certain city', async () => {
    const contacts = await ContactController.getByStateOrCity({ city: 'San Francisco' });
    expect(contacts.length).toBe(2);
  });
  it('should get a list of contacts with a certain state and city', async () => {
    const contacts = await ContactController.getByStateOrCity({
      state: 'California',
      city: 'San Francisco',
    });
    expect(contacts.length).toBe(2);
  });
  it('should get a list of contacts with a certain state using pagination with skip', async () => {
    const contacts = await ContactController.getByStateOrCity({ state: 'California', skip: '5' });
    expect(contacts.length).toBe(7);
  });
  it('should get a list of contacts with a certain state using pagination with skip and limit', async () => {
    const contacts = await ContactController.getByStateOrCity({
      state: 'California',
      skip: '5',
      limit: '5',
    });
    expect(contacts.length).toBe(5);
  });
});

describe('Get contacts - /contact/search/waysofcontact', () => {
  it('should get a contact from email', async () => {
    const contact = await ContactController.getByEmailOrPhoneNumber({
      email: 'nsainsburybrown0@dmoz.org',
    });
    expect(contact.email).toBe('nsainsburybrown0@dmoz.org');
  });

  it('should get a contact from phone_number', async () => {
    const contact = await ContactController.getByEmailOrPhoneNumber({
      phone_number: '502-367-4360',
    });
    expect(contact.phone_number).toBe('502-367-4360');
  });

  it('should get a contact from phone_number & email', async () => {
    const contact = await ContactController.getByEmailOrPhoneNumber({
      phone_number: '502-367-4360',
      email: 'nsainsburybrown0@dmoz.org',
    });
    expect(contact.phone_number).toBe('502-367-4360');
  });
});

describe('Delete contact - /contact/{_id}', () => {
  it('should delete a contact from id', async () => {
    const auxContact = await ContactController.getByEmailOrPhoneNumber({
      email: 'nsainsburybrown0@dmoz.org',
    });
    const result = await ContactController.deleteContactById({ _id: auxContact._id });
    expect(result._id).toStrictEqual(auxContact._id);
  });

  it('should return null on deleting a contact by id (id not exist on db)', async () => {
    const result = await ContactController.getContactById({ _id: wrongId });
    expect(result).toBe(null);
  });
});

async function insertMockContacts() {
  await Contact.insertMany(mockContacts);
}
