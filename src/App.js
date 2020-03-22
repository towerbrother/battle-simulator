import React from "react";
import Players from "./components/Players/Players";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerIcon: "fa fa-male",
      monsterIcon: "fa fa-optin-monster",
      playerHealth: 100,
      monsterHealth: 100,
      playerHit: null,
      monsterHit: null,
      playerDice: [null, null],
      monsterDice: [null, null],
      message: "Press Attack! to start",
      start: true,
      end: false
    };

    this.resetState = () => {
      this.setState({
        playerHealth: 100,
        monsterHealth: 100,
        playerHit: null,
        monsterHit: null,
        playerDice: [null, null],
        monsterDice: [null, null],
        message: "Press Attack! to start",
        start: true,
        end: false
      });
    };

    this.randomDice = () => {
      return Math.floor(Math.random() * 6) + 1;
    };

    this.updateMessage = (
      playerHit,
      monsterHit,
      playerHealth,
      monsterHealth
    ) => {
      if (playerHealth <= 0 || monsterHealth <= 0) {
        playerHealth <= 0
          ? this.setState({ end: true, message: "GAME OVER" })
          : this.setState({ end: true, message: "YOU WIN" });
      } else {
        monsterHit > playerHit
          ? this.setState({
              message: `Monster hit you by ${monsterHit - playerHit}`
            })
          : monsterHit < playerHit
          ? this.setState({
              message: `You hit monster by ${playerHit - monsterHit}`
            })
          : this.setState({ message: "Draw" });
      }
    };

    this.updateHealth = (playerHit, monsterHit) => {
      monsterHit >= playerHit
        ? this.setState({
            playerHealth: this.state.playerHealth - (monsterHit - playerHit)
          })
        : this.setState({
            monsterHealth: this.state.monsterHealth - (playerHit - monsterHit)
          });
      const playerHealth = this.state.playerHealth - (monsterHit - playerHit);
      const monsterHealth = this.state.monsterHealth - (playerHit - monsterHit);

      this.updateMessage(playerHit, monsterHit, playerHealth, monsterHealth);
    };

    this.calculateHit = (dicePlayer, diceMonster) => {
      const playerHit = dicePlayer.reduce((a, b) => a + b);
      const monsterHit = diceMonster.reduce((a, b) => a + b);
      this.setState({
        playerHit: playerHit,
        monsterHit: monsterHit
      });
      this.updateHealth(playerHit, monsterHit);
    };

    this.rollDice = () => {
      const rollDicePlayer = [this.randomDice(), this.randomDice()];
      const rollDiceMonster = [this.randomDice(), this.randomDice()];
      this.setState({
        start: false,
        playerDice: rollDicePlayer,
        monsterDice: rollDiceMonster
      });
      this.calculateHit(rollDicePlayer, rollDiceMonster);
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Battle Simulator</h1>
        <div className="players-field">
          <Players
            name="player"
            icon={this.state.playerIcon}
            health={this.state.playerHealth}
            dice={this.state.playerDice}
            start={this.state.start}
          />
          <div className="battle-container">
            <div className="message">
              <p>{this.state.message}</p>
            </div>
            {this.state.end ? (
              <>
                <button
                  className="button-reset"
                  type="button"
                  onClick={this.resetState}
                >
                  Restart
                </button>
              </>
            ) : (
              <>
                <button
                  className="button-attack"
                  type="button"
                  onClick={this.rollDice}
                >
                  Attack!
                </button>
              </>
            )}
          </div>
          <Players
            name="monster"
            icon={this.state.monsterIcon}
            health={this.state.monsterHealth}
            dice={this.state.monsterDice}
            start={this.state.start}
          />
        </div>
      </div>
    );
  }
}

export default App;
