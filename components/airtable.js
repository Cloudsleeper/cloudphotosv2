import Airtable from 'airtable';

// Access environment variables
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_ID = import.meta.env.VITE_AIRTABLE_TABLE_ID;

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