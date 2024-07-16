# Poster App
## Overview
Poster App is a web application designed to allow users to create, view, and manage posters and comments. Users can sign up, log in, and access a personalized dashboard where they can create new posters, edit or delete their existing posters, and view comments on each poster.

## Features
* Homepage: View all posters with associated user names.
* Login & Signup: User authentication and registration.
* Dashboard: Personalized dashboard where users can manage their posters.
* Post Editor: Edit and delete existing posters.
* Comments: Add comments to posters and view comments from others.
## Installation
### Prerequisites
Ensure you have the following installed on your machine:
* Node.js
* npm (Node Package Manager)
### Steps
1. Clone the repository:
```
git clone git@github.com:swe-thinhnguyen1701/poster-app.git
cd poster-app
```
2. Install dependencies:
```
npm install
```
3. Set up environment variables:

Create a .env file in the root directory and add your environment variables as shown below:
```
DB_NAME= blog_db
DB_USER=your_database_username
DB_PASSWORD=your_database_password
SESSION_SECRET=your_session_secret
```
4. Initialize the database:
```
npm run seed
```
5. Start the application:
```
npm start
```
## Directory Sturcture
```
poster-app/
│
├── controllers/
│   ├── homeRoutes.js
│   ├── dashboardRoutes.js
│   └── commentRoutes.js
│
├── models/
│   ├── Poster.js
│   ├── User.js
│   └── Comment.js
│
├── public/
│   ├── css/
│   └── js/
│
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── homepage.handlebars
│   ├── login.handlebars
│   ├── signup.handlebars
│   ├── dashboard.handlebars
│   ├── post-editor.handlebars
│   └── post-comment.handlebars
│
├── .env
├── server.js
├── package.json
└── README.md
```

## Routes
### Home Routes
* **GET /:** Fetches all posters and renders the homepage.
* **GET /login:** Renders the login page.
* **GET /signup:** Renders the signup page.

### Dashboard Routes
* **GET /dashboard:** Fetches user-specific posters and renders the dashboard.
* **GET /dashboard/post/:id:** Fetches a specific post by ID and renders the post editor.
* **POST /dashboard:** Creates a new poster.
* **PUT /dashboard/post/:id:** Updates an existing poster by ID.
* **DELETE /dashboard/post/:id:** Deletes a poster by ID.
Comment Routes
* **POST /comment:** Creates a new comment for a poster.

## Middleware
### Auth Middleware
**auth.js:** Middleware to protect routes that require authentication.

## Models
### Poster
Attributes:
* title: String
* content: Text
* user_id: Foreign Key (references User)

### User
Attributes:
* user_name: String
* password: String (hashed)

### Comment
Attributes:
* content: Text
* user_id: Foreign Key (references User)
* poster_id: Foreign Key (references Poster)

## Views
### Layouts
* **main.handlebars:** Main layout file.

### Partials
* header.handlebars
* footer.handlebars

### Pages
* **homepage.handlebars:** Homepage view.
* **login.handlebars:** Login page view.
* **signup.handlebars:** Signup page view.
* **dashboard.handlebars:** Dashboard view.
* **post-editor.handlebars:** Post editor view.
* **post-comment.handlebars:** Post comment view.

## Contributing
1. Fork the repository.
2. Create your feature branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a pull request.

## Contact
Thinh Nguyen(Charles) - thinhtrung.nguyen1701@gmail.com or charles.nguyen1701@gmail.com

Project Link: git@github.com:swe-thinhnguyen1701/poster-app.git