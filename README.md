# NewHire WorkLog API

A simple JSON server API to manage and mock WorkLog data for development and testing.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Structure](#data-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About

This project uses [json-server](https://github.com/typicode/json-server) to quickly mock a REST API for WorkLog data, enabling frontend development without a real backend.

---

## Features

- RESTful API endpoints to perform CRUD operations on WorkLog entries
- Custom route rewrites to support `/api/v1/` namespace
- Example data for quick testing

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kseow4/newhire.git
   cd newhire

2. Install dependencies:

   ```bash
   npm install

## Usage

Start the server:

   ```bash
   npm start
   ```

The server runs at: http://localhost:3000
Example endpoint: http://localhost:3000/api/v1/WorkLog

## API-Endpoints

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/v1/WorkLog`     | List all work log entries   |
| GET    | `/api/v1/WorkLog/:id` | Get a single work log entry |
| POST   | `/api/v1/WorkLog`     | Create a new work log entry |
| PUT    | `/api/v1/WorkLog/:id` | Update an existing work log |
| DELETE | `/api/v1/WorkLog/:id` | Delete a work log entry     |

## Data Structure

Each WorkLog entry has the following format:
{
  "Week": "08/23/2021 - 08/27/2021",
  "Logs": [
    {
      "date": "August 23rd",
      "hours": "07:30 - 17:30",
      "activity": [],
      "id": "0"
    }
  ],
  "Accomplished": [],
  "Planned": [],
  "Questions": [],
  "id": "00"
}

## Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).