# Description des erreurs lors de scénarion non prévu par les équipes de @nrwl et leur correction

les scripts @nrwl sont presque parfait !!

Ils nous permettent de commencer rapidement en configurant les différents types de projets que vous souhtaité.

Ces scripts permettent également une expérience developpeur extra-ordinaire.

Mais voilà, parfois cela ne se passe pas comme voulu.

Voici donc une liste de scénario, que j'ai rencontré, qui n'ont pas fonctionné par defaut et qui ont nécessité une petite modification.

## L'erreur du débutant

**Symptôme :**

- vous avez une monorepo (créé avec `npx create-nx-workspace`)
- vous voulez l'organiser en workspace avec yarn
  - vous avez modifiez le package.json racine pour yarn
    > c'est-à-dire : `workspaces: [ "./libs/* ]`
- La commande `yarn workspace @boobafetes/design-system add @boobafetes/core` provoque une erreur

**Correction :**

- retirer la configuration du package.json racine (eg workspace)
- importer votre lib directement dans votre code

```[javascript]
// projet du fichier 'design-system'
// loalisation du fichier : ./libs/design-system/...
import { infra } from '@boobafetes/infra';
import styles from './design-system.module.scss';

/* eslint-disable-next-line */
export interface DesignSystemProps {}

export function DesignSystem(props: DesignSystemProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DesignSystem!</h1>
      <div>we are using {infra()}!</div>
    </div>
  );
}

export default DesignSystem;

```

- ajouter la lib dans la liste de la propriété 'external' de votre fichier project.json

```[json]
{
  "name": "design-system",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/design-system/src",
  "projectType": "library",
  "tags": [],
  "targets": {
    "build": {
      "executor": "@nrwl/web:rollup",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/libs/design-system",
        "tsConfig": "libs/design-system/tsconfig.lib.json",
        "project": "libs/design-system/package.json",
        "entryFile": "libs/design-system/src/index.ts",
        "external": [
          "react/jsx-runtime",
          "@boobafetes/core",
          "@boobafetes/infra"
        ],
        "rollupConfig": "@nrwl/react/plugins/bundle-rollup",
        "compiler": "babel",
        "assets": [
          {
            "glob": "libs/design-system/README.md",
            "input": ".",
            "output": "."
          }
        ]
      }
    },
```

et c'est tout !!!!
retirer tout ce que vous avez fait !!

**Explication :**

2 choses à comprendre :

1. pour un monorepos, la bonne pratique est de n'utiliser que le package.json pour ajouter des dépendances.
   > Cela vous garanti que vous n'utilisez pas deux versions d'une même dépendence et donc de créer des bugs difficiles à corriger
2. le workspace est géré par NX, donc effectuer une config pour yarn c'est cassé les scripts de NX

## @nrwl/react:lib : test en echec lorsque la lib utilise un package local

**Symptôme :**

- un composant utilise une librairie local (ex : @boobafetes/design-system importe @boobafetes/infra)
- le(s) test(s) en echec indique un fichier ts
  - ce fichier devrait avoir été compilé en JS

**Correction :**

- créez un fichier babel.config.json
- recopiez le contenu du fichier .babelrc dans le fichier babel.vonfig.json

**Explication :**

le fichier babel.config.json est utilisé lors de l'utilisation d'un monorepo ET pour compiler les dépendances tel que les node_modules ou vos libraries locales

documentation : https://babeljs.io/docs/en/configuration
