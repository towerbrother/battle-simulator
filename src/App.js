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

    this.updateMessage = () => {
      if (this.state.playerHealth <= 0 || this.state.monsterHealth <= 0) {
        this.state.playerHealth <= 0
          ? this.setState({ end: true, message: "GAME OVER" })
          : this.setState({ end: true, message: "YOU WIN" });
      } else {
        this.state.monsterHit > this.state.playerHit
          ? this.setState({
              message: `Monster hit you by ${this.state.monsterHit -
                this.state.playerHit}`
            })
          : this.state.monsterHit < this.state.playerHit
          ? this.setState({
              message: `You hit monster by ${this.state.playerHit -
                this.state.monsterHit}`
            })
          : this.setState({ message: "Draw" });
      }
    };

    this.updateHealth = () => {
      this.state.monsterHit >= this.state.playerHit
        ? this.setState({
            playerHealth:
              this.state.playerHealth -
              (this.state.monsterHit - this.state.playerHit)
          })
        : this.setState({
            monsterHealth:
              this.state.monsterHealth -
              (this.state.playerHit - this.state.monsterHit)
          });
      this.updateMessage();
    };

    this.calculateHit = () => {
      this.setState({
        playerHit: this.state.playerDice.reduce((a, b) => a + b),
        monsterHit: this.state.monsterDice.reduce((a, b) => a + b)
      });
      this.updateHealth();
    };

    this.rollDice = () => {
      this.setState({
        start: false,
        playerDice: [this.randomDice(), this.randomDice()],
        monsterDice: [this.randomDice(), this.randomDice()]
      });
      this.calculateHit();
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
