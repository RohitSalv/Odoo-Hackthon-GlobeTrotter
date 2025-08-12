# GlobeTrotter — Personalized Travel Planning Application

Welcome to the **GlobeTrotter** project, developed as part of the hackathon challenge to build an intelligent and user-centric travel planning platform. This full-stack application empowers users to create, manage, and share personalized multi-city travel itineraries with an interactive and seamless experience.

---

## Project Overview

GlobeTrotter is designed to simplify the complexity of multi-city travel planning by providing users with intuitive tools to:

- Add and manage travel stops, activities, and durations
- Explore cities and activities through advanced search features
- Estimate and monitor trip budgets with clear cost breakdowns
- Visualize travel plans with timelines and itinerary views
- Share trip plans publicly or with friends
- Benefit from AI-driven features for enhanced trip suggestions and planning assistance

The platform leverages a robust **Spring Boot** backend with a **MySQL** relational database, a dynamic **Angular** frontend, and integrates two AI tools to make trip planning smarter and easier for users.

---

## Features

- **User Authentication:** Secure login/signup with JWT-based session management for enhanced security.
- **Trip Management:** Create, edit, and delete multi-city trips with flexible itinerary building.
- **City & Activity Search:** Discover destinations and curated activities with filters and rich metadata.
- **Budget Tracking:** Automatic cost estimations broken down by category with helpful visual charts.
- **Interactive Itinerary:** Day-wise timeline and horizontal views to organize activities and travel stops.
- **Trip Sharing:** Share itineraries publicly with a read-only view or copy trips for personal use.
- **User Profile Management:** Update personal details and preferences.
- **AI Integration:** Two AI-powered features assist users in planning smarter, including personalized suggestions and cost optimization.

---

## Current Limitations & Known Issues

- **Registration OTP Verification:** Due to recent framework version updates, the OTP verification functionality during user registration is currently unstable and under investigation.
- **Missing Features:**
  - The **Admin Dashboard** for platform analytics and user management is yet to be implemented.
  - The **Community Tab** for user discussions and trip plan sharing is planned but not yet developed.
  - The **Calendar View** of schedules is currently only available in a horizontal timeline format; vertical calendar view is pending.
  
Despite these limitations, core functionalities for trip creation, itinerary management, and AI-enhanced planning are fully operational.

---

## Technology Stack

- **Backend:** Spring Boot (Java), REST APIs
- **Frontend:** Angular, TypeScript, HTML, CSS (Tailwind CSS)
- **Database:** MySQL
- **Security:** JWT token-based authentication and authorization
- **AI Tools:** Integrated AI services for personalized travel suggestions and budgeting assistance

---

## Entity Relationship Diagram (ERD)

Below is the ER diagram illustrating the main database tables and their relationships:

![ER Diagram](./erh.png)

---

## Getting Started

Please refer to the project repository for detailed instructions on setup, running the backend and frontend servers, and API usage.

[GlobeTrotter GitHub Repository](https://github.com/RohitSalv/Odoo-Hackthon-GlobeTrotter.git)

---

## Future Enhancements

We plan to enhance the platform with:

- Fully functional **Admin Dashboard** for monitoring and managing app usage
- A vibrant **Community Tab** to encourage user interaction and shared travel experiences
- Improved **Calendar Views** with drag-and-drop scheduling and better visualization
- Strengthened OTP and registration flows post framework updates

---

## Acknowledgements

This project was developed as part of the Odoo Hackathon initiative with a passionate team focused on revolutionizing personalized travel planning through technology and AI.

---

If you have questions or want to contribute, feel free to open issues or pull requests on the repository.

Thank you for exploring GlobeTrotter — where planning your perfect trip becomes part of the adventure!
