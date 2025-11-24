const https = require('https');

const url = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Top level keys:", Object.keys(json));
            if (json.objects && json.objects.countries) {
                console.log("Number of countries:", json.objects.countries.geometries.length);
                console.log("First 5 countries properties:");
                json.objects.countries.geometries.slice(0, 5).forEach(geo => {
                    console.log(JSON.stringify({ id: geo.id, properties: geo.properties }, null, 2));
                });
            } else {
                console.log("Structure unexpected:", Object.keys(json.objects || {}));
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    });
}).on('error', (err) => {
    console.error("Error fetching url:", err);
});
