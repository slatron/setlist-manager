## Setlist Manager App

This was built to help my band track common setlists built on our song catalog. It allows us to store songs and add them to setlists. This makes it easy to save and quickly edit setlists as we add songs and play shows.

I am evolving it here to explore building an authenticated app with React and firebase. I'm using fiebase anonymous authentication to provide a basic read-only site. Logging in with an admin password enables all CRUD functions in the React UI.

#### POC Notes

This is currently a POC. UI state is in hardcoded `useState`. The hardcoded band member names and instruments will be moved to the database.

### Main Requirements

- Store songs band can play
- Store setlists of songs
- App starts in guest Readonly mode for selecting and viewing setlists
- Display setlist color-coded by singer or member instrument
- Auth protected admin
- Integrated design with Mike Slater sites
- Logged in users can directly edit setlist page and enter admin section of site
- Drag/Drop UI for setlist editings
- Mobile friendly setlist editing

We need to arrange our setlists minimizing instrument changes for each band member. Color coding should assist in optimizing the setlists.

### Upcoming Features

- Print view
- Admin to update members, instruments, songs, setlists
- [Improve Login Prompt Message](https://trello.com/c/IZxp8R7Z)

## UI Flow - Guest and Admin

If no firebase authentication token exists, user is logged in as an anonymous Guest user. 

Guest users can only view existing setlists.They will be prompted to login if they attempt to use any admin features within the setlist page or navigate to the songs page.

```mermaid
flowchart TD
    Init(Login User Anonymously) --> A[Display Setlist Page]

    A --> B(get setlists)
    B --> C[User Selects List]
    C --> |UserClicks 'Edit'|Edit{Guest?}
    Edit --> |Yes|EditB[Prompt Login]
    Edit --> |No|EditA[Display SetlistAdmin Component]
    C --> D[Display Selected List]
    
    A --> |User clicks 'Songs'|Songs{Guest?}
    Songs --> |No|AdminA[Display Song Admin]
    Songs --> |Yes|AdminB[Prompt Login]

    A --> |User Clicks 'Login'|AuthA[Display Login Form]
    AuthA --> |Success|A
```

## Run This Locally

Clone this repo and run `$ yarn install && npm run dev`

This uses `Vite` to run the application locally

Created with `node v18.16.0`

### Firebase Setup

You will need a [firebase](https://console.firebase.google.com/) instance to run the data for this application. 

From your firebase console project settings, be sure you have a web-based app setup. Copy the `firebaseConfig` const from that page and export it from a new `/src/secrets.js` file.

```javascript
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

### Firebase "Schema"

`data.songs` have `title`, `key` and `singer` keys. There is a key for a for each player in `meta.players` that plays on the song.

`data.songLists` have `title` and `songs`. Songs are the -ids of `data.songs`. Their `int` value is the order of this song in the list.

`data.players` and `data.instruments` are referenced in `song` records. They can be edited by admin users via the songs page.

`data.players` records contain `name` values. `player` records can be linked to an `instrument` in a `song`. 

```json
{
  "data": {
    "songLists": {
      "-songListId": {
        "songs": {
          "-songId": "int"
        },
        "title": "String"
      },
    },
    "songs": {
      "-songId": {
        "id": "-songId",
        "title": "String",
        "key": "String",
        "singer": "-playerId",
        "-playerId": "-instrumentId",
        "-playerId": "-instrumentId"
      },
    },
    "instruments": {
      "-instrumentId": {
        "title": "String"
      }
    },
    "players": {
      "-playerId": {
        "name": "String"
      }
    }
  }
}
```
