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
