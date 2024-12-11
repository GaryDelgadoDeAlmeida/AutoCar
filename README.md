# Fuel Simulator

Ce projet est un projet perso basé sur mes besoins actuels. Dans l'optique d'achat d'un bolide, j'ai besoin de déterminé combien me couterait un plein d'essence sur 1 semaine, 1 mois et 1 an. Elle me permettra également de déterminé à quel sauce je serai mangé mais aussi, déterminé la viabilité de l'achat d'un bolide sur le long terme (et donc combien je devrai dépensé dans un contexte d'une utilisation quotidienne). Durant la pandémie de la COVID-19 et de l'inflation, les prix du carburant n'ont fait qu'augmentés, atteignant ainsi une tarification record dans l'Hézagone.

## Installation

Pour installer les différents package nécessaire à l'utilisation de React:
```bash
npm install sass sass-loader react react-dom react-router-dom axios prop-types
```

### Base de données

Si la base de données n'est pas créer
```bash
symfony console doctrine:database:create
```

Ensuite, une fois la BDD créer, il faut maintenant générer les migrations s'il ne sont pas déjà générer. Par défault, les fichiers de migrations sont stockés dans le répertoire migrations à la racine du projet Symfony.
```bash
symfony console m:migration
```

Une fois les fichiers de migration générer, il faut les executer. Pour faire cela, il faut aller à la racine du projet Symfony, puis executer la commande suivante :
```bash
symfony console doctrine:migration:migrate
```

## Authentification

Symfony bundle:
```bash
composer require lexik/jwt-authentication-bundle
```

Une fois que la dépendance a été ajouté, il faudra maintenant générer une clé. Cette clé sera ensuite utilisé pour générer les token qui seront envoyer aux utilisateurs de la plateforme. Voici la commande pour générer ces clés :
```bash
php bin/console lexik:jwt:generate-keypair
```

Une fois la commande ci-dessus lancée, elle va créer un sous-dossier jwt dans le dossier config. Dans ce sous-dossier, on aura 2 fichiers, ces 2 fichiers sont les clés privés et publics qui seront utlisé dans les actions de génération du token. A ce niveau, on a rien de plus.

Il faudra maintenant configurer le fichier packages/security.yaml. Je recommande d'utiliser la doc de symfony pour configurer la connexion par token ou de regarder la configuration dans mes autres projets utilisant cette méthode de connexion

## Commandes utiles

Voici ci-joint les commandes qui débloque quand le besoin ce présente

### Github

Dans le cas où une commande a été déjà `commit` par erreur, voici des commandes à utiliser en fonction de la situation rencontrée.

IF you have NOT pushed your changes to remote
```bash
git reset HEAD~1
```
ELSE you have pushed your changes to remote
```bash
git revert HEAD
```

Dans un contexte où un repo GIT aurait été créer mais qu'elle contiendrait déjà des fichiers, voici la commande a éxecuter :
```bash
git pull --allow-unrelated-histories
```

### Générer un mot de passe hashé

```bash
symfony console security:hash-password
```

### Commandes internes

Pour importer les données de vehicle d'une API, veuillez utiliser la commande suivante :
```bash
php -d memory_limit=-1 bin/console app:import-vehicules
```

Étant donnée que l'importer est beaucoup trop lourd, j'ai utiliser l'attribut `memory_limit=-1` pour ne pas limiter la mémoire PHP et continuer l'import jusqu'à la fin.

## Issues

Lors de l'installation de symfony, le package `AssetMapper` (c'est l'équivalent de `webpack-encore`) est automatiquement installé. Pour le désinstaller de symfony :
```bash
composer remove symfony/asset-mapper
```

Pour installer le package webpack-encore:
```bash
composer require symfony/webpack-encore-bundle
```

## API Vehicule

Doc URL : https://www.fueleconomy.gov/feg/ws/index.shtml
API URL : https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records

### Infos complémentaires

Pour utiliser l'API, aucune clé d'API est nécessaire. C'est une API de libre de service, compéhensible (même pour quelqu'un comme moi) et assez compléte sur les informations fournis.

### Définition des différents attributs de l'api

<h4>vehicle</h4>

