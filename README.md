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
- **API REST** (<https://api.escuelajs.co/api/v1/>)
- **MatSnackBar** (Gestion des notifications)

---

## 📥 Installation et Configuration

### 1️⃣ Prérequis

- **Node.js** (v16+ recommandé)
- **Angular CLI**
- **Git**

### 2️⃣ Cloner le projet

```bash
git clone https://github.com/hamidadj13/tp-project-weshare.git
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

L’application sera accessible sur `http://localhost:4200` si le port n'est pas déja occupé

---

## 📝 Utilisation du Projet

### 🔹 1. Inscription et Connexion

1. Accédez à `/sign-up` pour créer un compte.
2. Choisissez un **nom, email, mot de passe et avatar**.
3. Le role est defini dans le code par défaut sur "customer"  donc qi vous créez un compte vous n'aurez pas accès à la plupart des fonctionnalités
4. Pour changer cela, accédez au fichier sign-up.component.ts
5. A la ligne 42 remplacez  `role: ['customer', Validators.required]` par `role: ['admin', Validators.required]`
6. Aller sur le navigateur et remplir les champs et cliquer  sur **S'inscrire**.
7. Une fois inscrit, connectez-vous via `/login`.

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

### Voici la structure du projet

```
/src
|
|--- index.html
|--- main.ts
|--- README.txt
|---  styles.css
|
\---app
    |   app.component.css
    |   app.component.html
    |   app.component.spec.ts
    |   app.component.ts
    |   app.config.ts
    |   app.routes.ts
    |
    +---add-product
    |       add-product.component.css
    |       add-product.component.html
    |       add-product.component.spec.ts
    |       add-product.component.ts
    |
    +---edit-product
    |       edit-product.component.css
    |       edit-product.component.html
    |       edit-product.component.spec.ts
    |       edit-product.component.ts
    |
    +---footer
    |       footer.component.css
    |       footer.component.html
    |       footer.component.spec.ts
    |       footer.component.ts
    |
    +---guards
    |       auth.guard.spec.ts
    |       auth.guard.ts
    |
    +---layout
    |       layout.component.css
    |       layout.component.html
    |       layout.component.spec.ts
    |       layout.component.ts
    |
    +---login
    |       login.component.css
    |       login.component.html
    |       login.component.spec.ts
    |       login.component.ts
    |
    +---product-detail
    |       product-detail.component.css
    |       product-detail.component.html
    |       product-detail.component.spec.ts
    |       product-detail.component.ts
    |
    +---products
    |       products.component.css
    |       products.component.html
    |       products.component.spec.ts
    |       products.component.ts
    |
    +---services
    |       auth.service.spec.ts
    |       auth.service.ts
    |       categorie.service.spec.ts
    |       categorie.service.ts
    |       error.interceptor.service.spec.ts
    |       error.interceptor.service.ts
    |       notification.service.spec.ts
    |       notification.service.ts
    |       products.service.spec.ts
    |       products.service.ts
    |       users.service.spec.ts
    |       users.service.ts
    |
    +---sign-up
    |       sign-up.component.css
    |       sign-up.component.html
    |       sign-up.component.spec.ts
    |       sign-up.component.ts
    |
    \---users
            users.component.css
            users.component.html
            users.component.spec.ts
            users.component.ts

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
