const express  = require('express')

const axios =  require ('axios')

const {json} = require('express')

const apiKey = 'iO5p2dRdgsBwN83vS2iqoQ'

const baseurl = 'https://chanchal-545588451386067291.myfreshworks.com/crm/sales/api/contacts'

const createCrmContact = async(req,res)=>{
    const {first_name,last_name,email,mobile_number} = req.body
    try{
        const response = await axios.post(
            baseurl,
            {
                first_name,
                last_name,
                email,
                mobile_number
            },
            {
                headers:{
                    Authorization: `Token token=${apiKey}`
                },
            }
        )
        res.json(response.data)
    }
    catch(error){
        res.status(500).json({message:'Error creating contact in Freshsales CRM'})
    }
}

const getCRMContact=async (req,res)=>{
    try {
        const data = req.body
        console.log(req.body)
        const { contact_id } = data

        let getData = await axios.get(
            `https://chanchal-545588451386067291.myfreshworks.com/crm/sales/api/contacts/${contact_id}`,

            {
                headers: {
                    Authorization: `Token token=${apiKey}`,
                },
            }
        )
        res.json(getData.data)
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}



const updateCRMContact = async (req,res) =>{
    try {
        const data = req.body
        console.log(req.body)
        const { contact_id , new_email,new_mobile_number} = data
        
        let getData = await axios.put(
            `https://chanchal-545588451386067291.myfreshworks.com/crm/sales/api/contacts/${contact_id}`,
            {
                email:new_email ,
                mobile_number: new_mobile_number
            },

            {
                headers: {
                    Authorization: `Token token=${apiKey}`,
                },
            }
        )
        res.json(getData.data)
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}
const deleteCRMContact = async (req,res) =>{
    try {
        const data = req.body
        console.log(req.body)
        const { contact_id } = data
        
        let getData = await axios.delete(
            `https://chanchal-545588451386067291.myfreshworks.com/crm/sales/api/contacts/${contact_id}`,
            {
                headers: {
                    Authorization: `Token token=${apiKey}`,
                },
            }
        )
        res.json(getData.data)
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}
module.exports = {createCrmContact,getCRMContact ,updateCRMContact ,deleteCRMContact}