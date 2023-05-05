This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Overview

This Twitter clone project aims to provide a similar user experience and functionality as the real Twitter platform. The project is built using Next.js, a popular React framework for building server-side rendered web applications. The project also uses a number of other technologies and libraries, including TypeScript, Tailwind CSS.

The project features a responsive design that adapts to different screen sizes, allowing users to access the platform on both desktop and mobile devices. Users can sign up for an account, log in, and create tweets. They can also view other users' tweets, like and retweet tweets, and follow other users.

This project is an Twitter clone that feature the same functionality as the real Twitter as much as possible

## Production Website

The project is delopyed on Vercel with the link:
https://csci3100-tweeeter.vercel.app/

## Running the Project

To run the project on your local development server, follow these steps:

1. Clone the project repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Run npm install to install the project dependencies.
4. Run npm run dev to start the development server.
5. Open http://localhost:3000 in your browser to see the project.

## Project Structure

The project structure is based on the standard Next.js project structure, with additional folders and files added for specific functionality.

- src/pages/ - Contains the application pages.
- src/components/ - Contains reusable React components used throughout the application.
- src/styles/ - Contains global styles for the application.
- src/pages/api - Contains the api routes can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
