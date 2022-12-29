let all_songs_data = [];

async function fetchMore(current_data) {
  const res = await fetch(`https://api.airtable.com/v0/appSKfLI8nR5HYQRi/2021%20Song%20List?view=Grid%20view&offset=${current_data.offset}`, {
    headers: {
      Authorization: `Bearer keyBOHvJMQ83qrxYK`,
    },
  });
  current_data = await res.json();
  return current_data;
}

async function pagination(current_data) {
  while (current_data.offset) {
    data = await fetchMore(current_data);
    current_data = data;

    let tempArr = [];

    current_data.records.forEach((item) => {
      let current_item = {
        SONG: item.fields.SONG,
        ARTIST: item.fields.ARTIST,
        id: item.id,
      };
      tempArr.push(current_item);
    });
    all_songs_data = all_songs_data.concat(tempArr);
  }
  all_songs = await all_songs_data;
  return all_songs;
}

async function fetchData() {
  const res = await fetch("https://api.airtable.com/v0/appSKfLI8nR5HYQRi/2021%20Song%20List?view=Grid%20view", {
    headers: {
      Authorization: `Bearer keyBOHvJMQ83qrxYK`,
    },
  });
  const data = await res.json();
  all_songs_data = [];

  data.records.forEach((item) => {
    let current_item = {
      SONG: item.fields.SONG,
      ARTIST: item.fields.ARTIST,
      id: item.id,
    };
    all_songs_data.push(current_item);
  });
  current_data = data;
  all_songs = await pagination(current_data);

  return all_songs;
}

async function addToAirtable(name, arr) {
  let records_arr = arr.map((item) => {
    return {
      fields: {
        id: item.id,
        "song title": item.SONG,
        Artist: item.ARTIST,
        Name: name,
      },
    };
  });

  let data = {
    records: records_arr,
  };

  const post_data = await fetch("https://api.airtable.com/v0/appSKfLI8nR5HYQRi/Name%20and%20Song%20Title", {
    method: "POST",
    headers: {
      Authorization: `Bearer keyBOHvJMQ83qrxYK`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return post_data;
}

async function fetchBoard() {
  loader.style.display = "flex";
  const board = await fetch("https://api.airtable.com/v0/appSKfLI8nR5HYQRi/Name%20and%20Song%20Title", {
    headers: {
      Authorization: `Bearer keyBOHvJMQ83qrxYK`,
    },
  });
  return board;
}

const board = document.querySelector(".Board");
const loader = document.querySelector(".loader");
const refreshBoard = () => {
  fetchBoard().then((res) =>
    res.json().then((data) => {
      loader.style.display = "none";
      board.innerHTML = "";
      data.records.forEach((item) => {
        const div = document.createElement("div");
        div.className = "divTableRow";
        div.innerHTML = `
                          <div class="divTableCell">${item.fields.Name}</div>
                          <div class="divTableCell">${item.fields["song title"]}</div>
                          <div class="divTableCell">${item.fields.Artist}</div>
                            `;
        board.appendChild(div);
      });
    })
  );
};

refreshBoard();
