import Airtable from 'airtable';

// Replace these with your Airtable API key and base ID
const API_KEY = 'patnk2jMelLPdlME9.9b0bf68cc345cca8c8a5580d31f367054bc6997248f457eeafa94b1457a4f1e4';
const BASE_ID = 'app7DZcFXwbGyZTxT';
const TABLE_ID = 'tblkXHeRXjONrDdfB'; // The name of your table

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

export const fetchPosts = async () => {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.records;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export const fetchPostById = async (id) => {
    const record = await base(TABLE_ID).find(id);
    return {
        id: record.id,
        title: record.get('title'),
        body: record.get('body'),
        date: record.get('date'),
        img: record.get('img'),
        content: record.get('Content')
    };
};