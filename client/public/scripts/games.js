const renderGames = async () => {
  const message = document.getElementById('message');

  try {
    const response = await fetch('/games');
    const data = await response.json();
    const mainContent = document.getElementById('main-content');

    if (data.length > 0) {
      message.textContent = '';

      for (const game of data) {
        const card = document.createElement('article');
        card.className = 'game-card';

        const image = document.createElement('img');
        image.src = game.image;
        image.alt = game.name + ' cover';
        card.appendChild(image);

        const details = document.createElement('div');
        details.className = 'card-details';

        const category = document.createElement('p');
        category.className = 'eyebrow';
        category.textContent = game.category;
        details.appendChild(category);

        const name = document.createElement('h3');
        name.textContent = game.name;
        details.appendChild(name);

        const players = document.createElement('p');
        players.textContent = game.players;
        details.appendChild(players);

        const time = document.createElement('p');
        time.textContent = 'Play time: ' + game.playtime;
        details.appendChild(time);

        const price = document.createElement('p');
        price.textContent = 'Price: ' + game.price;
        details.appendChild(price);

        const link = document.createElement('a');
        link.href = '/games/' + game.id;
        link.textContent = 'Take a closer look →';
        details.appendChild(link);

        card.appendChild(details);
        mainContent.appendChild(card);
      }
    } else {
      message.textContent = 'No games available.';
    }
  } catch (error) {
    message.textContent = 'Unable to load games. Please check that the server is running and refresh.';
  }
};

const requestedUrl = window.location.pathname;

if (requestedUrl === '/' || requestedUrl === '/index.html') {
  renderGames();
} else {
  window.location.href = '/404.html';
}
