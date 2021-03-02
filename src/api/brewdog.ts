import axios from 'axios';

class BrewdogService {
  public fetchBeers() {
    return axios
      .get('https://api.punkapi.com/v2/beers')
      .then((response) => { return response.data })
  }
}
export default new BrewdogService();
