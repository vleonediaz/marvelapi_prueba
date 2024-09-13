const DATA_URL = `https://gateway.marvel.com:443/v1/public/characters?orderBy=modified&ts=2810&apikey=2fcafe116e31f9e3e673ef52358a4032&hash=397da94ff3a4b162cd5cb307e29a27e5`;

fetch(DATA_URL)
    .then(response => {
        if (!response.ok) {
            throw Error('Error en la carga de datos');
        }
        return response.json();
    })
    .then(data => {
        const characters = data.data.results;  // Accedemos a los resultados de personajes

        const renderCharacter = (characters) => {
            const container = document.querySelector('#products-grid');
            container.innerHTML = '';  // Limpiamos el contenedor antes de renderizar
            characters.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.className = 'col-lg-3 col-md-4 col-sm-6 col-12 mb-4';
                characterCard.innerHTML = `
                    <div id="marvel-characters" class="characters-card">    
                        <div class="product-image">
                            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                        </div>
                        <div>
                            <h3>${character.name}</h3>
                            <p>${character.description ? character.description : 'No description available'}</p>
                            <p>Cómics: ${character.comics.available}</p>
                            <p>Series: ${character.series.available}</p>
                        </div>
                    </div>
                `;
                container.appendChild(characterCard);
            });
        };

        const searchCharacter = () => {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const personajesBuscados = characters.filter(character => 
                character.name.toLowerCase().includes(searchTerm)
            );
            renderCharacter(personajesBuscados);  // Llamamos a renderCharacter con los personajes filtrados
        };

        // Evento para detectar el clic en el botón de búsqueda
        document.getElementById('search-button').addEventListener('click', searchCharacter);

        // Inicialmente, renderizamos todos los personajes
        renderCharacter(characters);
    })
    .catch(error => console.error(error));
