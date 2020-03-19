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
      playerDice: [null, null],
      monsterDice: [null, null],
      battleMessage: "Press Attack! to start",
      end: false,
      start: true,
      endBattleMessage: ""
    };

    this.resetState = () => {
      this.setState({
        playerHealth: 100,
        monsterHealth: 100,
        playerDice: [null, null],
        monsterDice: [null, null],
        battleMessage: "Press Attack! to start",
        end: false,
        start: true,
        endBattleMessage: ""
      });
    };

    this.rollDice = () => {
      return Math.floor(Math.random() * 6) + 1;
    };

    this.updateState = (winner, hit) => {
      winner === "monster"
        ? this.setState({
            playerHealth: this.state.playerHealth - hit
          })
        : this.setState({
            monsterHealth: this.state.monsterHealth - hit
          });
    };

    this.produceEndBattleMessage = () => {
      this.setState({ start: true });
      this.state.playerHealth <= 0
        ? this.setState({ endBattleMessage: "GAME OVER" })
        : this.setState({ endBattleMessage: "YOU WIN" });
    };

    this.produceMessage = (playerHit, monsterHit) => {
      if (this.state.playerHealth <= 0 || this.state.monsterHealth <= 0) {
        this.setState({ battleMessage: "", end: true });
        this.produceEndBattleMessage();
        return;
      } else if (monsterHit === playerHit) {
        this.setState({ battleMessage: "Draw" });
      } else if (monsterHit > playerHit) {
        this.updateState("monster", monsterHit - playerHit);
        this.setState({
          battleMessage: `Monster hit you by ${monsterHit - playerHit}`
        });
      } else {
        this.updateState("player", playerHit - monsterHit);
        this.setState({
          battleMessage: `You hit monster by ${playerHit - monsterHit}`
        });
      }
    };

    this.calculateHit = () => {
      this.setState({
        start: false,
        playerDice: [this.rollDice(), this.rollDice()],
        monsterDice: [this.rollDice(), this.rollDice()]
      });

      const monsterHit = this.state.monsterDice.reduce((a, b) => a + b);
      const playerHit = this.state.playerDice.reduce((a, b) => a + b);

      this.produceMessage(playerHit, monsterHit);
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
            {this.state.end ? (
              <>
                <div className="messages">
                  <p>{this.state.endBattleMessage}</p>
                </div>
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
                <div className="messages">
                  <p>{this.state.battleMessage}</p>
                </div>
                <button
                  className="button-attack"
                  type="button"
                  onClick={this.calculateHit}
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
