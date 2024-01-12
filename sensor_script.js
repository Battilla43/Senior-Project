import * as fs from 'fs';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';

const filePath = "./sensor_data.json"; // change to filepath

async function fetchData(filePath) {
    async function updateData() {
        const data = fs.readFileSync(filePath, 'utf8');
        const sensorData = JSON.parse(data);

        const uri = 'mongodb://localhost:27017/testUser';
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();
            const db = client.db('testUser');
            const sensorCollection = db.collection('sensor');

            for (const sensor of sensorData.sensors) {
                const links = await fetchDataFromSensor(sensor.url);
                sensor.links = links

                await sensorCollection.insertOne(sensor);
            }
        } finally {
            await client.close();
        }
    }

    await updateData();

    setInterval(async () => {
        const data = fs.readFileSync(filePath, 'utf8');
        const sensorData = JSON.parse(data);
    
        const client = new MongoClient('mongodb://localhost:27017/testUser', { useNewUrlParser: true, useUnifiedTopology: true });
    
        try {
            await client.connect();
            const db = client.db('testUser');
            const sensorCollection = db.collection('sensor');
    
            for (const sensor of sensorData.sensors) {
                const additionalLinks = await fetchDataFromSensor(sensor.url);
    
                await sensorCollection.updateOne(
                    { id: sensor.id },
                    {
                        $push: {links: additionalLinks} 
                    }
                );
    
                
            }
        } finally {
            await client.close();
        }
    }, 3600000);
    
}

async function fetchDataFromSensor(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    let links = [];
    links.push(jsonData.features[0].properties.data[0].time)
    links.push(jsonData.features[0].properties.data[0].vars[0].value)
    return links;
}

fetchData(filePath);









