# A vérifier dans le code

## Côté BACK

- dans la migration **'training_scores'** les points peuvent être null dans le cas ne fais pas la journée en question ?

- méthode 'update' et 'delete' pour **days_controller** à créer au besoin ?

- méthode 'delete' pour **training_scores_controller** à créer au besoin ?

- table **day_registration** sur le meme modèle que season_registration pour gérer les joueurs présent lors d'une journée et ne pas parcourir tout le club pour la saisie des scores

-ajouter un champ **Division** à la table season

- check le type de saison avant de rentrer les scores ?

-retirer isGuest

  <br>

## Côté FRONT

-Organisation des routes de navigations

- Récupérer le type de la saison pour la saisie des scores

### v1

- onglet stats ?
- tri des joueurs
- modifs des couleurs

<br>

### Prochaine étape

_Week-end :_

- table DayPresence pour sélectionner les joueurs présent à cette journée ==> **plus tard**
- modal pour afficher : les infos supplémentaire des joueurs/ supprimer ou modifier le joueur
- page des joueurs : trie des joueurs par saison
- style des toasts

<u>_**Semaine :**_</u>

- page et lien pour meilleur navigation + bouton ajout de saison et journées
- gestion des joueurs dynamiques
