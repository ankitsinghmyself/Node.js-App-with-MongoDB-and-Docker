# Node.js App with MongoDB and Docker

This is a sample Node.js app that uses MongoDB as its database, and is packaged as a Docker container. The app allows users to create and update "cards" with a name and description.

## Prerequisites

Before you can run this app, you'll need to have the following installed on your machine:

- Docker
- Node.js
- NPM or Yarn

## Installation

1. Clone this repository to your local machine.
2. Navigate to the root directory of the app in a terminal or command prompt.
3. Run `npm install` or `yarn install` to install the app's dependencies.
4. Rename `.env.example` to `.env` and replace the values with your own MongoDB Atlas credentials.

## Running the App Locally

To run the app locally, follow these steps:

1. Make sure Docker is running on your machine.
2. Navigate to the root directory of the app in a terminal or command prompt.
3. Run `docker-compose up` to start the app in a Docker container.
4. Open a web browser and go to `http://localhost:3000` to access the app.

## API Routes

The app has the following API routes:

- `GET /api/cards` - Retrieves a list of all cards.
- `POST /api/cards` - Creates a new card.
- `PUT /api/cards/:id` - Updates an existing card with the specified ID.
- `DELETE /api/cards/:id` - Deletes an existing card with the specified ID.

## Docker Compose Configuration

The app uses Docker Compose to manage the containers. The configuration for the app's container is located in `docker-compose.yml`.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This app is licensed under the MIT License.
