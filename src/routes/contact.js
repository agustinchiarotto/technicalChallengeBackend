const express = require('express');
const app = express.Router();

const contactController = require('../controllers/contact');

app.get('/:_id', async (req, res) => {
  console.log('get by id');
  const contact = await contactController.getContactById(req.params);
  return handleSearchResult(contact, res);
});

app.get('/search/waysofcontact', contactController.validateSearchParams, async (req, res) => {
  const contact = await contactController.getByEmailOrPhoneNumber(req.query);
  return handleSearchResult(contact, res);
});

app.get('/search/address', contactController.validateAddressParams, async (req, res) => {
  const contact = await contactController.getByStateOrCity(req.query);
  return handleSearchResult(contact, res);
});

app.delete('/:_id', async (req, res) => {
  const result = await contactController.deleteContactById(req.params);
  if (result) {
    return res.status(200).json({
      title: 'Success',
      message: 'Contact deleted',
    });
  } else {
    return res.status(404).json({
      title: 'Error on deleating a contact!',
      message: 'Contact not found',
    });
  }
});

app.post('/', contactController.validateCreateBody, async (req, res) => {
  const result = await contactController.createContact(req.body);
  if (!result.error) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      title: 'Error on creating a new contact!',
      message: result.error,
    });
  }
});

app.patch('/:_id', contactController.validateUpdateBody, async (req, res) => {
  const result = await contactController.updateContact(req.body, req.params);
  if (!result.message) {
    return res.status(200).json(result);
  } else {
    return res.status(result.status).json({
      title: 'Error on update!',
      message: result.message,
    });
  }
});

const handleSearchResult = (result, res) => {
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(500).json({
    title: 'Error searching on contacts',
    message: 'Server Error',
  });
};

module.exports = app;
