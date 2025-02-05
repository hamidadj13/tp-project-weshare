# 🛒 SyncVote - Gestion des Produits

## 📌 Description du Projet
SyncVote est une application web développée en **Angular** permettant la gestion des produits avec des fonctionnalités avancées telles que l'**inscription**, la **connexion**, l'**ajout**, la **modification** et la **suppression de produits**.

L'application utilise une **API REST** pour gérer les données et est conçue pour être **facile à utiliser même pour les non-développeurs**.

## 🚀 Fonctionnalités Principales
### ✅ Utilisateurs
- **Inscription** avec nom, email, mot de passe, avatar et rôle (Admin ou Client).
- **Connexion** sécurisée.
- **Gestion des rôles** (Admin : gestion complète des produits, Client : achat seulement).

### 🛍️ Produits
- **Ajout de nouveaux produits** (Admin uniquement).
- **Modification des produits** (Admin uniquement).
- **Suppression des produits** (Admin uniquement).
- **Affichage détaillé des produits**.
- **Ajout au panier** (Client uniquement).
- **Recherche dynamique**.
- **Pagination des produits**.

### ⚡ Notifications et Erreurs
- **Gestion centralisée des erreurs** avec `MatSnackBar`.
- **Affichage des erreurs API** en temps réel.
- **Rechargement automatique après l'ajout/modification/suppression d'un produit**.

---
## 🛠️ Technologies Utilisées
- **Angular** (Standalone Components)
- **Angular Material** (UI)
- **TypeScript**
- **RxJS** (Gestion des Observables)
- **API REST** (https://api.escuelajs.co/api/v1/)
- **MatSnackBar** (Gestion des notifications)

---
## 📥 Installation et Configuration
### 1️⃣ Prérequis
- **Node.js** (v16+ recommandé)
- **Angular CLI**
- **Git**

### 2️⃣ Cloner le projet
```bash
git clone https://github.com/ton-repo/syncvote-angular.git
cd syncvote-angular
```

### 3️⃣ Installer les dépendances
```bash
npm install
```

### 4️⃣ Lancer l’application en mode développement
```bash
ng serve
```
L’application sera accessible sur `http://localhost:4200`

---
## 📝 Utilisation du Projet
### 🔹 1. Inscription et Connexion
1. Accédez à `/sign-up` pour créer un compte.
2. Choisissez un **nom, email, mot de passe et avatar**.
3. Sélectionnez votre **rôle** (`Admin` ou `Client`).
4. Cliquez sur **S'inscrire**.
5. Une fois inscrit, connectez-vous via `/login`.

### 🔹 2. Gestion des Produits (Admin uniquement)
- **Ajouter un produit** : Formulaire avec titre, prix, description, images, catégorie.
- **Modifier un produit** : Bouton "Modifier" sur chaque produit.
- **Supprimer un produit** : Bouton "🗑️ Supprimer".
- **Voir un produit** : Détails avec accordéon d’images.

### 🔹 3. Recherche et Pagination
- Barre de **recherche dynamique**.
- **Pagination automatique** avec `MatPaginator`.

---
## 🔧 Structure du Projet
```
/src
│── app
│   │── services      # Services (API, Auth, Notifications)
│   │── components    # Composants UI (Navbar, Sidebar, etc.)
│   │── pages
│   │   │── login
│   │   │── sign-up
│   │   │── products
│   │   │── product-detail
│   │── guards        # AuthGuard pour sécuriser les routes
│   │── app.routes.ts # Définition des routes Angular
│── assets           # Images et fichiers statiques
│── main.ts          # Point d’entrée de l’application
│── app.config.ts    # Configuration globale (Intercepteurs, Providers)
```

---
## 🤝 Contribution
Tu veux améliorer le projet ?
1. **Fork** le repo.
2. Crée une **branche** (`git checkout -b feature-nouvelle-fonctionnalite`).
3. **Fais tes modifications** et commit (`git commit -m "Ajout de X"`).
4. **Push** (`git push origin feature-nouvelle-fonctionnalite`).
5. Crée une **Pull Request**.

---
## 📩 Support
Si tu rencontres un problème, ouvre une **issue** sur GitHub ou contacte-moi directement.

🚀 **Bon développement avec SyncVote !** 🎉

