
# GROUPOMANIA SOCIAL MEDIA
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/AnthonyAzzati/AnthonyAzzati_7_05052021)

Bienvenue sur le dernier projet de ma formation OpenClassrooms !

Il s'agit du réseau social interne de l'entreprise fictive Groupomania.

## Tech Stack

**Client:** VueJS, Vuetify, Sass

**Server:** Node, Express

**Backend:** MySQL

  
## Features

- Créer/supprimer son compte
- Se connecter/se déconnecter
- Créer/supprimer un post et les images associées
- Créer/supprimer un commentaire et les images associées


  
  
## Installation

Afin de faire tourner l'application vous aurez besoin de NPM, de Node.js ainsi que node-sass d'installés localement sur votre ordinateur.

Utilisez le fichier "groupomania.sql" afin de créer votre base de données MySQL.

Cloner le project

```bash
  git clone https://github.com/AnthonyAzzati/AnthonyAzzati_7_05052021.git
```
    
Récupérer le fichier **process.env** disponible avec les livrables et le placer dans le dossier **backend** en le renommant **.env** (ne pas oublier le **point**).

Dans le dossier **server** (situé dans le dossier **backend**) créer un dossier **images**.

Dans le dossier **backend/server**
```bash
  npm install
```

Dans le dossier **backend**
```bash
  nodemon server
```

A la **racine** du project
```bash
  npm install
  npm run serve
```

L'application devraît être disponible à l'adresse suivante :
http://localhost:8080/

## INFORMATION IMPORTANTE

Afin de créer le compte modérateur en local, créer le compte désiré via l'application, une fois cela fait, connecter vous à votre base de données, sélectionner l'utilisateur et passer son rôle de "3 - user" à "2 - moderator".

## Authors

- [@AnthonyAzzati](https://github.com/AnthonyAzzati/)

  
