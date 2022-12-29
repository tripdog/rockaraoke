const AIRTABLE_API_KEY = 'keyBOHvJMQ83qrxYK';
const AIRTABLE_ENDPOINT = 'https://api.airtable.com/v0/appSKfLI8nR5HYQRi';

const board = document.querySelector('.Board');
const loader = document.querySelector('.loader');

const fetchAirtableData = async (path) => {
    const res = await fetch(`${AIRTABLE_ENDPOINT}/${path}`, {
        headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
    });
    return res.json();
};

const fetchAllSongs = async () => {
    let allSongsData = [];
    let offset = '';

    do {
        const res = await fetchAirtableData(`2021%20Song%20List?view=Grid%20view&offset=${offset}`);
        const records = res.records.map((record) => ({
            SONG: record.fields.SONG,
            ARTIST: record.fields.ARTIST,
            id: record.id,
        }));
        allSongsData = allSongsData.concat(records);
        offset = res.offset;
    } while (offset);

    return allSongsData;
};

const addToAirtable = async (name, arr) => {
    const records = arr.map((item) => ({
        fields: {
            id: item.id,
            'song title': item.SONG,
            Artist: item.ARTIST,
            Name: name,
        },
    }));

    const data = { records };

    const res = await fetchAirtableData('Name%20and%20Song%20Title', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return res;
};

const fetchBoard = async () => {
    loader.style.display = 'flex';
    const res = await fetchAirtableData('Name%20and%20Song%20Title');
    return res;
};

const refreshBoard = async () => {
    try {
        const data = await fetchBoard();
        loader.style.display = 'none';
        board.innerHTML = '';
        data.records.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'divTableRow';
            div.innerHTML = `
        <div class="divTableCell">${item.fields.Name}</div>
        <div class="divTableCell">${item.fields['song title']}</div>
        <div class="divTableCell">${item.fields.Artist}</div>
      `;
            board.appendChild(div);
        });
    } catch (error) {
        console.error(error);
    }
};

async function fetchData() {
    const allSongs = await fetchAllSongs();
    return allSongs;
}

