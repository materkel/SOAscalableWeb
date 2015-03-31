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
