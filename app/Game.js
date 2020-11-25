import { Deck } from "./Deck.js";
import { Table } from "./Table.JS";
import { Player } from "./Player.js";
import { Message } from "./Message.js";

class Game {
  constructor({
    player,
    playerPoints,
    dealerPoints,
    table,
    hitButton,
    standButton,
    messageBox,
  }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.messageBox = messageBox;
    this.player = player;
    this.dealer = new Player("krupier");
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener("click", (event) => this.hitCard());
    this.standButton.addEventListener("click", (event) => this.dealerPlays());
    // this.standButton.addEventListener("click", (event) => this.standButton());
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.playerPoints.innerHTML = this.player.calculatepoints();
    if (this.player.points > 21) {
      this.messageBox.setText("Wygrał Krupier").show();

      return;
    }
  }

  dealCards() {
    for (let n = 0; n < 2; n++) {
      let card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.table.showPlayersCard(card1);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealersCard(card2);
    }
    this.playerPoints.innerHTML = this.player.calculatepoints();
    this.dealerPoints.innerHTML = this.dealer.calculatepoints();
  }
  dealerPlays() {
    while (
      this.dealer.points <= this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealersCard(card);
      this.dealerPoints.innerHTML = this.dealer.calculatepoints();
    }

    this.endTheGame();
  }
  endTheGame() {
    this.hitButton.removeEventListener("click", (event) => this.hitCard());
    this.standButton.removeEventListener("click", (event) =>
      this.dealerPlays()
    );
    this.hitButton.style.display = "none";
    this.standButton.style.display = "none";

    if (this.player.points < 21 && this.player.points == this.dealer.points) {
      this.messageBox.setText("Remis").show();
      return;
    }

    if (this.dealer.points > 21) {
      this.messageBox.setText("Wygrał Gracz").show();
      return;
    }
    if (this.player.points < this.dealer.points) {
      this.messageBox.setText("Wygrał Krupier").show();
      return;
    }
  }
}

const table = new Table(
  document.getElementById("dealersCards"),
  document.getElementById("playersCards")
);

const player = new Player("Dominik");
const messageBox = new Message(document.getElementById("message"));

const game = new Game({
  hitButton: document.getElementById("hit"),
  standButton: document.getElementById("stand"),
  playerPoints: document.getElementById("playerPoints"),
  dealerPoints: document.getElementById("dealerPoints"),
  player,
  table,
  messageBox,
});

game.run();
