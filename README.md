# Plugin Légifrance pour Alyoda

Ce plugin est compatible avec les sites Lodel qui utilisent le modèle éditorial [Alyoda](https://github.com/edinum/alyoda).

Il ajoute un bouton à côté du champ "Numéro Légifrance" du formulaire d'édition des documents de type "Décision de justice". Ce bouton permet de pré-remplir le formulaire d'édition avec les données de l'API [Piste](https://piste.gouv.fr/) en renseignant l'identifiant du document sur Légifrance.

## Mise en route

### Installation du plugin

Dans le répertoire `share/plugins/custom/` de l'installation Lodel, cloner le dépôt :

```bash
git clone https://github.com/edinum/legifrance.git
```

Depuis l'administration des plugins de l'instance Lodel (https://mondomaine/lodeladmin/index.php?do=list&lo=mainplugins) activer le plugin `legifrance`.

### Création d'une application dans Piste

1. Créer un compte sur [la plateforme Piste](https://piste.gouv.fr/) afin de pouvoir utiliser les API.
2. Sur la page <https://piste.gouv.fr/consentement-cgu-api-fr>, rechercher "légifrance", cocher les deux cases des CGU correspondantes puis cliquer sur "Valider mes choix CGU".
3. Sur la page https://piste.gouv.fr/apps, créer une nouvelle application avec les informations suivantes :
	* Organisation : Universelle
	* Nom de l'application : lodel-legifrance
	* Description : Plugin Légifrance pour Lodel
	* Email, Information sur la structure, Responsable d'application : vos informations personnelles
	* Cocher la case "Activer l'application".
	* Sélectionner "Légifrance Beta" dans la liste des API disponibles.
	* Cliquer sur "Sauvegarder l'application".
4. Sélectionner l'application, puis noter les informations suivantes de la section "Identifiants Oauth" :
	* La valeur de la colonne "Client ID"
	* Dans la colonne "Secret Key", cliquer sur "Consulter le secret" et noter le "Client Secret" qui s'affiche.

### Activation et configuration du plugin

* Accéder aux options du plugin sur le site Lodel de la revue, via l'onglet "Administration" > "Plugins".
* Activer le plugin `legifrance`.
* Cliquer sur "Configurer" et renseigner les champs "Client ID" et "Client Secret" avec les valeurs notées à l'étape précédente.

## Crédits et financement

Ce projet a été développé par le [collectif Edinum](https://edinum.org) pour les Bibliothèques universitaires de l'Université Jean Moulin Lyon 3. Il a été financé par l'Université Jean Moulin Lyon 3.

Le collectif Edinum a accepté de publier son code source sous licence libre GPL3 sans contrepartie, affirmant ainsi son engagement en faveur du logiciel libre.

* Développement : Thomas Brouard

## Licence

**2022, Edinum.org**

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
