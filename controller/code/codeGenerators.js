function generateRandomMixTwelve() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let mix = '';
  
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      mix += characters.charAt(randomIndex);
    }
  
    return mix;
  }
  


  function generateRandomSixDigitNumber() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  
module.exports ={generateRandomMixTwelve,generateRandomSixDigitNumber}
  
