## SOA Workshop Final Assignment

This is my submission for the final challenge of the SOA Workshop in Scalable Web at FH Salzburg.

I used NodeJS with Express for the implementation.
For Testing I used [Supertest](https://github.com/visionmedia/supertest) + [Jasmine](https://github.com/jasmine/jasmine)

## Intro
The goal was to create a system that is used to track the inventory of a larger corporation.

The solution had to come in 4 services:

* A user management system
* An item tracking system
* A system to manage the different locations
* A reporting system

The Services are all completely independent from each other. The user-management system is never called from the end user directly (the services query it to validate the user data).

Further Requirements can be found
[here](https://github.com/nesQuick/2015-salzburg-soa-workshop/tree/master/challenges/final)

## Installation and startup

The Services are all in different folders and can be managed seperately via a config file. (e.g. you can change the **ports** there, if you need to).There's also an extra package.json file for each service.
But for your convenience, you can just run **NPM INSTALL** in the main directory, to play around with all services.

start up the services with following commands:
*outside of service directory:*
```
node ./item-tracking/server.js
```

*inside service directory:*
```
npm start
```

## Testing

run tests with **$npm test** or **$jasmine** in the respective service directories.

```
npm test
```
```
jasmine
```

You can test the services without depending on user authentication. To do so, change the environment in the config.js file of the respective service to **testing**. Keep in mind, that the reports service still can't be tested without starting up the locations and item-tracking services first.

## Usage:

### User-Management:
runs at Port: 3000, localhost:3000/user

supports GET **e.g.**

**GET:**
```
curl -i -u wanda:partyhard2000 http://localhost:3000/user
```

**available user/password combinations:**

wanda: partyhard2000  
paul: thepanther  
anne: flytothemoon  

### Location-Management:
runs at Port: 3001, localhost:3001/locations

a location looks like this:

```json
{
  "name": "Office Alexanderstraße",
  "address": "Alexanderstraße 45, 33853 Bielefeld, Germany",
  "id": 0
}
```

supports GET, POST & DELETE **e.g.**

**GET:**
```
curl -i -u wanda:partyhard2000 http://localhost:3001/locations
```
**POST:**
```
curl -i -X POST -u wanda:partyhard2000 -H "Content-Type: application/json" -d '{ "name":"TestItem", "address":"TestStreet 3424" }' http://localhost:3001/locations
```
**DELETE:**
```
curl -i -X DELETE -u wanda:partyhard2000 http://localhost:3001/locations/0
```
### Item-tracking:
runs at Port: 3002, localhost:3002/items

a item looks like this:

```json
{
  "name": "Johannas PC",
  "location": 0,
  "id": 0
}
```

supports GET, POST & DELETE **e.g.**
**GET:**
```
curl -i -u wanda:partyhard2000 http://localhost:3002/items
```
**POST:**
```
curl -i -X POST -u wanda:partyhard2000 -H "Content-Type: application/json" -d '{ "name":"TestItem", "location":0 }' http://localhost:3002/items
```
**DELETE:**
```
curl -i -X DELETE -u wanda:partyhard2000 http://localhost:3002/items/0
```

### Report System:
runs at Port: 3003, localhost:3003/reports/by-location

Returns a Report with all Locations and Items ordered by Location like this:

```json
[
  {
    "name": "Office Alexanderstraße",
    "address": "Alexanderstraße 45, 33853 Bielefeld, Germany",
    "id": 0,
    "items": [
      {
        "name": "Johannas PC",
        "location": 0,
        "id": 0
      },
      {
        "name": "Johannas desk",
        "location": 0,
        "id": 1
      }
    ]
  },
  {
    "name": "Warehouse Hamburg",
    "address": "Gewerbestraße 1, 21035 Hamburg, Germany",
    "id": 1,
    "items": [
      {
        "name": "Lobby chair #1",
        "location": 1,
        "id": 2
      }
    ]
  }
]
```

supports GET **e.g.**
**GET:**
```
curl -i -u wanda:partyhard2000 http://localhost:3003/reports/by-location
```
