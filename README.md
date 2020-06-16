#Cultwars - Client Amin

Acrobatt 2020, Les Cultistes

Serveur client dévéloppé en React. [React](https://reactjs.org/)


## Dépendances

Voici la liste des dépendances présente dans le projet sous la forme de libraries react. disponible [ici](https://www.npmjs.com/)

- **bootstrap**                 - Librairie de style css.
- **jquery**                    - Librairie de recherche des elemnt html d'une page web.
- **moment**                    - Librairie de chargement du time-zone de l'utilisateur.
- **react**                     - Librairie principal de react.
- **react-bootstrap-typeahead** - Librairie de style css pour les en-tête de tableau.
- **react-dom**                 - Librairie principal de traitement des dom elements.
- **react-google-maps**         - Librairie de liaison avec l'api de google maps.
- **react-scripts**             - Librairie qui inclue des scripts et des configurations uttilisées par **Create React App**.
- **react-widgets**             - Librairie d'ajout d'élement widget(comme les dateTimePickers).
- **react-widgets-moment**      - Librairie de depandance pour **react-widgets**, permet de configurer la time-zone des widgets.
- **reactstrap**                - Librairie de style css, permet l'uttilisation de boostrap avec les élements react.
- **tyled-components**          - Librairie de style css.

### Arboressance des different éléments du projet

.
├── App.js                        : `Coeur du projet controle la mise en place d'une partie, et son lancement si le serveur de jeu en contient deja une`
├── components                    : `Liste des composent utiles pour une creation rapide de la map`
│   ├── BuffDisplay.js            : `Liste des bonus ou malus actifs, d'un joueur, sous la forme d'une liste html`
│   ├── DateTimeDisplay.js        : `Elément de choix de date et d'heure pour un formulaire html`
│   ├── Header.js                 : `En-tête en haut de la carte, contient des boutons`
│   ├── ItemsDisplay.js           : `Liste des objets, que possède un joueur, sous la forme d'une liste html`
│   ├── ModalBeginGame.js         : `Pop-up affichant une partie qui n'as pas encore commencée,elle contient la liste des joueur qui attende le début de la partie`  
│   ├── ModalEndGame.js           : `Pop-up affichant la fin d'une partie, elle contient le classement des équipes`
│   ├── ModalListPlayer.js        : `Pop-up affichant la liste des joueurs connectés`
│   ├── PlayersListDisplay.js     : `Liste des joueur contenue dans la partie courante, sous la forme d'une liste html`
│   ├── SelectDisplay.js          : ``
│   └── TextDisplay.js            : ``
├── css
│   ├── App.css                   : ``
│   └── Map.css                   : ``
├── form
│   ├── CreateTeam.js             : ``
│   └── MapConfigPannel.js        : ``
├── helper 
│   ├── DrawConflict.js           : ``
│   ├── Point.js                  : ``
│   └── Time.js                   : ``
├── index.css                     : ``
├── index.js                      : ``
├── mapControllers                : ``
│   ├── DrawManager.js            : ``
│   ├── ElementInfo.js            : ``
│   ├── GoogleMap.js              : ``
│   ├── MapControl.js             : ``
│   ├── MapImportConfigPannel.js  : ``
│   ├── Map.js                    : ``
│   ├── PlayersControl.js         : ``
│   └── style.js                  : ``
├── model
│   ├── elements
│   │   ├── Altar.js
│   │   ├── Entity.js
│   │   ├── IconBuff.js
│   │   ├── IconItem.js
│   │   ├── ItemManager.js
│   │   ├── Items
│   │   │   ├── CultMag.js
│   │   │   ├── DunwichAnnals.js
│   │   │   ├── Item.js
│   │   │   ├── PocheInterdimensionnelle.js
│   │   │   └── VisionOrb.js
│   │   ├── Marker.js
│   │   └── Player.js
│   ├── Game.js
│   ├── SocketController.js
│   ├── SocketMessage.js
│   ├── Team.js
│   └── Zone.js
└── serviceWorker.js

### Le serveur de jeu

A la réception, tous les messages transitent par l'objet **Socket**, sous format singleton de la class **SocketController.js**.

Le client reçois de cette façons:
- L'update de position des joueur uttiliser dans **Map.js** et transmise à **PlayersControl.js**.
- La configuration de la map.
- Si la partie se fini.

### Lancement du projet

## Développement
``` npm start ```

## Production
``` npm build ```


