# Cultwars - Client Admin

Acrobatt 2020, Les Cultistes

Serveur client dévéloppé en [**React**](https://reactjs.org/). 

## Lancement du projet

### Développement
``` npm start ```

### Production
``` npm build ```


## Dépendances

Voici la liste des dépendances présentes dans le projet sous la forme de libraries **React**. Disponible [ici](https://www.npmjs.com/).

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
- **styled-components**         - Librairie de style css.

### Arboressance des different éléments du projet

```php
.
├── App.js                      : `Coeur du projet, controle la mise en place d'une partie et son lancement si le serveur de jeu en contient deja une`
|
├── components                  - Composents utiles pour une creation rapide de la map
│   ├── BuffDisplay.js              : `Liste des bonus ou malus actifs, appartenant un joueur, sous la forme d'une liste html`
│   ├── DateTimeDisplay.js          : `Elément de choix de date et heure pour un formulaire html`
│   ├── Header.js                   : `En-tête en haut de la carte, contient des boutons`
│   ├── ItemsDisplay.js             : `Liste des objets, que possède un joueur, sous la forme d'une liste html`
│   ├── ModalBeginGame.js           : `Pop-up affichant une partie qui n\'as pas encore commencée,elle contient la liste des joueurs qui attendent le début de la partie`  
│   ├── ModalEndGame.js             : `Pop-up affichant la fin d'une partie, elle contient le classement des équipes`
│   ├── ModalListPlayer.js          : `Pop-up affichant la liste des joueurs connectés`
│   ├── PlayersListDisplay.js       : `Liste des joueur contenue dans la partie courante, sous la forme d'une liste html`
│   ├── SelectDisplay.js            : `Elément de selection parmis une liste d'élements pour un formulaire html`
│   └── TextDisplay.js              : `Elément d'entré text pour un formulaire html`
|
├── css                         - Fichiers de style
│   ├── App.css                     : `Fichier de style pour les élements de formulaire`
│   └── Map.css                     : `Fichier de style pour les élements contenue par la carte`
|
├── form                        - Les formulaires
│   ├── CreateTeam.js               : `Formulaire de creation d'équipe`
│   └── MapConfigPannel.js          : `Formulaire pour edité la configuration de la partie aprés injéction de la configuration JSON`
|
├── helper                      - Les différents outils
│   ├── DrawConflict.js             : `Ensemble des calcules pour les intéractions entre les éléments sur la carte`
│   ├── Point.js                    : `Classe d'un point d'un espace`
│   └── Time.js                     : `Ensemble des calcules pour les dates`
|
├── mapControllers              - Les différents composants utils à la gestion de la carte Google-Maps
│   ├── DrawManager.js              : `Controller chargé de placer un éléments sur la carte`
│   ├── ElementInfo.js              : `Controller chargé de montrer les bulle d'infos`
│   ├── GoogleMap.js                : `Controller chargé de la liason avec Google-Maps`
│   ├── MapControl.js               : `Controller chargé du placement et de la mise à jour des éléments sur la carte`
│   ├── MapImportConfigPannel.js    : `Controller chargé de la mise en ligne d'une nouvelle configuration JSON`
│   ├── Map.js                      : `Controller principale chargé de la création de la carte et de l'interaction entre les informations du serveur de jeux et des éléments de la carte. `
│   ├── PlayersControl.js           : `Controller chargé du placement des joeurs sur la carte`
│   └── style.js                    : `Fichier de controlle du style de la carte Google-Maps`
|
├── model                       - Les classes qui constiuent une partie
│   ├── elements                    - Les classes des éléments disposables sur la carte
│   │   ├── Altar.js                    : `Classe des drapeaux`
│   │   ├── Entity.js                   : `Classe abstraite de tout les élements disposables sur la carte`
│   │   ├── IconBuff.js                 : `Classe de match entre les bonus et les malus d'un joueur et leur images`
│   │   ├── IconItem.js                 : `Classe de match entre les objets et leur images`
│   │   ├── ItemManager.js              : `Classe abstraite qui joue le rôle de constructeur des objets`
│   │   ├── Items                       - Les classes des objets
│   │   │   ├── CultMag.js                  : `Classe du magazine de culte`
│   │   │   ├── DunwichAnnals.js            : `Classe des annales de dunwichs`
│   │   │   ├── Item.js                     : `Classe abstraite des Objects`
│   │   │   ├── PocheInterdimensionnelle.js : `Classe de la poche interdimenssionnelle`
│   │   │   └── VisionOrb.js                : `Classe orbe de vision`
│   │   ├── Marker.js                   : `Classe de création des éléments visuèlement parlant sur la carte`
│   │   └── Player.js                   : `Classe des joueurs`
│   ├── Game.js                     : `Classe de la partie`
│   ├── SocketController.js         : `Classe qui chargé de la connection avec le serveur de jeu `
│   ├── SocketMessage.js            : `Classe de traitement des differents types messages reçus et envoyés au serveur de jeu `
│   ├── Team.js                     : `Classe des équipes`
│   └── Zone.js                     : `Classe des régions de jeu`
```

### Le serveur de jeu

A la réception, tous les messages transitent par l'objet **Socket**, sous format singleton de la class **SocketController.js**.

Le client reçois de cette façons:
- L'update de position des joueur uttiliser dans **Map.js** et transmise à **PlayersControl.js**.
- La configuration de la map.
- Si la partie se fini.


## Collaborateurs

- FORNAZARIC Florian
- BRUA Hugo
- GUERRE Michaël
- RITZENTHALER Thibaud
- DAGON Anthony
- UNGERER Marc

