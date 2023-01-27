# Backend Quizzy

## Présentation

Backend :

Notre projet est un outil en ligne pour les enseignants qui leur permettra de créer des quiz personnalisés pour leurs étudiants. Il proposera une interface intuitive pour la construction de questionnaires, avec la possibilité d'ajouter des images, des vidéos et des liens web. Il sera également possible de classer les questions par thème et de les organiser en catégories pour une utilisation ultérieure.

Les étudiants pourront ensuite accéder aux quiz en ligne, soit via un lien partagé par l'enseignant, soit en se connectant à un compte dédié. Ils pourront répondre aux questions et recevoir des résultats immédiats après avoir soumis leur quiz.

Notre outil comprendra également des fonctionnalités d'analyse des résultats pour les enseignants, qui leur permettra de suivre les progrès de leurs étudiants et de identifier les domaines où ils ont besoin d'aide supplémentaire. Les enseignants pourront également créer des groupes d'étudiants pour une meilleure gestion des résultats.

En résumé, notre outil de création de quiz en ligne permettra aux enseignants de créer des questionnaires personnalisés pour leurs étudiants, de suivre leurs progrès et de les aider à mieux comprendre le matériel enseigné. Il est innovant car il offre une solution en ligne pour la création de quiz, accompagné d'analyse des résultats pour les enseignants.

## Stack

- NestJS
- Prisma

## Fonctionnalités techniques

## Installation

- Installation de Yarn

```shell
npm install --global yarn
```

- Installation des dépendances du projet

```shell
yarn
```

- Installation de Postgresql

```shell
docker-compose up nest-postgres
```

- Création de la base de données

```shell
npx prisma generate
```

- Créer une migration

```shell
prisma migrate dev
```

- Remplissage de la base de données

```shell
yarn seed
```

- Lancement du projet

```shell
yarn start
```

## Generating a new resource

```bash
# Generating a new resource
$ nest g resource {{name}} --no-spec
```

## build the schematics and run the schematic.

```bash
npm run build:schematics
# or
npm run dev:schematics

# dry-run
schematics .:nest-add

# execute schematics
schematics .:nest-add --debug false
# or
schematics .:nest-add --dry-run false
```

## Le design pattern :

Le design pattern "**module-service-controller**" est utilisé dans l'application NestJS pour séparer les différentes couches de l'application en modules, services et contrôleurs.

### Modules

Un module est utilisé pour regrouper un ensemble de fonctionnalités de l'application. Un module peut être vu comme une boîte à outils qui contient tout ce dont vous avez besoin pour réaliser une tâche spécifique. Les modules sont utiles pour organiser votre code de manière cohérente et scalable.

### Services

Un service est une classe qui contient la logique métier de votre application. Les services sont généralement utilisés pour effectuer des opérations de base de données, envoyer des requêtes HTTP, ou effectuer toute autre opération qui n'est pas directement liée à la logique de présentation de votre application.

### Contrôleurs

Un contrôleur est une classe qui gère les requêtes HTTP et renvoie une réponse au client. Les contrôleurs sont généralement utilisés pour définir les routes de votre application et pour appeler les méthodes de votre service en fonction de la route demandée.

En utilisant ce design pattern,on peut séparer clairement les différentes couches de l'application et faciliter l'organisation et la maintenance du code.

## Plugins conseillés

Eslint : Linter
Prettier : Code formater
Prisma : Ajoute la coloration syntaxique, le formatage, l'autocomplétion, le saut à la définition et la vérification des fichiers Prisma
