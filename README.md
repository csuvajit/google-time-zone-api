# Google Time Zone

Node.js Warpper for Google Time Zone API

## Example

### Request

```js
const client = new Client('--Google API--');
client.search('Kolkata').then(console.log);
```
### Response

```json
{
  "dstOffset": 0,
  "rawOffset": 19800,
  "status": "OK",
  "timeZoneId": "Asia/Calcutta",
  "timeZoneName": "India Standard Time"
}
```
