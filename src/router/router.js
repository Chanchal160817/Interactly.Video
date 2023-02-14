const express = require("express");
const router = express.Router();
// =====================================Import controller==================================================================
const {
  createContact,
  getContactById,
  deleted,
  contactUpdate,
} = require("../controller/contactController");

const {createCrmContact,getCRMContact ,updateCRMContact,deleteCRMContact} = require('../controller/crm')
// // Define routes for contacts
// ==============Create contact=========================================================================================
router.post("/api/contacts", createContact);
// ===================Get contact by ID================================================================================
router.get("/contacts/:id", getContactById);
// ===========================Delete contact by id========================================================================
router.delete("/contacts/:id", deleted);
// ===========================Update contact by id=======================================================================
router.put("/contacts/:id", contactUpdate);


// ================crm=======================
router.post('/createContact',createCrmContact )
router.get('/getContact',getCRMContact )
router.put('/updateContact',updateCRMContact )
router.delete('/deleteContact',deleteCRMContact )


module.exports = router;
