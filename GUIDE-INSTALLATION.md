# App' Délégué FO - Guide d'installation

## 📱 Présentation

Application PWA (Progressive Web App) pour les délégués syndicaux Force Ouvrière.

**Fonctionnalités :**
- ✅ Calendrier syndical partagé (CSE, réunions, formations)
- ✅ Actualités syndicales
- ✅ Compteur d'heures de délégation
- ✅ Carnet d'interventions (suivi des salariés aidés)
- ✅ Notes de terrain
- ✅ Fiches pratiques juridiques
- ✅ Annuaire des contacts utiles
- ✅ Fonctionne hors-ligne
- ✅ Export des données personnelles

---

## 🚀 Installation (Hébergement gratuit sur GitHub Pages)

### Étape 1 : Créer un compte GitHub (gratuit)

1. Aller sur https://github.com
2. Cliquer sur "Sign up"
3. Créer un compte (gratuit)

### Étape 2 : Créer un nouveau dépôt

1. Cliquer sur le "+" en haut à droite → "New repository"
2. Nom du dépôt : `fo-delegues` (ou autre nom)
3. Cocher "Public"
4. Cliquer "Create repository"

### Étape 3 : Uploader les fichiers

1. Cliquer "uploading an existing file"
2. Glisser-déposer TOUS les fichiers du dossier :
   - `index.html`
   - `data.json`
   - `manifest.json`
   - `sw.js`
   - Le dossier `icons/` avec son contenu
3. Cliquer "Commit changes"

### Étape 4 : Activer GitHub Pages

1. Aller dans "Settings" (onglet en haut)
2. Dans le menu gauche, cliquer "Pages"
3. Source : sélectionner "Deploy from a branch"
4. Branch : sélectionner "main" et "/ (root)"
5. Cliquer "Save"
6. Attendre 2-3 minutes

### Étape 5 : Accéder à l'application

Votre application est maintenant accessible à :
```
https://VOTRE-NOM.github.io/fo-delegues/
```

Remplacez `VOTRE-NOM` par votre nom d'utilisateur GitHub.

---

## 📲 Installation sur téléphone

### iPhone / iPad

1. Ouvrir Safari (obligatoire)
2. Aller sur l'URL de l'application
3. Appuyer sur l'icône de partage (carré avec flèche)
4. Choisir "Sur l'écran d'accueil"
5. Valider

### Android

1. Ouvrir Chrome
2. Aller sur l'URL de l'application
3. Appuyer sur les 3 points en haut à droite
4. Choisir "Ajouter à l'écran d'accueil"
5. Valider

---

## 🔄 Mettre à jour les données partagées

Pour mettre à jour le calendrier, les actualités, les fiches pratiques ou l'annuaire :

### Méthode simple (sur GitHub)

1. Aller sur votre dépôt GitHub
2. Cliquer sur `data.json`
3. Cliquer sur l'icône crayon (Edit)
4. Modifier le contenu
5. Cliquer "Commit changes"

### Structure du fichier data.json

```json
{
  "events": [
    {
      "id": 1,
      "title": "Réunion CSE mensuelle",
      "date": "2026-02-05",
      "time": "14:00",
      "type": "cse",
      "location": "Salle A",
      "description": "Ordre du jour..."
    }
  ],
  "news": [
    {
      "id": 1,
      "title": "Titre de l'actu",
      "date": "2026-01-15",
      "summary": "Résumé de l'actualité"
    }
  ],
  "fiches": [
    {
      "id": 1,
      "title": "Titre de la fiche",
      "content": "Contenu de la fiche..."
    }
  ],
  "contacts": [
    {
      "id": 1,
      "name": "Inspection du travail",
      "role": "Services de l'État",
      "organization": "DREETS",
      "phone": "0 806 000 126",
      "email": ""
    }
  ]
}
```

### Types d'événements

- `cse` : Réunions CSE (rouge)
- `reunion` : Réunions diverses (bleu)
- `formation` : Formations (vert)
- `ag` : Assemblées générales (orange)

---

## 🔒 Données personnelles

Les données personnelles (interventions, notes, heures) sont stockées **localement** sur le téléphone de chaque délégué.

- Elles ne sont **jamais** envoyées sur Internet
- Chaque délégué a ses propres données
- Possibilité d'exporter en JSON (menu "Plus")

---

## 🛠️ Personnalisation

### Modifier le mot de passe d'accès

**Important :** Le mot de passe par défaut est `FO2026!`

Pour le changer, ouvrez `index.html` et cherchez cette ligne :
```javascript
const CONFIG = { dataUrl: 'data.json', defaultQuota: 20, appPassword: 'FO2026!' };
```

Remplacez `FO2026!` par votre propre mot de passe.

**Conseils :**
- Choisissez un mot de passe facile à communiquer aux délégués
- Évitez les caractères spéciaux complexes
- Partagez-le uniquement aux personnes autorisées

### Modifier le quota d'heures par défaut

Dans `index.html`, chercher :
```javascript
const CONFIG = { dataUrl: 'data.json', defaultQuota: 20 };
```

Changer `20` par votre quota.

### Modifier les couleurs

Dans `index.html`, modifier les variables CSS :
```css
:root {
  --fo-red: #D32F2F;      /* Rouge FO */
  --fo-red-dark: #B71C1C;  /* Rouge foncé */
  --fo-red-light: #FFCDD2; /* Rouge clair */
}
```

### Ajouter des types d'intervention

Dans le formulaire HTML, ajouter des options :
```html
<option value="nouveau_type">Nouveau type</option>
```

Et dans le JavaScript, ajouter le label :
```javascript
function getTypeLabel(t) {
  const l = {
    // ... types existants ...
    nouveau_type: 'Nouveau Type'
  };
  return l[t] || t;
}
```

---

## 📞 Support

Pour toute question ou amélioration, contactez votre fédération FO ou l'administrateur de l'application.

---

## 📋 Checklist de déploiement

- [ ] Compte GitHub créé
- [ ] Dépôt créé
- [ ] Fichiers uploadés
- [ ] GitHub Pages activé
- [ ] URL de l'app notée
- [ ] Test sur téléphone
- [ ] Installation sur écran d'accueil
- [ ] Données personnalisées dans data.json
- [ ] URL partagée aux délégués

---

*Application créée pour Force Ouvrière - 100% gratuite et sans dépendances tierces*
