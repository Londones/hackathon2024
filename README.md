# Hackathon 2024

## Installation (sans Docker)

Dans les deux dossiers client, server

```npm install```

## Configuration des variables environements dans .env.example

Du server

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_HOST=
POSTGRES_PORT=
JWT_SECRET=
JWT_REFRESH_SECRET=
DATABASE_URL=
NODE_ENV=development
PHONE=+33
```

Du client

```bash
VITE_SERVER_URL=
```

## Configuration de la base de données
Créer la db avec 

```npm run createdb```

Créer les tables avec 

```npm run synctables```

Jouer les migrations avec 

```npx sequelize-cli db:migrate```

## Démarrage de l'application

Sur le serveur lancer

```npm run start```

Sur le client lancer

```npm run dev```

# Fonctionalités principales

- Général :
    - Boilerplate/squelette front (design system, composants de base) et back (base de données, models, controllers, routes de login/register, fixtures de base) du projet : BAH Awa

- Tableau de bord utilisateur :

    - Graphique de la Diabète (front + back) : TRAN DIEP Mai Thi
    - Carte de l'alerte de la Diabète (front + back récupération) : TRAN DIEP Mai Thi
    - Graphique de la Hypertension (front + back) : TRAN DIEP Mai Thi
    - Carte de l'alerte de la Hypertension (front + back récupération) : TRAN DIEP Mai Thi
    - Calendrier des rappels (front + back) : TRAN DIEP Mai Thi
    - Ajouter / Modifier un rappel (front + back) : TRAN DIEP Mai Thi
    - Ajout/modification des taux directement depuis l'interface web (front + back) : BAH Awa

- AI SMS ..
    - Set up IA (Mistral) + API Envoie/Réception SMS : Alicia SACI
    - Création des Prompt + algorithme de monitoring du diabète : Alicia SACI
    - création des alertes et avertissements pour le diabète : Alicia SACI
    - Fetch de l'historique des réponses de l'IA + Display (Front + Back) : Alicia SACI
    - Envoi d'SMS et traitement par l'IA
    - Divers modifications (form register pour ajouter des informations pertinante aux monitoring etc.)
  
    - Création des Prompt + algorithme de monitoring de la tension arterielle : Walid IDIR
    - création des alertes et avertissements pour le tension arterielle : Walid IDIR
    - Envoi de question medicales diverses à l'IA (comme interférences des médicament, espacement de ceux-ci) + réponse de l'IA. : Walid IDIR
    - Traitement des messages potentiels avec des Regex complexes (cas de faute ou autre par l'utilisateur) : Walid IDIR
    - Integration du setup de l'API d'envoi/reception des SMS pour sauvegarder les taux envoyés, dans la base de donnée : BAH Awa
    - Envoi des rappels des differentes maladies par SMS selon la fréquence et l'heure renseignée par l'utilisateur : BAH Awa
    - Cron-jobs pour l'analyse des utilisateurs à rappeler et l'analyse des SMS reçus : BAH Awa
    


# Notre équipe

- BAH Awa (Londones)
- SACI Alicia (Aliciasaci)
- IDIR Walid (waliidhakim)
- TRAN DIEP Mai Thi (maithi-trandiep) 