- <em>atvtype</em> - type of alternative fuel or advanced technology vehicle
- <em>barrels08</em> - annual petroleum consumption in barrels for fuelType1 (1)
- <em>barrelsA08</em> - annual petroleum consumption in barrels for fuelType2 (1)
- <em>charge120</em> - time to charge an electric vehicle in hours at 120 V
- <em>charge240</em> - time to charge an electric vehicle in hours at 240 V
- <em>city08</em> - city MPG for fuelType1 (2), (11)
- <em>city08U</em> - unrounded city MPG for fuelType1 (2), (3)
- <em>cityA08</em> - city MPG for fuelType2 (2)
- <em>cityA08U</em> - unrounded city MPG for fuelType2 (2), (3)
- <em>cityCD</em> - city gasoline consumption (gallons/100 miles) in charge depleting mode (4)
- <em>cityE</em> - city electricity consumption in kw-hrs/100 miles
- <em>cityMpk</em> - city miles per Kilogram for Hydrogen
- <em>cityUmpk</em> - unrounded city miles per Kilogram for Hydrogen
- <em>cityUF</em> - EPA city utility factor (share of electricity) for PHEV
- <em>co2</em> - tailpipe CO2 in grams/mile for fuelType1 (5)
- <em>co2A</em> - tailpipe CO2 in grams/mile for fuelType2 (5)
- <em>co2TailpipeAGpm</em> - tailpipe CO2 in grams/mile for fuelType2 (5)
- <em>co2TailpipeGpm</em>- tailpipe CO2 in grams/mile for fuelType1 (5)
- <em>comb08</em> - combined MPG for fuelType1 (2), (11)
- <em>comb08U</em> - unrounded combined MPG for fuelType1 (2), (3)
- <em>combA08</em> - combined MPG for fuelType2 (2)
- <em>combA08U</em> - unrounded combined MPG for fuelType2 (2), (3)
- <em>combE</em> - combined electricity consumption in kw-hrs/100 miles
- <em>combMpk</em> - combined miles per Kilogram for Hydrogen
- <em>combUmpk</em> - unrounded combined miles per Kilogram for Hydrogen
- <em>combinedCD</em> - combined gasoline consumption (gallons/100 miles) in charge depleting mode (4)
- <em>combinedUF</em> - EPA combined utility factor (share of electricity) for PHEV
- <em>cylinders</em> - engine cylinders
- <em>displ</em> - engine displacement in liters
- <em>drive</em> - drive axle type
- <em>emissionsList</em>
- <em>engId</em> - EPA model type index
- <em>eng_dscr</em> - engine descriptor; see http://www.fueleconomy.gov/feg/findacarhelp.shtml#engine
- <em>evMotor</em> - electric motor (kw-hrs)
- <em>feScore</em> - EPA Fuel Economy Score (-1 = Not available)
- <em>fuelCost08</em> - annual fuel cost for fuelType1 ($) (7)
- <em>fuelCostA08</em> - annual fuel cost for fuelType2 ($) (7)
- <em>fuelType</em> - fuel type with fuelType1 and fuelType2 (if applicable)
- <em>fuelType1</em> - fuel type 1. For single fuel vehicles, this will be the only fuel. For dual fuel vehicles, this will be the conventional fuel.
- <em>fuelType2</em> - fuel type 2. For dual fuel vehicles, this will be the alternative fuel (e.g. E85, Electricity, CNG, LPG). For single fuel vehicles, this field is not used
- <em>ghgScore</em> - EPA GHG score (-1 = Not available)
- <em>ghgScoreA</em> - EPA GHG score for dual fuel vehicle running on the alternative fuel (-1 = Not available)
- <em>guzzler</em>- if G or T, this vehicle is subject to the gas guzzler tax
- <em>highway08</em> - highway MPG for fuelType1 (2), (11)
- <em>highway08U</em> - unrounded highway MPG for fuelType1 (2), (3)
- <em>highwayA08</em> - highway MPG for fuelType2 (2)
- <em>highwayA08U</em> - unrounded highway MPG for fuelType2 (2),(3)
- <em>highwayCD</em> - highway gasoline consumption (gallons/100miles) in charge depleting mode (4)
- <em>highwayE</em> - highway electricity consumption in kw-hrs/100 miles
- <em>highwayMpk</em> - highway miles per Kilogram for Hydrogen
- <em>highwayUmpk</em> - unrounded highway miles per Kilogram for Hydrogen
- <em>highwayUF</em> - EPA highway utility factor (share of electricity) for PHEV
- <em>hlv</em> - hatchback luggage volume (cubic feet) (8)
- <em>hpv</em> - hatchback passenger volume (cubic feet) (8)
- <em>id</em> - vehicle record id
- <em>lv2</em> - 2 door luggage volume (cubic feet) (8)
- <em>lv4</em> - 4 door luggage volume (cubic feet) (8)
- <em>make</em> - manufacturer (division)
- <em>mfrCode</em> - 3-character manufacturer code
- <em>model</em> - model name (carline)
- <em>mpgData</em> - has My MPG data; see yourMpgVehicle and yourMpgDriverVehicle
- <em>phevBlended</em> - if true, this vehicle operates on a blend of gasoline and electricity in charge depleting mode
- <em>pv2</em> - 2-door passenger volume (cubic feet) (8)
- <em>pv4</em> - 4-door passenger volume (cubic feet) (8)
- <em>rangeA</em> - EPA range for fuelType2
- <em>rangeCityA</em> - EPA city range for fuelType2
- <em>rangeHwyA</em> - EPA highway range for fuelType2
- <em>trans_dscr</em> - transmission descriptor; see http://www.fueleconomy.gov/feg/findacarhelp.shtml#trany
- <em>trany</em> - transmission
- <em>UCity</em> - unadjusted city MPG for fuelType1; see the description of the EPA test procedures
- <em>UCityA</em> - unadjusted city MPG for fuelType2; see the description of the EPA test procedures
- <em>UHighway</em> - unadjusted highway MPG for fuelType1; see the description of the EPA test procedures
- <em>UHighwayA</em> - unadjusted highway MPG for fuelType2; see the description of the EPA test procedures
- <em>VClass</em> - EPA vehicle size class
- <em>year</em> - model year
- <em>youSaveSpend</em> - you save/spend over 5 years compared to an average car ($). Savings are positive; a greater amount spent yields a negative number. For dual fuel vehicles, this is the cost savings for gasoline
- <em>sCharger</em> - if S, this vehicle is supercharged
- <em>tCharger</em> - if T, this vehicle is turbocharged
- <em>c240Dscr</em> - electric vehicle charger description
- <em>charge240b</em> - time to charge an electric vehicle in hours at 240 V using the alternate charger
- <em>c240bDscr</em> - electric vehicle alternate charger description
- <em>createdOn</em> - date the vehicle record was created
- <em>modifiedOn</em> - date the vehicle record was last modified
- <em>startStop</em> - vehicle has stop-start technology (Y, N, or blank for older vehicles)
- <em>phevCity</em> - EPA composite gasoline-electricity city MPGe for plug-in hybrid vehicles
- <em>phevHwy</em> - EPA composite gasoline-electricity highway MPGe for plug-in hybrid vehicles
- <em>phevComb</em> - EPA composite gasoline-electricity combined city-highway MPGe for plug-in hybrid vehicles
- <em>basemodel</em> - base model name

