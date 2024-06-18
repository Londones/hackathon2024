# Hackathon 2024

## Installation (sans Docker)

npm install dans les deux dossiers

Mettre les variables d'env demandées dans .env.example

Créer la db avec 

```npm run createdb```

Créer les tables avec 

```npm run synctables```

Jouer la migration avec 

```npx sequelize-cli db:migrate```

## Démarrage de l'application

Sur le serveur lancer

```npm run start```

Sur le client lancer

```npm run dev```
