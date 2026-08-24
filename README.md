# BCD — Bank of Commerce and Development

## Confidentiality Notice

The original implementation of this project was developed for the **Bank of Commerce and Development (BCD)** and is hosted in a private client repository. This public sample is provided for portfolio and technical evaluation purposes and does not contain confidential client data, credentials, production secrets, or other sensitive information. The implementation and architecture presented here have been adapted where necessary to respect the confidentiality of the original project.

## Overview

This project is a full-stack web application developed for the **Bank of Commerce and Development (BCD)**.

I worked as the primary full-stack developer on the project and was responsible for most of the implementation, from designing and developing the application features to integrating the frontend and backend and testing the system. I also worked on the deployment and infrastructure aspects of the project, with some assistance on the DevOps side.

The project gave me end-to-end experience across the application stack, including frontend development, backend/API development, database integration, authentication, middleware, file handling, and deployment.

## My Role

I was responsible for the majority of the development of the system, working across both the frontend and backend.

My responsibilities included:

* Designing and implementing application features
* Developing the backend and REST APIs
* Developing and integrating frontend functionality
* Designing and working with the database models
* Implementing authentication and authorization functionality
* Developing middleware for request processing and access control
* Implementing API routes and business logic
* Handling file uploads and related backend functionality
* Integrating frontend and backend components
* Debugging issues across the full application stack
* Testing application functionality and API behavior
* Working with Git and the development workflow
* Preparing the application for deployment
* Working with Docker/infrastructure and receiving DevOps support where required

## Technology Stack

### Backend

* Node.js
* Express.js
* REST APIs
* JavaScript
* Middleware-based architecture

### Frontend

* JavaScript
* Web-based frontend application
* Client-side API integration

### Database

* Database-backed application architecture
* Data models and relationships
* CRUD operations

### Infrastructure & Development

* Git / GitHub
* Docker
* Linux
* REST/HTTP
* Environment-based configuration

## Application Architecture

At a high level, the application follows a client-server architecture:

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   Web Application   │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │   Node.js / Express │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
            ┌────────┐   ┌──────────┐   ┌──────────┐
            │ Routes │   │Middleware│   │  Models  │
            └────────┘   └──────────┘   └────┬─────┘
                                             │
                                             ▼
                                      ┌─────────────┐
                                      │  Database   │
                                      └─────────────┘
```

The actual production system contains additional configuration and infrastructure details that are intentionally omitted from this public sample.

## Backend Design

The backend was structured around separate responsibilities for routing, middleware, models, and application configuration.

### Routes

API routes define the application's available endpoints and connect incoming HTTP requests to the appropriate application logic.

### Middleware

Middleware is used to handle cross-cutting concerns such as authentication, authorization, request processing, and validation before requests reach the relevant application functionality.

### Models

The model layer represents the application's data and provides the interface between the application logic and persistent storage.

This separation helped keep the backend maintainable and made it easier to debug individual parts of the request lifecycle.

## Full-Stack Integration

A significant part of my role was connecting the frontend and backend into a complete application rather than developing the two layers independently.

The frontend communicates with backend APIs through HTTP requests. I was responsible for ensuring that:

* Frontend requests matched the backend API contracts
* API responses were handled correctly by the frontend
* Authentication state was handled appropriately
* Errors were propagated and displayed correctly
* Data submitted by users was correctly processed by the backend
* Backend changes remained compatible with the frontend

This required debugging issues across both sides of the application, rather than limiting debugging to a single layer.

## Authentication and Authorization

Authentication and authorization were important parts of the system because the application handles functionality that should only be accessible to authorized users.

I worked on the authentication flow and the middleware responsible for protecting backend functionality.

The general flow was:

```text
User
  │
  ▼
Frontend
  │
  ▼
Authentication Request
  │
  ▼
Backend
  │
  ▼
Authentication / Authorization
  │
  ├── Valid → Continue to protected resource
  │
  └── Invalid → Reject request
```

A key consideration was ensuring that authorization was enforced on the backend rather than relying solely on frontend restrictions.

## File Handling

The application also includes functionality for handling uploaded files.

I worked on the backend handling of uploaded content, including receiving files through API requests and integrating them into the application's workflow.

For a production system, file handling requires particular attention to validation, access control, storage, and security. These considerations were part of the implementation and debugging process.

## Development Challenges

One of the main challenges of working on the project was maintaining consistency across the different layers of the application.

A change to a backend endpoint could affect:

* Database models
* API routes
* Authentication middleware
* Frontend API calls
* Frontend state
* User-facing behavior

Because I worked across the stack, I was able to trace issues from the user interface through the API and into the backend and database rather than treating each layer independently.

## Debugging Approach

When something did not behave as expected, I generally followed the request through the complete application flow:

1. Reproduce the problem.
2. Determine whether the issue originates in the frontend or backend.
3. Inspect the browser request and response.
4. Check the backend route and middleware.
5. Inspect the relevant application logic.
6. Verify the database state where necessary.
7. Check logs and configuration.
8. Fix the underlying issue.
9. Re-test the complete user flow.

This approach was particularly useful for bugs where the visible problem appeared in one part of the application but the actual cause was somewhere else in the stack.

## DevOps and Deployment

I was involved in preparing the application for deployment and working with the containerized/runtime environment.

I handled much of the application-side work and collaborated with DevOps support for infrastructure-related tasks.

This included working with:

* Docker
* Environment configuration
* Application configuration
* Service deployment
* Runtime troubleshooting
* Logs and application behavior in the deployed environment

While I received assistance with some DevOps tasks, I remained responsible for understanding how the application itself needed to run and communicate within the deployment environment.

## What This Project Demonstrates

This project represents my experience as a **full-stack developer who can own a feature or application across the entire stack**, rather than working exclusively on either frontend or backend.

The main areas demonstrated by this project are:

* Full-stack application development
* REST API development
* Backend architecture
* Frontend/backend integration
* Authentication and authorization
* Database-backed applications
* Middleware and request processing
* File handling
* Debugging and troubleshooting
* Docker and deployment
* Working with production-oriented requirements
* End-to-end ownership of application features

## My Contribution

I was the **primary developer responsible for most of the application implementation**.

I designed and implemented the majority of the frontend and backend functionality, integrated the different components, debugged issues across the stack, and contributed to preparing the system for deployment.

For infrastructure and DevOps-specific work, I collaborated with and received assistance from other team members where necessary.

This distinction is important because the purpose of this sample is to demonstrate the work I personally carried out rather than presenting the entire client project as solely my work.

## Confidentiality

The original project was developed for a real banking client and is maintained in a private client repository.

For security and confidentiality reasons, this public sample intentionally excludes:

* Production credentials and secrets
* Customer or employee data
* Internal production URLs and infrastructure details
* Private API keys
* Sensitive banking information
* Proprietary business rules
* Confidential deployment configuration

The purpose of this sample is to demonstrate my **technical contribution, engineering approach, architecture, and full-stack development experience** without exposing confidential client information.
