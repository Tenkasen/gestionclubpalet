# A vérifier dans le code

## Côté BACK

- dans la migration **'training_scores'** les points peuvent être null dans le cas ne fais pas la journée en question ?

- méthode 'update' et 'delete' pour **days_controller** à créer au besoin ?

- méthode 'delete' pour **training_scores_controller** à créer au besoin ?

  <br>

## Côté FRONT

<br>

### Prochaine étape

TrainingScoreEntry — Création complète

1. Les imports nécessaires

Hook de navigation, APIs (day, seasonRegistration, trainingScore), composant

2. Les states
   ts// Lesquels ? day, players, loading, error
   // Quels types ?
3. Les IDs depuis l'URL
   ts// useParams → convertir en number
4. Brancher le hook
   ts// Juste après les states
   // Déstructurer : currentPlayer, currentIndex, nextPlayer, prevPlayer, saveScore, scores, isLast, isFirst
5. Le useEffect
   ts// Promise.all avec les deux appels
   // Guard si null
   // finally → setLoading
   // Dépendances ?
6. Le handleSave
   ts// Guard currentPlayer
   // Appel API
   // Guard si null → setError
   // saveScore + nextPlayer ou handleValidateDay si isLast
7. Le JSX
   tsx// if loading → spinner
   // if error → message
   // Barre de progression avec currentIndex et players.length
   // <TrainingScoreInput> avec toutes ses props
