# Dashboard Project

## Table of Contents
- [Project Description](#project-description)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Backend API](#backend-api)
- [Frontend Application](#frontend-application)
- [Functionality](#functionality)
- [Styling](#styling)
- [Database](#database)
- [Potential Enhancements](#potential-enhancements)

---

## Project Description
A dashboard application built with Angular and a Node.js/Express.js backend, providing a REST API for managing users and displaying dynamic real-time data.

## Technologies
- **Frontend:** Angular, TypeScript, RxJS
- **Backend:** Node.js, Express.js
- **Database:** JSON file (for simplicity, can be upgraded to MongoDB)
- **Styling:** CSS

## Project Structure
```
DASHBOARD-PROJECT/
├── .vscode/
│
├── backend/
│   ├── routes/
│   │   ├── users.js
│   ├── database.json
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── tsconfig.json
│
├── frontend/
│   ├── .angular/
│   ├── app/
│   │   ├── components/
│   │   │   ├── chart/
│   │   │   │   ├── chart.component.css
│   │   │   │   ├── chart.component.html
│   │   │   │   ├── chart.component.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.css
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.ts
│   │   │   ├── date/
│   │   │   │   ├── date.component.css
│   │   │   │   ├── date.component.html
│   │   │   │   ├── date.component.ts
│   │   │   ├── line-chart/
│   │   │   │   ├── line-chart.component.css
│   │   │   │   ├── line-chart.component.html
│   │   │   │   ├── line-chart.component.ts
│   │   │   ├── table/
│   │   │   │   ├── table.component.css
│   │   │   │   ├── table.component.html
│   │   │   │   ├── table.component.ts
│   │   │   ├── user-form/
│   │   │   │   ├── user-form.component.css
│   │   │   │   ├── user-form.component.html
│   │   │   │   ├── user-form.component.ts
│   │   ├── services/
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── src/
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   ├── styles.css
│   │   ├── assets/
│   │   │   ├── data.json
│   │   │   ├── images/
├── package.json
├── package-lock.json
├── angular.json
├── tsconfig.app.json
├── tsconfig.json
├── .gitignore
├── README.md
```

## Installation and Setup

### Backend
```sh
cd backend
npm install
node server.js
```
The API will run on `http://localhost:5500`

### Frontend
```sh
cd frontend
npm install
ng serve --open
```
The application will run on `http://localhost:4200`


## Frontend Application
The application consists of multiple components:
- **DashboardComponent** - Main component
- **TableComponent** - Appointment table
- **ChartComponent** - Donut Chart
- **DateComponent** - Date-related functionalities
- **LineChartComponent** - Line chart
- **UserFormComponent** - User form
- **UserListComponent** - User list 

## Functionality
- Displaying a list of users
- Adding, updating, and deleting users
- Interactive dashboard with charts
- Real-time data updates
- Calling users

## Styling
Using pure CSS, with the possibility of extending it using Tailwind or SCSS for better scalability.

## Database
Currently using a JSON file (`database.json`), with an option to migrate to MongoDB for better scalability.

## Potential Enhancements
- Implement authentication (JWT)
- Switch to MongoDB
- Improve UI/UX with Material Design or Tailwind CSS
- Implement WebSockets for better real-time updates

---

This README provides a clear and structured documentation for developers looking to understand and extend the project. 



Author 
Stanislav Křikava
