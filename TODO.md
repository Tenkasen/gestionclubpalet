# A vérifier dans le code

## Côté BACK

- dans la migration **'training_scores'** les points peuvent être null dans le cas ne fais pas la journée en question ?

- méthode 'update' et 'delete' pour **days_controller** à créer au besoin ?

- méthode 'delete' pour **training_scores_controller** à créer au besoin ?

-ajouter un champ **Division** à la table season

- check le type de saison avant de rentrer les scores ?

-retirer isGuest

  <br>

## Côté FRONT

-Organisation des routes de navigations

- Récupérer le type de la saison pour la saisie des scores

### Refactor technique (post-v1)

- Évaluer remplacement Axios par ofetch ou fetch natif
  - Créer un wrapper fetch avec interceptors
  - Migrer API par API (une par semaine)
  - Tester chaque migration avant de passer à la suivante

### v1

- onglet stats ?
- tri page liste des joueurs
- modifs des couleurs

<br>

### Prochaine étape

_Week-end :_

- page des joueurs : trie des joueurs par saison
- style des toasts
- couleur header à changer (layout + feedback)

<u>_**Semaine :**_</u>

- page et lien pour meilleur navigation + bouton ajout de saison et journées
