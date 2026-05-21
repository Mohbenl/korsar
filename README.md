# Korsar - E-commerce Fashion Website

Korsar est une plateforme e-commerce moderne dédiée à une marque de vêtements.
Le projet inclut un site vitrine ainsi qu’un dashboard admin complet pour la gestion des produits et des commandes.

## Live Demo
 https://korsar.vercel.app

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Backend & Auth)
- Recharts (Dashboard analytics)
- Lucide Icons
- Vercel (déploiement)

---

## Features

### Site Client
- Landing page moderne avec hero section animée
- Présentation de la marque Korsar
- Catalogue produits dynamique
- Filtrage par catégories
- Pages produit détaillées
- Design responsive (mobile / desktop)

### Admin Dashboard
- Authentification admin sécurisée (Supabase Auth)
- Gestion des produits (CRUD)
- Gestion des commandes
- Statistiques (revenus, produits, commandes)
- Graphiques interactifs avec Recharts
- Interface type SaaS moderne

---

## Backend

Le backend est maintenant basé sur **Supabase** :
- PostgreSQL database
- Authentification
- Storage pour images produits
- API temps réel

---

## Installation

```bash
# cloner le projet
git clone https://github.com/ton-username/korsar.git

# installer les dépendances
npm install

# lancer le projet en local
npm run dev