<h4>emissions</h4>
- emissionsList
    - emissionsInfo
        - <em>efid</em> - engine family ID
        - <em>id</em> - vehicle record ID (links emission data to the vehicle record)
        - <em>salesArea</em> - EPA sales area code
        - <em>score</em> - EPA 1-10 smog rating for fuelType1
        - <em>scoreAlt</em> - EPA 1-10 smog rating for fuelType2
        - <em>smartwayScore</em> - SmartWay Code
        - <em>standard</em> - Vehicle Emission Standard Code
        - <em>stdText</em> - Vehicle Emission Standard

<h4>fuel prices</h4>

- fuelPrices
    - <em>midgrade</em> - $ per gallon of midgrade gasoline(9)
    - <em>premium</em> - $ per gallon of premium gasoline(9)
    - <em>regular</em> - $ per gallon of regular gasoline(9)
    - <em>cng</em> - $ per gallon of gasoline equivalent (GGE) of compressed natural gas(10)
    - <em>diesel</em> - $ per gallon of diesel(9)
    - <em>e85</em> - $ per gallon of E85(10)
    - <em>electric</em> - $ per kw-hr of electricity(10)
    - <em>lpg</em> - $ per gallon of propane(10)

<h4>yourMpgVehicle - summary of all My MPG data for this vehicle</h4>

- <em>avgMpg</em> - harmonic mean of average MPG shared by fueleconomy.gov users
- <em>cityPercent</em> - average % city miles
- <em>highwayPercent</em> - average % highway miles
- <em>maxMpg</em> - maximum user average MPG
- <em>minMpg</em> - minimum user average MPG
- <em>recordCount</em> - number of records for this vehicle
- <em>vehicleId</em> - vehicle record id (links My MPG data to the vehicle record)

<h4>yourMpgDriverVehicle - summary of driver data reported for this vehicle</h4>

- <em>cityPercent</em> - user average % city miles
- <em>highwayPercent</em> - user average % highway miles
- <em>lastDate</em> - date records were last updated (yyyy-mm-dd)
- <em>mpg</em> - average MPG
- <em>state</em> - state of residence
- <em>vehicleId</em> - vehicle record ID (links My MPG data to the vehicle record)

<h4>Footnotes</h4>

(1) 1 barrel = 42 gallons. Petroleum consumption is estimated using the Department of Energy's GREET model and includes petroleum consumed from production and refining to distribution and final use. Vehicle manufacture is excluded.

(2) The MPG estimates for all 1985–2007 model year vehicles and some 2011–2016 model year vehicles have been updated.

(3) Unrounded MPG values are not available for some vehicles.

(4) This field is only used for blended PHEV vehicles.

(5) For model year 2013 and beyond, tailpipe CO2 is based on EPA tests. For previous model years, CO2 is estimated using an EPA emission factor. -1 = Not Available.

(6) For PHEVs this is the charge depleting range.

(7) Annual fuel cost is based on 15,000 miles, 55% city driving, and the price of fuel used by the vehicle.

(8) Interior volume dimensions are not required for two-seater passenger cars or any vehicle classified as truck which includes vans, pickups, special purpose vehicles, minivan and sport utility vehicles.

(9) Fuel prices for gasoline and diesel fuel are from the Energy Information Administration and are usually updated weekly.

(10) Fuel prices for E85, LPG, and CNG are from the Office of Energy Efficiency and Renewable Energy's Alternative Fuel Price Report and are updated quarterly.

(11) For electric and CNG vehicles this number is MPGe (gasoline equivalent miles per gallon).