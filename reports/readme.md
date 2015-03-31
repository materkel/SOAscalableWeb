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
**GET:**```
curl -i -u wanda:partyhard2000 http://localhost:3003/reports/by-location
```
