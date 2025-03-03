# Flight Rotation Project

This project is built using React, TypeScript, and Vite.

## Assumptions

- There are no flights departing from the aircraft base, so the first one is going to be empty.
- We need to block the following 20 minutes after the arrival for the turnaround time.
- The destination of a flight determines the origin of the next one.
- Utilization will be displayed with one decimal case for better readability.

## Focus on v1

- Retrieve the list of the aircraft and flights from the API.
- Allow users to choose an aircraft, add and remove flights from its rotation.
- Add validations to avoid overlapping flights and teleporting aircraft.
- Filter the list of flights based on the last destination and arrival time in the rotation for the current aircraft.

## Things to Improve in v2

- Improve the functionality when removing a flight (deleting all the subsequent flights from the rotation).
- Custom alert messages (toasts at the top).
- Improve file structure and code separation (maybe remove some of the utility functions from providers and create custom hooks for them, also import styled components as objects from separate files).
- Better loader indicators.
- Hire a UX/UI designer to create a better layout :)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ahcfonseca/flightrotation.git
   cd flightrotation
   ```

2. Install the dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

## Running the Project

To run the project locally, use the following command:

```sh
npm run dev
# or
yarn dev
```
