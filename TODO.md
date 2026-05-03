# A vérifier dans le code

## Côté BACK

- dans la migration **'training_scores'** les points peuvent être null dans le cas ne fais pas la journée en question ?

- méthode 'update' et 'delete' pour **days_controller** à créer au besoin ?

- méthode 'delete' pour **training_scores_controller** à créer au besoin ?

- table **day_registration** sur le meme modèle que season_registration pour gérer les joueurs présent lors d'une journée et ne pas parcourir tout le club pour la saisie des scores

-ajouter un champ **Division** à la table season

- revoir la table player : email, tel, date inscription, anniversaire

  <br>

## Côté FRONT

-Gérer le Header en mobile
-Organisation des routes de navigations

- Récupérer le type de la saison pour la saisie des scores

<br>

### Prochaine étape

- table DayPresence pour sélectionner les joueurs présent à cette journée ==> plus tard
- Modèle match championnat : création et saisie des 6 parties
- page des joueurs : trie des joueurs par saison + modal pour afficher les infos supplémentaire des joueurs/ supprimer ou modifier le joueur
- toast confirmation action (ajout / suppression)
