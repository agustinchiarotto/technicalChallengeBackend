const Contact = require('../models/contact');
const { validateEmail } = require('../utils/Validations');

const createContact = async ({
  name,
  company,
  profile_image,
  email,
  birtdate,
  phone_number,
  state,
  city,
  street,
  streetNumber,
}) => {
  let newContact = new Contact({
    name: name,
    company: company,
    profile_image: profile_image,
    email: email,
    birtdate: birtdate,
    phone_number: phone_number,
    address: {
      state: state,
      city: city,
      street: street,
      streetNumber: streetNumber,
    },
  });
  return newContact
    .save()
    .then((result) => result)
    .catch(() => {
      return { message: 'Email already exist' };
    });
};

const deleteContactById = async ({ _id }) => {
  try {
    const contactToUpdate = await getContactById({ _id });
    if (contactToUpdate) {
      return await contactToUpdate.remove();
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const getContactById = async ({ _id }) => {
  return await Contact.findOne({ _id }).catch((err) => err);
};

const getContacts = async () => await Contact.find();

const getByEmailOrPhoneNumber = async ({ email, phone_number }) => {
  let filter = {};
  if (email) {
    filter.email = email;
  }
  if (phone_number) {
    filter.phone_number = phone_number;
  }
  return await Contact.findOne(filter);
};

const getByStateOrCity = async ({ state, city, limit, skip }) => {
  let filter = {};
  if (state) {
    filter = { 'address.state': state };
  }
  if (city) {
    2;
    filter = { ...filter, 'address.city': city };
  }
  return await Contact.find(filter).skip(parseInt(skip)).limit(parseInt(limit));
};

const updateContact = async (
  {
    name,
    company,
    email,
    phone_number,
    profile_image,
    birtdate,
    state,
    city,
    street,
    streetNumber,
  },
  { _id },
) => {
  let contactFound = await Contact.findById({ _id });
  let result = { message: 'Server Error', status: 500 };
  if (contactFound) {
    contactFound.name = name ? name : contactFound.name;
    contactFound.company = company ? company : contactFound.company;
    contactFound.email = email ? email : contactFound.email;
    contactFound.phone_number = phone_number ? phone_number : contactFound.phone_number;
    contactFound.profile_image = profile_image ? profile_image : contactFound.profile_image;
    contactFound.birtdate = birtdate ? birtdate : contactFound.birtdate;
    contactFound.address.state = state ? state : contactFound.state;
    contactFound.address.city = city ? city : contactFound.city;
    contactFound.address.street = street ? street : contactFound.street;
    contactFound.address.streetNumber = streetNumber ? streetNumber : contactFound.streetNumber;

    result = await contactFound.save();
  } else {
    result = { message: 'Contact not found', status: 404 };
  }
  return result;
};

// Validations

const validateAddressParams = (req, res, next) => {
  if (req.query.state || req.query.city) {
    next();
  } else {
    res.status(400).json({
      title: 'Error!',
      message: `Bad Request. No parameters to search.`,
    });
  }
};

const validateCreateBody = (req, res, next) => {
  let errorMsg = null;
  if (!req.body.name) {
    errorMsg = `Bad Request, name parameter is missing.`;
  } else if (!req.body.company) {
    errorMsg = `Bad Request, company parameter is missing.`;
  } else if (!req.body.email) {
    errorMsg = `Bad Request, email parameter is missing.`;
  } else if (!validateEmail(req.body.email)) {
    errorMsg = `Bad Request, email is not valid.`;
  } else if (!req.body.birtdate) {
    errorMsg = `Bad Request, birtdate parameter is missing.`;
  } else if (!req.body.phone_number) {
    errorMsg = `Bad Request, phone_number parameter is missing.`;
  } else if (!req.body.state) {
    errorMsg = `Bad Request, state parameter is missing.`;
  } else if (!req.body.city) {
    errorMsg = `Bad Request, city parameter is missing.`;
  } else if (!req.body.streetNumber) {
    errorMsg = `Bad Request, streetNumber parameter is missing.`;
  } else if (!req.body.street) {
    errorMsg = `Bad Request, street parameter is missing.`;
  }
  if (!errorMsg) {
    next();
  } else {
    res.status(400).json({ title: 'Error creating new contact', errorMsg });
  }
};

const validateSearchParams = (req, res, next) => {
  if (req.query.email || req.query.phone_number) {
    next();
  } else {
    res.status(400).json({
      title: 'Error!',
      message: `Bad Request. No parameters to search.`,
    });
  }
};

const validateUpdateBody = (req, res, next) => {
  if (req.body && req.params._id) {
    next();
  } else {
    res.status(400).json({
      title: 'Error!',
      message: `Bad Request. No parameters to update.`,
    });
  }
};

// EXPORT
module.exports = {
  createContact,
  deleteContactById,
  getByEmailOrPhoneNumber,
  getByStateOrCity,
  getContactById,

  getContacts,

  validateAddressParams,
  validateCreateBody,
  validateSearchParams,
  validateUpdateBody,
  updateContact,
};
