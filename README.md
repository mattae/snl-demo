# SNL Platform Plugin Development Guide

This repository contains sample projects demonstrating how to build and deploy plugins on the SNL platform. The projects are divided into two categories:

1. **AI Services**: Built using Spring AI.
2. **Dashboard**: Demonstrates plugin extensions for dashboard enhancements.

---

## AI Services Project

### Overview
The AI Services project showcases how a parent plugin can provide services to dependent plugins. It leverages Hugging Face's AI capabilities to deliver these services.

### Prerequisites
1. **Hugging Face Account**: Register for a free account at [Hugging Face](https://huggingface.co).
2. **API Token**: Create an API token from your Hugging Face account.

### Configuration
Replace the `api-key` value in the [AI Services `application.yml`](ai/ai-services/src/main/resources/application.yml) file with your Hugging Face API token. The placeholder value provided is invalid and must be updated.


### Implementation Plugins
One implementation plugins are provided:
1. **[Chat Client](ai/chat-client)**: A simple chat client.

### Project Structure
- **[AI Services](ai/ai-services)**: The parent plugin providing AI services.
- **[AI Service API](ai/ai-services-api)**: Defines the contract between the AI Services plugin and its dependent plugins.

---

## Dashboard Project

### Overview
The Dashboard project demonstrates how dependent plugins can enhance a parent plugin. The parent plugin, [Dashboard Services](dashboard/dashboard-services), defines extensions that allow other plugins to contribute charts and dashboards. At runtime, it queries for available contributors and integrates their components into the dashboard.

### Implementation Plugins
Two implementation plugins are provided:
1. **[Angular Dashboard](dashboard/angular)**: Built using Angular.
2. **[React Dashboard](dashboard/react)**: Built using React.

Both plugins use **Micro-frontend components** and expose their components via **Module Federation**.

### Project Structure
- **[Dashboard Services](dashboard/dashboard-services)**: The parent plugin defining the dashboard extensions.
- **[Dashboard API](dashboard/dashboard-api)**: Defines the contract between the Dashboard Services plugin and its dependent plugins.

### Access Requirements
To access the dashboard, users must have the `Dashboard access` permission. Follow these steps to grant access:
1. Create a new role in the `Administration/Access management` menu section.
2. Add the `Dashboard access` permission to the role.
3. Create a new user account and assign the created role.

---

## Development Setup

### Step 1: Install Dependencies
Before building the dependent plugins, install the following projects to your local Maven repository:
1. **[AI Service API](ai/ai-services-api)**
2. **[Dashboard API](dashboard/dashboard-api)**

Run the following command in each project directory:
```bash
mvn install
```
Alternatively, use your preferred IDE to install the projects.

---

## Application Configuration

To run the application, an `application.yml` file is required. This file configures the database connection and other settings.

### Example `application.yml`
```yaml
spring:
  datasource:
    username: snl                 # Database username
    password: snl                 # Database password
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://127.0.0.1:5432/snl  # Database URL
```

### Instructions
1. Replace the `username`, `password`, and `url` values with your PostgreSQL database credentials.
2. Place the `application.yml` file in the root directory of your application.

---

## Running the Application

1. Navigate to the folder [files](files).
2. Run the following command:
   ```bash
   java -jar snl.jar
   ```

---

## Additional Resources

- **Application Setup**: Refer to the [files](files) folder for setup instructions.
- **Initial Password**: Follow the [Documentation](Documentation.md) to retrieve the initial application password.
- **Plugin Development**: Detailed instructions for developing new plugins, configurations, and more are available in the [Documentation](Documentation.md).

---

## Note
If you don't want to go through the stress of project setup and building, you can install the plugins in the [built_plugins](files/built_plugins) folder. You should install [AI Services](files/built_plugins/ai-services-1.0.0.jar) and [Dashboard Services](files/built_plugins/dashboard-services-1.0.0.jar) first and the other in any order. A better option is to `zip` all the files and install the zipped file and the system will install them in the correct order

