var dealerScore = 0;
var playerScore = 0;

var dealerAcesCount = 0;
var playerAcesCount = 0;
var gameOver = false;
var isAnimating = false;
var roundStarted = false;

var dealerWins = 0;
var dealerLosses = 0;
var playerWins = 0;
var playerLosses = 0;
var ties = 0;

var deck;
var dealerHiddenCards = [];

var DEAL_DELAY_MS = 500;
var FLIP_DURATION_MS = 600;

window.onload = function () {
    loadRank();
    bindButtons();
    resetToStartScreen();
};

function bindButtons() {
    document.getElementById("start-button").addEventListener("click", startRound);
    document.getElementById("hit-button").addEventListener("click", hit);
    document.getElementById("stand-button").addEventListener("click", stand);
    document.getElementById("restart-button").addEventListener("click", restart);
}

function resetToStartScreen() {
    dealerScore = 0;
    playerScore = 0;
    dealerAcesCount = 0;
    playerAcesCount = 0;
    gameOver = false;
    isAnimating = false;
    roundStarted = false;
    dealerHiddenCards = [];

    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("result").textContent = "Press START to deal";

    updateScores();
    setControlsState(false);
    document.getElementById("start-button").disabled = false;
}

function createDeck() {
    var suits = ["H", "D", "C", "S"];
    var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    deck = [];

    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]);
        }
    }
}

