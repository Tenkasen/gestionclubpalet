# A vérifier dans le code

## Côté BACK

- dans la migration **'training_scores'** les points peuvent être null dans le cas ne fais pas la journée en question ?

- méthode 'update' et 'delete' pour **days_controller** à créer au besoin ?

- méthode 'delete' pour **training_scores_controller** à créer au besoin ?

- table **day_registration** sur le meme modèle que season_registration pour gérer les joueurs présent lors d'une journée et ne pas parcourir tout le club pour la saisie des scores

- createmany pour ajouter plusieurs joueurs d'un coup et aussi pour ajouter plusieurs joueurs dans une saison

  <br>

## Côté FRONT

- sauvegarde des scores meme si refresh de la page
-

<br>

### Prochaine étape

- table DayPresence pour sélectionner les joueurs présent à cette journée ==> plus tard
- page dayRanking et seasonRanking
