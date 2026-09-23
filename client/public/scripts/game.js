const renderGame = async () => {
  const requestedID = Number(window.location.pathname.split('/').pop());
  const message = document.getElementById('message');

  try {
    const response = await fetch('/games');
    const data = await response.json();
    const game = data.find(game => game.id === requestedID);

    if (game) {
      document.getElementById('image').src = game.image;
      document.getElementById('image').alt = game.name + ' cover';
      document.getElementById('name').textContent = game.name;
      document.getElementById('category').textContent = game.category;
      document.getElementById('description').textContent = game.description;
      document.getElementById('players').textContent = 'Players: ' + game.players;
      document.getElementById('playTime').textContent = 'Play time: ' + game.playTime;
      document.getElementById('price').textContent = 'Price: ' + game.price;
      document.getElementById('submittedBy').textContent = 'Submitted by: ' + game.submittedBy;
      document.getElementById('gameId').textContent = 'Game ID: ' + game.id;
      document.getElementById('image-link').href = game.image;
      document.getElementById('game-content').hidden = false;
      message.textContent = '';
      document.title = game.name + ' — Game Night Shelf';
    } else {
      message.textContent = 'No game available.';
    }
  } catch (error) {
    message.textContent = 'Unable to load this game. Please refresh to try again.';
  }
};

renderGame();
