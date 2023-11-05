const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();

const sendEmail = async (email, emailContent) => {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
        email: process.env.ADMIN_EMAIL,
        name: 'ArchiConnect',
    };
    const receivers = [
        {
            email,
        },
    ];
    try {
        await apiInstance.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Test Email',
            textContent: 'Test Email',
            htmlContent: emailContent,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendEmail;
