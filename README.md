# Employee Management System

[![Watch the demo](https://github.com/rdeswal/employee-management-system/blob/main/demo/demo.png)](https://github.com/rdeswal/employee-management-system/blob/main/demo/Screen-Recording.mp4)

## Project Overview

Full-stack Employee Management Application with React frontend and Node.js/Express backend.

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MySQL Database

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://your-repo-url.git
cd employee-management
```

### 2. Setup Backend

```bash
cd server
npm install
```

### 3. Setup Frontend

```bash
cd client
npm install
```

### 4. Database Configuration

- Start mysql instance - sudo systemctl start mysql
- Log into MYSQL using terminal - sudo mysql -u root -p
- Create MySQL database named `employee_management` - CREATE DATABASE employee_management;

### 5. Run Application

#### Start Backend (localhost:5000)

```bash
cd ../server
npm start
```

#### Start Frontend (localhost:3000)

```bash
cd ../client
npm start
```
