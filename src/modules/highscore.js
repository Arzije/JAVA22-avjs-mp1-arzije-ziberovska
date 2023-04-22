async function getPlayersAndScore() {
  const firebaseUrl = `https://mp1-test-caf8c-default-rtdb.europe-west1.firebasedatabase.app/.json`;
  const response = await fetch(firebaseUrl);
  const data = await response.json();
  return Object.values(data);
}

function displayPlayersAndScore(data) {
  const playerCard = document.querySelector('.playerCard');
  playerCard.innerHTML = '';

  data.forEach((entry) => { 
    const card = document.createElement('div');
    card.classList.add('card');
    playerCard.append(card);

    const name = document.createElement('h2');
    name.innerText = `Player: ${entry.a.name}`;
    card.append(name);

    const showScore = document.createElement('p');
    showScore.innerText = `Score: ${entry.b.score}`;
    card.append(showScore);
  });
}

getPlayersAndScore().then(displayPlayersAndScore);

async function addNewPlayerAndScore(player, score) {
  const firebaseUrl = `https://mp1-test-caf8c-default-rtdb.europe-west1.firebasedatabase.app/.json`;

  const data = await getPlayersAndScore();

  const existingplayerIndex = data.findIndex(entry => entry.a.name === player);

  if (existingplayerIndex !== -1) {
    if (score > data[existingplayerIndex].b.score) {
      data[existingplayerIndex].b.score = score;
    }
  } else {
    const newplayer = {
      a: { name: player },
      b: { score: score },
    };
    data.push(newplayer);
  }

  data.sort((a, b) => b.b.score - a.b.score);

  data.length = Math.min(data.length, 5);

  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  const response = await fetch(firebaseUrl, options);
  const responseData = await response.json();
  return responseData;
}

export { getPlayersAndScore, displayPlayersAndScore, addNewPlayerAndScore };