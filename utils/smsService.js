const sendSMS = async (to, message) => {
    // This is a simulated SMS service
    console.log(`Sending SMS to ${to}: ${message}`);
    // In a real-world scenario, you would integrate with an SMS service provider
  };
  
  module.exports = sendSMS;