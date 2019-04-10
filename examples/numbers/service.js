export default {
  fetchRandomNumberFacts() {
    return fetch('http://numbersapi.com/random?json').then(response =>
      response.json()
    );
  },
};
