# 🃏 Blackjack Game

## 📌 Overview

Today I built a simple Blackjack game by following a YouTube tutorial. The project helped reinforce core programming concepts while implementing a playable version of the classic card game.

## 🎯 What I Learned

* Using **for loops** to iterate through card suits and values
* Creating a full deck of cards programmatically
* Randomizing (shuffling) the deck
* Removing cards from an array once they are drawn
* Implementing **game logic and win conditions**
* Handling **special card rules (Ace logic)**

## 🛠️ Features

* Full deck of cards with **image assets for each card**
* Random card selection (simulating a shuffled deck)
* Cards are removed after being drawn
* Basic win/lose logic based on Blackjack rules
* **Ace value handling (1 or 11 depending on the hand)**

## 🧠 Game Logic

* If the player’s total is **greater than 21**, they lose
* If the player’s total is **less than or equal to 21**:

  * Compare against the dealer’s total
  * Higher value → **win**
  * Lower value → **lose**

### 🂡 Ace Handling

* Aces can count as **11 or 1**
* Default value is **11**
* If the total goes over 21:

  * Reduce the total by **10** (turning Ace from 11 → 1)
* Ensured this adjustment only happens **once per Ace**, preventing repeated subtraction

## ⚠️ Challenges

* Figuring out the **winning conditions**
* Translating real Blackjack rules into code
* Implementing **Ace logic correctly**

  * Especially preventing the score from subtracting 10 multiple times for the same Ace

## 🚀 Future Improvements

* Implement proper **dealer rules** (hit until 17)
* Add **multiple Aces edge case handling** (if not already fully covered)
* Build a **UI for better gameplay**
* Add **betting system and player balance**

## 📚 Resources

* YouTube tutorial (used as a guide)

