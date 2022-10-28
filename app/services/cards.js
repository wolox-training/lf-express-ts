const axios = require("axios").default;

const options = {
    url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info',
    headers: {
      'X-RapidAPI-Key': '56fbec8327mshc863bda4f0a33dbp192619jsnbc36e96348ef',
      'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    }
  };

exports.getCards = async () => await axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});