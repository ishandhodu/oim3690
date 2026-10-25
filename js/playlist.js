const songs = [
  "Blinding Lights",
  "Levitating (Remix)",
  "Shape of You",
  "Sunflower (Remix)",
  "As It Was"
];

const playlist = document.getElementById('playlist');
const songCount = document.getElementById('song-count');

function updateSongCount() {
  songCount.textContent = `${songs.length} song${songs.length === 1 ? '' : 's'}`;
}

function addSongToList(song) {
  const li = document.createElement('li');

  const label = document.createElement('span');
  label.textContent = song;

  if (song.includes('Remix')) {
    li.classList.add('remix');
    label.textContent = song + ' 🎧';
  }

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove-btn');
  removeBtn.addEventListener('click', () => {
    const index = Array.from(playlist.children).indexOf(li);
    songs.splice(index, 1);
    li.remove();
    updateSongCount();
  });

  li.appendChild(label);
  li.appendChild(removeBtn);
  playlist.appendChild(li);
}

for (const song of songs) {
  addSongToList(song);
}
updateSongCount();

const addSongForm = document.getElementById('add-song-form');
const songInput = document.getElementById('song-input');

addSongForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newSong = songInput.value.trim();
  if (newSong === '') return;

  songs.push(newSong);
  addSongToList(newSong);
  updateSongCount();
  songInput.value = '';
});
