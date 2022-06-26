import axios from "axios";

const baseUrl = "https://deckofcardsapi.com/api/deck/";

export default class CardsApi {
  static async request(endpoint) {
    const url = baseUrl + endpoint;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getNewDeckId() {
    let res = await this.request("new/shuffle/?deck_count=6");
    return res.deck_id;
  }

  static async drawCards(deckId, count) {
    let res = await this.request(`${deckId}/draw/?count=${count}`);
    return res;
  }
}
