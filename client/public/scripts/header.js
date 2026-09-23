const header = document.querySelector('header');
const navigation = document.createElement('nav');

const title = document.createElement('a');
title.className = 'site-title';
title.href = '/';
title.textContent = '⚄ Game Night Shelf';

const home = document.createElement('a');
home.href = '/';
home.textContent = 'Browse games';

navigation.appendChild(title);
navigation.appendChild(home);
header.appendChild(navigation);