function shuffleDeck() {
    for (var i = 0; i < deck.length; i++) {
        var j = Math.floor(Math.random() * deck.length);
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function setControlsState(canPlay) {
    document.getElementById("hit-button").disabled = !canPlay;
    document.getElementById("stand-button").disabled = !canPlay;
}

async function startRound() {
    if (roundStarted || isAnimating) {
        return;
    }

    resetToStartScreen();
    roundStarted = true;
    isAnimating = true;

    document.getElementById("start-button").disabled = true;
    document.getElementById("result").textContent = "Dealing...";

    createDeck();
    shuffleDeck();

    await dealCard("dealer");
    await delay(DEAL_DELAY_MS);
    await dealCard("player");
    await delay(DEAL_DELAY_MS);
    await dealCard("dealer", true);
    await delay(DEAL_DELAY_MS);
    await dealCard("player");

    updateScores();
    isAnimating = false;

    if (reduceAce(playerScore, playerAcesCount) === 21) {
        await revealHiddenDealerCards();
        gameOver = true;
        recordRound("player");
        document.getElementById("result").textContent = "Blackjack! You win.";
        updateScores();
        return;
    }

    setControlsState(true);
    document.getElementById("result").textContent = "Your move";
}

async function dealCard(target, faceDown) {
    var shouldStayFaceDown = faceDown === true;
    var card = deck.pop();
    var container = target === "dealer"
        ? document.getElementById("dealer-cards")
        : document.getElementById("player-cards");

    var cardImg = document.createElement("img");
    cardImg.src = "assets/cards/BACK.png";
    cardImg.alt = target + " card";
    container.appendChild(cardImg);

    if (shouldStayFaceDown) {
        await delay(FLIP_DURATION_MS);
        dealerHiddenCards.push({
            element: cardImg,
            value: card
        });
    } else {
        cardImg.classList.add("flip-card");
        await delay(FLIP_DURATION_MS / 2);
        cardImg.src = "assets/cards/" + card + ".png";
        await delay(FLIP_DURATION_MS / 2);
    }

    if (target === "dealer") {
        dealerScore += getCardValue(card);
        dealerAcesCount += card.startsWith("A") ? 1 : 0;
    } else {
        playerScore += getCardValue(card);
        playerAcesCount += card.startsWith("A") ? 1 : 0;
    }

    updateScores();
}

async function revealHiddenDealerCards() {
    for (var i = 0; i < dealerHiddenCards.length; i++) {
        var hiddenCard = dealerHiddenCards[i];
        hiddenCard.element.classList.remove("flip-card");
        void hiddenCard.element.offsetWidth;
        hiddenCard.element.classList.add("flip-card");
        await delay(FLIP_DURATION_MS / 2);
        hiddenCard.element.src = "assets/cards/" + hiddenCard.value + ".png";
        await delay(FLIP_DURATION_MS / 2);
    }

    dealerHiddenCards = [];
}

async function hit() {
    if (!roundStarted || gameOver || isAnimating) {
        return;
    }

    isAnimating = true;
    setControlsState(false);

    await delay(DEAL_DELAY_MS);
    await dealCard("player");

    var adjustedPlayerScore = reduceAce(playerScore, playerAcesCount);

    if (adjustedPlayerScore > 21) {
        await revealHiddenDealerCards();
        gameOver = true;
        recordRound("dealer");
        document.getElementById("result").textContent = "You busted! Dealer wins.";
    } else if (adjustedPlayerScore === 21) {
        await revealHiddenDealerCards();
        gameOver = true;
        recordRound("player");
        document.getElementById("result").textContent = "21! You win.";
    } else {
        document.getElementById("result").textContent = "Your move";
    }

    updateScores();

    isAnimating = false;
    if (!gameOver) {
        setControlsState(true);
    }
}

async function stand() {
    if (!roundStarted || gameOver || isAnimating) {
        return;
    }

    isAnimating = true;
    setControlsState(false);

    await revealHiddenDealerCards();

    while (reduceAce(dealerScore, dealerAcesCount) < 17) {
        await delay(DEAL_DELAY_MS);
        await dealCard("dealer");
    }

    var finalDealerScore = reduceAce(dealerScore, dealerAcesCount);
    var finalPlayerScore = reduceAce(playerScore, playerAcesCount);

    var message = "";
    var winner = "tie";

    if (finalPlayerScore > 21) {
        message = "You busted! Dealer wins.";
        winner = "dealer";
    } else if (finalDealerScore > 21) {
        message = "Dealer busted! You win.";
        winner = "player";
    } else if (finalPlayerScore > finalDealerScore) {
        message = "You win!";
        winner = "player";
    } else if (finalPlayerScore < finalDealerScore) {
        message = "Dealer wins!";
        winner = "dealer";
    } else {
        message = "It's a tie!";
    }

    gameOver = true;
    recordRound(winner);
    updateScores();
    document.getElementById("result").textContent = message;

    isAnimating = false;
}

function restart() {
    resetToStartScreen();
}

function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function getCardValue(card) {
    var data = card.split("-");
    var value = data[0];

    if (isNaN(value)) {
        if (value === "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value, 10);
}

function reduceAce(score, acesCount) {
    while (score > 21 && acesCount > 0) {
        score -= 10;
        acesCount -= 1;
    }
    return score;
}

function updateScores() {
    if (gameOver) {
        document.getElementById("dealer-score").textContent = reduceAce(dealerScore, dealerAcesCount);
    } else {
        document.getElementById("dealer-score").textContent = "?";
    }
    document.getElementById("player-score").textContent = reduceAce(playerScore, playerAcesCount);
}

function loadRank() {
    dealerWins = parseInt(localStorage.getItem("dealerWins"), 10) || 0;
    dealerLosses = parseInt(localStorage.getItem("dealerLosses"), 10) || 0;
    playerWins = parseInt(localStorage.getItem("playerWins"), 10) || 0;
    playerLosses = parseInt(localStorage.getItem("playerLosses"), 10) || 0;
    ties = parseInt(localStorage.getItem("ties"), 10) || 0;
    updateRank();
}

function saveRank() {
    localStorage.setItem("dealerWins", dealerWins);
    localStorage.setItem("dealerLosses", dealerLosses);
    localStorage.setItem("playerWins", playerWins);
    localStorage.setItem("playerLosses", playerLosses);
    localStorage.setItem("ties", ties);
}

function recordRound(winner) {
    if (winner === "dealer") {
        dealerWins += 1;
        playerLosses += 1;
    } else if (winner === "player") {
        playerWins += 1;
        dealerLosses += 1;
    } else {
        ties += 1;
    }

    saveRank();
    updateRank();
}

function updateRank() {
    document.getElementById("dealer-rank").textContent = dealerWins + "-" + dealerLosses;
    document.getElementById("player-rank").textContent = playerWins + "-" + playerLosses;
    document.getElementById("tie-rank").textContent = ties;
}


