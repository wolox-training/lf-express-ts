const axios = require("axios").default;

const options = {
    url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info',
    headers: {
      'X-RapidAPI-Key': '56fbec8327mshc863bda4f0a33dbp192619jsnbc36e96348ef',
      'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    }
  };

export async function Cards() {
  try {
  const response = await axios.request(options);
  console.log(response.data)
  return response.data;
  } catch (error) {
    console.error(error)
  }
}

export default {
  Cards
};