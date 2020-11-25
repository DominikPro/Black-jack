// koniec na tworzeniu stołu lekcja 78

export class Table {
  constructor(dealersCards, playersCards) {
    this.dealersCards = dealersCards;
    this.playerCards = playersCards;
  }
  showPlayersCard(card) {
    this.playerCards.appendChild(card.render());
  }
  showDealersCard(card) {
    this.dealersCards.appendChild(card.render());
  }
}
