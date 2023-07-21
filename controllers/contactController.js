const Contact = require("../models/contactModel")
const { constants } = require("../constants/statusCodeConstant")


//@desc Get All Contacts
//@route GET /api/contacts
// access public
const getContact = async (req, res) => {
    const contacts = await Contact.find();
    res.status(constants.SUCCESSFUL_RES).json({
        data: contacts
    })
}

//@desc Create Contacts
//@route POST /api/contacts
// access public
const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body
        if (!name || !email || !phone) {
            return res.status(constants.VALIDATION_ERROR).json({
                message: "All Fields are Mandatory!!"
            })
        }
        const contact = await Contact.create({
            name,
            email,
            phone
        })
        res.status(constants.CREATED).json({
            message: "Contact Created Successfully!!",
            data: contact
        })

    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })
    }

}

//@desc Get Contacts by Id
//@route GET /api/contacts/:id
// access public
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(constants.NOT_FOUND).json({ message: "Contact Not Found!!" });
        }
        res.status(constants.SUCCESSFUL_RES).json({
            data: contact
        });
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })
    }
};
//@desc Update Contact
//@route PUT /api/contacts/:id
// access public
const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedContact) {
            return res.status(constants.NOT_FOUND).json({ message: "Contact Not Found!!" });
        }
        res.status(constants.SUCCESSFUL_RES).json({
            message: "Contact Updated Successfully!!",
            data: updatedContact,
        })
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })

    }
}

//@desc Delete Contact
//@route DELETE /api/contacts/:id
// access public
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        if (!contact) {
            return res.status(constants.NOT_FOUND).json({ message: "Contact Not Found!!" });
        }
        res.status(constants.SUCCESSFUL_RES).json({ message: "Contact Deleted Successfully!!" })
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })
    }
}

module.exports = {
    getContact,
    createContact,
    getContactById,
    updateContact,
    deleteContact
}