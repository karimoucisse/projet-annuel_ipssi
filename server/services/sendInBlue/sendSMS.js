const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendSMS = async (num, content) => {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalSMSApi();

    let sendTransacSms = new SibApiV3Sdk.SendTransacSms();
    const sender = 'ArchiCo';
    const recipient = num;
    sendTransacSms = {
        sender,
        recipient,
        content,
    };
    try {
        await apiInstance.sendTransacSms(sendTransacSms);
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendSMS;
