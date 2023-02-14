// controller.js
// const axios = require('axios');

const contactModel = require("../model/contactController");
const ObjectId = require("mongoose").Types.ObjectId;
const createContact = async (req, res) => {
  try {
    let data = req.body;
    // ==================Body have empty field==================================================
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({ Error: "Body  should be not empty" });
    }

    // =========================Destructuring===================================================
    let { first_name, last_name, email, mobile_number } = data;

    // =======================First name is not present==========================================================
    if (!first_name)
      return res
        .status(400)
        .send({ status: false, message: "First Name is required" });

    // ============================Validation of name using regex===================================================
    if (!/^[a-zA-z]+$/.test(first_name))
      return res
        .status(400)
        .send({ status: false, msg: "Please Use Correct Characters in name" });

    // =========================Last name is not present==========================================================
    if (!last_name)
      return res
        .status(400)
        .send({ status: false, message: "Last Name is required" });

    // ========================Validation for last name ===========================================================
    if (!/^[a-zA-z]+$/.test(last_name))
      return res
        .status(400)
        .send({ status: false, msg: "Please Use Correct Characters in name" });

    // =========================Email not present=====================================================================
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Email id is required" });

    // ===========================Validation for Email=============================================================
    if (!/^[a-z0-9_]{1,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/.test(email))
      return res
        .status(400)
        .send({ status: false, message: "Email is invalid" });

    // ============================Duplicate email not allow=======================================================
    let duplicateEmail = await contactModel.findOne({ email: email });
    if (duplicateEmail)
      return res
        .status(400)
        .send({ status: false, message: "Email Already exist" });

    // ==============================mobile_number Number not present=========================================================
    if (!mobile_number)
      return res
        .status(400)
        .send({ status: false, message: "mobile_number Number is required" });

    // ==============================mobile_number number pattern==========================================================
    if (!/^[\s]*[6-9]\d{9}[\s]*$/gi.test(mobile_number))
      return res
        .status(404)
        .send({ status: false, message: "mobile_number number contain 10 digit" });

    // ==================================Duplicate mobile_number number not allowed=================================================
    let duplicatemobile_number = await contactModel.findOne({ mobile_number: mobile_number });
    if (duplicatemobile_number)
      return res
        .status(400)
        .send({ status: false, message: "mobile_number number already exist" });

    // =======================DB Call===========================================================================
    let result = await contactModel.create(data);
    return res.status(200).send({ status: true, data: result });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    let id = req.params.id;
    // ====================================ID not present in param================================================
    if (!id)
      return res
        .status(400)
        .send({ status: false, message: "id is not present in param" });
    // ====================================ID is not valid===============================================================
    if (!ObjectId.isValid(id)) {
      return res
        .status(404)
        .send({ status: false, msg: "Contact id is invalid!" });
    }

    let result = await contactModel.findById({ _id: id });
    // ===============================ID not present in DB==========================================================
    if (!result)
      return res
        .status(400)
        .send({ status: false, message: "Id not present in db " });
    return res.status(200).send({ status: true, data: result });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const contactUpdate = async (req, res) => {
  try {
    let id = req.params.id;

    // =================================ID not present===========================================================
    if (!id)
      return res
        .status(400)
        .send({ status: false, message: "id is not present in param" });
    // =================================ID not valid==============================================================
    if (!ObjectId.isValid(id)) {
      return res
        .status(404)
        .send({ status: false, msg: "Contact id is invalid!" });
    }
    let data = req.body;
    // ===============================Field should not be empty====================================================
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ Error: "Body  should be not empty" });
    }
    let { email, mobile_number } = data;

    let contactId = await contactModel.findById(id);
    // ====================================ID not present=========================================================
    if (!contactId)
      return res
        .status(400)
        .send({ status: false, message: "id not present in db" });
    // ====================================ID is deleted=========================================================
    if (contactId.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, msg: " This contact already Deleted !!" });
    }
    // =====================================DB call================================================================
    let result = await contactModel.findOneAndUpdate(
      { _id: id },
      { $set: { mobile_number: mobile_number, email: email } },
      { new: true }
    );
    res
      .status(200)
      .send({ status: true, message: "Success updated contact", data: result });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
const deleted = async function (req, res) {
  try {
    let contactId = req.params.id;

    // =================================ID not present===========================================================
    if (!contactId)
      return res
        .status(400)
        .send({ status: false, message: "id is not present in param" });
    // =================================ID not valid==============================================================
    if (!ObjectId.isValid(contactId)) {
      return res
        .status(404)
        .send({ status: false, msg: "Contact id is invalid!" });
    }
    let contact = await contactModel.findById(contactId);
    // ===============================ID not present in db==========================================================
    if (!contact)
      return res
        .status(400)
        .send({ status: false, message: "id not present in db" });

    // ===============================ID already deleted==========================================================
    if (contact.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, msg: "this contact is already deleted" });
    }
    if (contact.isDeleted == false) {
      let deletetion = await contactModel.findByIdAndUpdate(
        { _id: contactId },
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true }
      );
      return res.status(200).send({
        status: true,
        msg: "contact is deleted successfully",
        data: deletetion,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports = { createContact, getContactById, deleted, contactUpdate };
