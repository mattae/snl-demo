### Developer Guide for SNL Platform

### **Introduction**

This guide serves as a comprehensive manual for developers working with the **SNL Platform**. It provides detailed explanations on plugin development, configuration, and runtime integration.

The **SNL Platform** is built on top of [SBP](https://github.com/hank-cp/sbp), which itself is based on the extensible framework [PF4J](https://github.com/pf4j/pf4j). While foundational concepts such as [Creating a Plugin](#2-creating-a-plugin), [Configuring the Plugin Metadata](#25-configuring-the-plugin-metadata), [Defining and Using Dependencies](#3-defining-and-using-dependencies), and [Extension Points](#4-extension-points) are thoroughly documented in the SBP and PF4J repositories, this guide emphasizes their application within the unique context of the SNL Platform.

By aligning these concepts with SNL's specific requirements, this guide bridges the gap between the general-purpose documentation provided by SBP/PF4J and the targeted needs of SNL plugin developers.

---

## Table of Contents
1. [Overview](#1-overview)
2. [Creating a Plugin](#2-creating-a-plugin)
   - [Prerequisites](#21-Prerequisites)
   - [Plugin Structure](#22-plugin-structure)
   - [Defining the Plugin Class](#23-defining-the-plugin-class)
   - [Maven Configuration](#24-maven-configuration)
   - [Configuring the Plugin Metadata](#25-configuring-the-plugin-metadata)
   - [Best Practices](#26-best-practices)
3. [Defining and Using Dependencies](#3-defining-and-using-dependencies)
   - [Types of Dependencies](#31-types-of-dependencies)
   - [Syntax for Dependencies](#32-syntax-for-dependencies)
   - [Versioning](#33-versioning)
   - [Handling Missing Dependencies](#34-handling-missing-dependencies)
   - [Examples](#35-examples)
   - [Advanced Dependency Management](#36-advanced-dependency-management)
   - [Dependency Best Practices](#37-dependency-best-practices)
   - [Troubleshooting Dependencies](#38-troubleshooting-dependencies)
4. [Extension Points](#4-extension-points)
    - [Purpose of Extension Points](#41-purpose-of-extension-points)
    - [Anatomy of an Extension Point](#42-anatomy-of-an-extension-point)
    - [Defining an Extension Point](#43-defining-an-extension-point)
    - [Implementing an Extension Point](#44-implementing-an-extension-point)
    - [Querying Extension Points at Runtime](#45-querying-extension-points-at-runtime)
    - [Advanced Usage of Extension Points](#46-advanced-usage-of-extension-points)
    - [Best Practices for Extension Points](#47-best-practices-for-extension-points)
    - [Real-World Example: Dashboard Plugin](#48-real-world-example-dashboard-plugin)
    - [Troubleshooting Extension Points](#49-troubleshooting-extension-points)
    - [Extension Points (Expanded with IPluginConfigurer)](#410-extension-points-expanded-with-ipluginconfigurer)
    - [What is IPluginConfigurer?](#411-what-is-ipluginconfigurer)
    - [Why Use IPluginConfigurer?](#412-why-use-ipluginconfigurer)
    - [Defining a Service Extension with IPluginConfigurer](#413-defining-a-service-extension-with-ipluginconfigurer)
    - [Consuming the Service in a Dependent Plugin](#414-consuming-the-service-in-a-dependent-plugin)
    - [How it Works Internally](#415-how-it-works-internally)
    - [Complete Example: HTML-to-PDF Conversion Service](#416-complete-example-html-to-pdf-conversion-service)
    - [Best Practices for IPluginConfigurer](#417-best-practices-for-ipluginconfigurer)
    - [Advanced Scenarios with IPluginConfigurer](#418-advanced-scenarios-with-ipluginconfigurer)
    - [Dynamic Service Discovery](#419-dynamic-service-discovery)
    - [Handling Missing Implementations](#420-handling-missing-implementations)
    - [Practical Use Case: Plugin-Based Workflow Management](#421-practical-use-case-plugin-based-workflow-management)
    - [Detailed Example: Payment Gateway Integration](#422-detailed-example-payment-gateway-integration)
    - [Summary](#423-summary)
5. [Core Services](#5-core-services)
    - [Configuration Service](#51-configuration-service)
    - [Value Set Service](#52-value-set-service)
    - [Translation Service](#53-translation-service)
    - [Mail Service](#54-mail-service)
    - [Integrating Core Services into Your Plugin](#55-integrating-core-services-into-your-plugin)
    - [Combining Core Services: Real-World Example](#56-combining-core-services-real-world-example)
    - [Best Practices for Core Services](#57-best-practices-for-core-services)
6. [OpenAPI Documentation Integration](#6-openapi-documentation-integration)
7. [Runtime Dependency Management: Using the Maven Shade Plugin](#7-runtime-dependency-management-using-the-maven-shade-plugin)
    - [Why Runtime Dependency Management Matters](#71-why-runtime-dependency-management-matters)
    - [Overview of the Maven Shade Plugin](#72-overview-of-the-maven-shade-plugin)
    - [Basic Configuration](#73-basic-configuration)
    - [Relocating Classes to Avoid Conflicts](#74-relocating-classes-to-avoid-conflicts)
    - [Advanced Configurations](#75-advanced-configurations)
    - [Real-World Example: Elasticsearch Plugin](#76-real-world-example-elasticsearch-plugin)
    - [Testing and Debugging Shaded JARs](#77-testing-and-debugging-shaded-jars)
    - [Best Practices for Runtime Dependency Management](#78-best-practices-for-runtime-dependency-management)
    - [Summary](#79-summary)
    - [Using mvn dependency:tree to Manage Transitive Dependencies](#710-using-mvn-dependencytree-to-manage-transitive-dependencies)
        - [What is mvn dependency:tree?](#7101-what-is-mvn-dependencytree)
        - [Using mvn dependency:tree](#7102-using-mvn-dependencytree)
        - [Including Transitive Dependencies in the Shade Plugin](#7103-including-transitive-dependencies-in-the-shade-plugin)
        - [Analyzing and Resolving Conflicts](#7104-analyzing-and-resolving-conflicts)
        - [Best Practices for mvn dependency:tree](#7105-best-practices-for-mvn-dependencytree)
        - [Complete Workflow for Dependency Management](#7106-complete-workflow-for-dependency-management)
        - [Example: Elasticsearch Plugin with Dependency Tree](#7107-example-elasticsearch-plugin-with-dependency-tree)
    - [Core Libraries and Autoconfiguration Best Practices](#711-core-libraries-and-autoconfiguration-best-practices)
        - [Avoid Shading Core Spring Libraries](#7111-avoid-shading-core-spring-libraries)
        - [Exception: Missing Autoconfiguration](#7112-exception-missing-autoconfiguration)
        - [Maven Shade Plugin Configuration for Autoconfiguration](#7113-maven-shade-plugin-configuration-for-autoconfiguration)
        - [Declaring Plugin-First Classes](#7114-declaring-plugin-first-classes)
        - [Best Practices for Managing Autoconfiguration](#7115-best-practices-for-managing-autoconfiguration)
        - [Complete Example](#7116-complete-example)
        - [Summary](#7117-summary)
8. [YAML Configuration (`plugin.yml`)](#8-yaml-configuration-pluginyml)
    - [Purpose of plugin.yml](#81-purpose-of-pluginyml)  
    - [Structure of plugin.yml](#82-structure-of-pluginyml)
    - [Example of a Comprehensive plugin.yml](#83-example-of-a-comprehensive-pluginyml)
    - [Detailed Explanation of Sections](#84-detailed-explanation-of-sections)
        - [Plugin Metadata](#841-plugin-metadata)
        - [Translations](#842-translations)
        - [Menus](#843-menus)
        - [Roles and Permissions](#844-roles-and-permissions)
        - [Configurations Path](#845-configurationspath)
        - [Value sets Path](#846-valuesetspath)
        - [Web Remotes](#847-webremotes)
        - [Best Practices for configurationsPath, valuesetsPath, and webRemotes](#848-best-practices-for-configurationspath-valuesetspath-and-webremotes)
    - [Best Practices for plugin.yml](#85-best-practices-for-pluginyml)
    - [Real-World Example](#86-real-world-example)
    - [Summary](#87-summary)
9.  [Plugin Development Best Practices](#9-plugin-development-best-practices)
    - [Schema Management with Liquibase](#91-schema-management-with-liquibase)
    - [Table Naming Conventions](#92-table-naming-conventions)
    - [REST Endpoint Design](#93-rest-endpoint-design)
    - [Summary of Best Practices](#94-summary-of-best-practices)
    - [Testing Plugins with JUnit 5](#95-testing-plugins-with-junit-5)
        - [Why Test Plugins?](#951-why-test-plugins) 
        - [Setting Up Testing Dependencies](#952-setting-up-testing-dependencies)
        - [Writing Unit Tests for Plugins](#953-writing-unit-tests-for-plugins)
        - [Testing Extension Points](#954-testing-extension-points)
        - [Testing Liquibase Schema](#955-testing-liquibase-schema)
        - [Mocking Plugin Interactions](#956-mocking-plugin-interactions)
        - [Best Practices for Plugin Testing](#957-best-practices-for-plugin-testing)
10. [Frontend Development on the SNL Platform](#10-frontend-development-on-the-snl-platform)
    - [Plugin Configuration](#101-plugin-configuration) 
    - [Module Federation with Angular](#102-module-federation-with-angular)
    - [Component-Based Routing](#103-component-based-routing)
    - [Best Practices for Micro-Frontend Development](#best-practices-for-micro-frontend-development)
11. [SNL Platform Maven Archetype: Quick Plugin Development Setup](#11-snl-platform-maven-archetype-quick-plugin-development-setup)
    - [Generating a New Plugin Project](#111-generating-a-new-plugin-project)
       - [Input Parameters](#1111-input-parameters)   
    - [Generated Project Structure](#112-generated-project-structure)
    - [Generated Configurations](#113-generated-configurations)
    - [Key Locations and Files](#114-key-locations-and-files)
    - [plugin.yml Test Class](#115-pluginyml-test-class)
    - [Integration Testing with @IntegrationTest](#116-integration-testing-with-integrationtest)
    - [Frontend and Backend Integration](#117-frontend-and-backend-integration)
    - [Running the Application in Development Mode](#118-running-the-application-in-development-mode)
    - [Best Practices](#119-best-practices)
12. [Running the Application and Plugins](#12-running-the-application-and-plugins)
    - [Prerequisites](#121-prerequisites)
    - [Setting Up the Application](#122-setting-up-the-application)
    - [Accessing the Application](#123-accessing-the-application)
    - [Installing Plugins](#124-installing-plugins)
    - [Initial Plugins and Admin Access](#125-initial-plugins-and-admin-access)
    - [Post-Initialization Behavior](#126-post-initialization-behavior)
    - [Summary](#127-summary)

---

### **1. Overview**

The SNL platform supports extensibility through plugins. Plugins are Spring Boot applications that can integrate and interact with the core system or other plugins. Plugins can implement custom functionality, provide services, and expose extension points for inter-plugin communication.

---

### **2. Creating a Plugin**

Plugins are the building blocks of the **SNL Platform**. They encapsulate modular functionality that can be independently developed, tested, deployed, and extended. This section elaborates on the process of creating a plugin, from dependencies to the plugin class structure and required configurations.

---

### **2.1 Prerequisites**

Each plugin must include the following dependency, either **directly or indirectly**:
```xml
<dependency>
    <groupId>io.github.mattae</groupId>
    <artifactId>snl-core</artifactId>
    <version>1.0.0</version>
</dependency>
```

#### **Purpose of `core-api` Dependency**
- **Base Classes**: Provides essential abstract classes like `JpaSpringBootPlugin` and `DataSourceSpringBootPlugin`.
- **Utilities**: Supplies tools for plugin lifecycle management, service registration, and extension points.
- **Integration with SNL Core Services**: Enables access to platform features such as configuration, translation, and value sets.

Ensure your `pom.xml` explicitly or transitively includes this dependency to prevent development errors.

---

### **2.2 Plugin Structure**

An SNL plugin consists of the following components:

1. **Plugin Class**:
   - The entry point for the plugin.
   - Defines domain classes (if any) and the plugin's bootstrap mechanism.
   - Extends `JpaSpringBootPlugin` or `DataSourceSpringBootPlugin` based on the requirements.

2. **Configuration File**:
   - A `plugin.yml` file that declares metadata, configurations, translations, value sets, web remotes, menus, roles, and permissions.
   - Used by the platform to load and configure the plugin.

3. **Spring Boot Application Class**:
   - The main application class for the plugin.
   - Initializes the plugin-specific Spring context.

4. **Optional Features**:
   - Extension points for inter-plugin communication.
   - Core services integration (e.g., `ConfigurationService`, `MailService`).

---

### **2.3 Defining the Plugin Class**

The plugin class serves as the **entry point** for the SNL platform. It extends one of the provided base classes:

- **`JpaSpringBootPlugin`**:
   - Use this for plugins requiring JPA (Java Persistence API) to manage domain entities.
- **`DataSourceSpringBootPlugin`**:
   - Use this for plugins that do not require JPA but may rely on custom data sources or other functionality.

#### **Example: JPA Plugin Class**
```java
import io.github.mattae.snl.core.api.bootstrap.JpaSpringBootPlugin;
import org.laxture.sbp.spring.boot.SpringBootstrap;
import org.pf4j.PluginWrapper;

import java.util.List;

public class MyJpaPlugin extends JpaSpringBootPlugin {
    public MyJpaPlugin(PluginWrapper wrapper) {
        super(wrapper, List.of(MyDomainEntity.class));
    }

    @Override
    protected SpringBootstrap createSpringBootstrap() {
        return new EnhancedSpringBootstrap(this, MyJpaPluginApplication.class);
    }
}
```

In this example:
1. The plugin declares a domain entity package (`MyDomainEntity`) get entities to be managed by JPA.
2. The `EnhancedSpringBootstrap` initializes the Spring application context.

Note: Plugins that extends from `io.github.mattae.snl.core.api.bootstrap.JpaSpringBootPlugin` automatically have [Blaze Persistence](https://github.com/Blazebit/blaze-persistence) activated for use

---

#### **Example: Non-JPA Plugin Class**
```java
import io.github.mattae.snl.core.api.bootstrap.DataSourceSpringBootPlugin;
import org.laxture.sbp.spring.boot.SpringBootstrap;
import org.pf4j.PluginWrapper;

public class MyCustomPlugin extends DataSourceSpringBootPlugin {
    public MyCustomPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    protected SpringBootstrap createSpringBootstrap() {
        return new EnhancedSpringBootstrap(this, MyCustomPluginApplication.class);
    }
}
```

In this example:
1. The plugin uses `DataSourceSpringBootPlugin` as it does not require JPA.
2. The Spring context is initialized with `MyCustomPluginApplication`.

Note: A plugin that extends from `io.github.mattae.snl.core.api.bootstrap.DataSourceSpringBootPlugin` can not participate in a JPA managed transaction. You will have to manage transactions manually.

---

### **2.4 Maven Configuration**

To package your plugin, include the following dependencies and configuration in your `pom.xml`:

#### **Dependencies**
```xml
<dependencies>
    <!-- SNL Core API -->
    <dependency>
        <groupId>io.github.mattae</groupId>
        <artifactId>snl-core</artifactId>
        <version>1.0.0</version>
    </dependency>

    <!-- Optional: Spring Boot Starter for JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Optional: Other Dependencies -->
    <dependency>
        <groupId>org.elasticsearch.client</groupId>
        <artifactId>elasticsearch-rest-high-level-client</artifactId>
        <version>7.10.0</version>
    </dependency>
</dependencies>
```

#### **Build Configuration**
Use the `maven-jar-plugin` to include plugin-specific metadata in the `MANIFEST.MF` file:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <configuration>
                <archive>
                    <manifestEntries>
                        <Plugin-Id>my-plugin</Plugin-Id>
                        <Plugin-Class>com.example.plugins.MyJpaPlugin</Plugin-Class>
                        <Plugin-Version>${project.version}</Plugin-Version>
                        <Plugin-Description>A custom plugin for the SNL Platform.</Plugin-Description>
                        <Plugin-Dependencies>security,data-warehouse</Plugin-Dependencies>
                    </manifestEntries>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```

---

### **2.5 Configuring the Plugin Metadata**

The `plugin.yml` file defines metadata and configuration for the plugin. Below is an example for a plugin named **User Management Plugin**:

```yaml
name: User Management Plugin
description: Manages users, roles, and permissions within the platform.

menus:
  - name: Administration
    type: dropDown
    subs:
      - route: users
        name: Manage Users
        icon: people
        type: LINK
      - route: roles
        name: Manage Roles
        icon: verified_user
        type: LINK
```

More information on `plugin.yml` can be found on [YAML Configuration (`plugin.yml`)](#yaml-configuration-pluginyml)

---

### **2.6 Best Practices**

1. **Include the `core-api` Dependency**:
   - Ensure your plugin directly or indirectly includes `io.github.mattae.snl:core-api` for seamless integration.

2. **Follow the Platform’s Guidelines**:
   - Use `JpaSpringBootPlugin` or `DataSourceSpringBootPlugin` as appropriate for your use case.

3. **Use Semantic Versioning**:
   - Assign version numbers in `MAJOR.MINOR.PATCH` format to indicate breaking changes, new features, and bug fixes.

4. **Test in Isolation**:
   - Verify your plugin independently before deploying it to the platform.

5. **Document Metadata**:
   - Maintain clear and detailed documentation in the `plugin.yml` file for future maintainability.

---


## **3. Defining and Using Dependencies**

Dependencies allow plugins to interact with other plugins or share functionality. By defining dependencies, plugins can declare the specific plugins and versions they require to operate. The SNL Platform also supports **optional dependencies**, allowing plugins to function without certain features if the optional dependencies are unavailable.

This section provides a detailed guide to:
- Understanding plugin dependencies.
- Syntax for specifying dependencies.
- Managing dependency versions.
- Using optional dependencies effectively.
- Examples of dependency configuration.

---

### **3.1 Types of Dependencies**

#### **Mandatory Dependencies**
- These are required for the plugin to function properly.
- If a mandatory dependency is not available, the platform will not load the plugin.
- Typically used for core functionality that the plugin relies on.

#### **Optional Dependencies**
- These dependencies enhance the functionality of a plugin but are not required for its basic operation.
- The plugin will still load and function if an optional dependency is unavailable.
- Useful for plugins that provide optional features or integrate with external plugins.

---

### **3.2 Syntax for Dependencies**

Dependencies are specified in the `MANIFEST.MF` file under the `Plugin-Dependencies`. Each dependency is defined by:
- The **Plugin ID** of the required plugin.
- Optionally, the **version or version range**.
- An optional **`?`** suffix for optional dependencies.

#### **Examples**

1. **Mandatory Dependency**:
   ```plaintext
   <Plugin-Dependencies>security</Plugin-Dependencies>
   ```
   - Requires the `security` plugin to be available.

2. **Mandatory Dependency with Version**:
   ```plaintext
   <Plugin-Dependencies>reports@1.0.0</Plugin-Dependencies>
   ```
   - Requires version `1.0.0` of the `reports` plugin.

3. **Optional Dependency**:
   ```plaintext
   <Plugin-Dependencies>dashboard?</Plugin-Dependencies>
   ```
   - The plugin will load even if the `dashboard` plugin is unavailable.

4. **Optional Dependency with Version Range**:
   ```plaintext
   <Plugin-Dependencies>analytics@^1.0.0?,logging@>2.0.0</Plugin-Dependencies>
   ```
   - The `analytics` plugin is optional, but if available, it must be compatible with version `1.0.0` (minor version updates allowed).
   - The `logging` plugin is mandatory and must be greater than version `2.0.0`.

---

### **3.3 Versioning**

The SNL platform supports **Semantic Versioning** (SemVer), enabling precise control over plugin compatibility. A version or version range can be specified for each dependency.

#### **SemVer Patterns**
1. **Exact Version**: `@1.0.0`
   - Requires version `1.0.0` of the dependency.
2. **Greater Than**: `@>1.0.0`
   - Requires any version greater than `1.0.0`.
3. **Compatible Minor Version**: `@^1.0.0`
   - Supports any `1.x.x` version (e.g., `1.0.1`, `1.2.5`).
4. **Any Version**: No version specified.
   - Accepts all versions.

---

### **3.4 Handling Missing Dependencies**

When a required dependency is missing:
- **Mandatory Dependencies**: The plugin fails to load.
- **Optional Dependencies**: The plugin loads, but features requiring the dependency are disabled.

#### **Best Practice for Optional Dependencies**
Always check for the availability of optional dependencies before using them:
```java
if (pluginManager.getPlugin("dashboard").getPluginState().equals(STARTED)) {
    // Use features from the dashboard plugin
} else {
    // Fallback behavior
}
```

---

### **3.5 Examples**

#### **Example 1: Simple Dependency**
The following configuration in the `MANIFEST.MF` file specifies a single mandatory dependency:
```plaintext
<Plugin-Dependencies>security</Plugin-Dependencies>
```
- The plugin will not load if the `security` plugin is unavailable.

#### **Example 2: Multiple Dependencies**
```plaintext
<Plugin-Dependencies>reports@1.0.0,logging@>2.0.0</Plugin-Dependencies>
```
- Requires:
  - Version `1.0.0` of the `reports` plugin.
  - Any version of the `logging` plugin greater than `2.0.0`.

#### **Example 3: Optional Dependencies**
```plaintext
<Plugin-Dependencies>dashboard?,analytics@^1.0.0?</Plugin-Dependencies>
```
- The plugin will:
  - Function without the `dashboard` plugin.
  - Use the `analytics` plugin only if version `1.x.x` is available.

---

### **3.6 Advanced Dependency Management**

#### **Using Extension Points**
Dependencies often define **extension points** that other plugins implement:
1. Define an extension point in the dependent plugin:
   ```java
   public interface ChartProviderExtension extends ExtensionPoint {
       List<Chart> getCharts();
   }
   ```
2. Implement the extension point in the required plugin:
   ```java
   @Component
   @Extension
   public class DashboardChartProvider implements ChartProviderExtension {
       @Override
       public List<Chart> getCharts() {
           // Return charts for the dashboard
       }
   }
   ```

#### **Lazy Dependency Loading**
When interacting with optional dependencies, use lazy initialization:
```java
Optional<ChartProviderExtension> provider = pluginManager.getExtensions(ChartProviderExtension.class)
    .stream()
    .findFirst();
if (provider.isPresent()) {
    // Use the provider
}
```

#### **Dynamic Behavior Based on Dependencies**
Modify plugin behavior dynamically based on available dependencies:
```java
if (pluginManager.getPlugin("analytics").getPluginState().equals(STARTED)) {
    enableAnalyticsFeatures();
} else {
    fallbackToBasicFeatures();
}
```

---

### **3.7 Dependency Best Practices**

1. **Minimize Dependencies**: Only define dependencies that are truly required.
2. **Use Optional Dependencies Judiciously**: Clearly document which features are enabled by optional dependencies.
3. **Specify Version Ranges**: To prevent compatibility issues, define version ranges instead of exact versions.
4. **Test With Missing Dependencies**: Ensure the plugin behaves correctly when optional dependencies are unavailable.

---

### **3.8 Troubleshooting Dependencies**

#### **Common Issues**
1. **Missing Dependency**: Ensure the dependent plugin is deployed and enabled.
2. **Version Conflict**: Verify that the version of the dependent plugin matches the required version or range.
3. **Circular Dependencies**: Avoid plugins that depend on each other directly or indirectly.

#### **Debugging Tips**
- Check the **Plugin Manager Logs** for dependency errors.
- Use `pluginManager.hasPlugin("plugin-id")` to validate dependency availability at runtime.
- Use tools like `Maven Dependency Tree` to inspect transitive dependencies.

---


## **4. Extension Points**

Extension points are one of the core features of the **Pf4j library** and **SNL Platform** by extension, enabling plugins to define reusable and extendable interfaces. These interfaces allow other plugins to interact with the defining plugin by implementing specific functionality. This mechanism provides a structured way for plugins to collaborate without hard-coded dependencies.

This section explores:
1. The purpose and benefits of extension points.
2. How to define and implement extension points.
3. Managing inter-plugin communication through extension points.
4. Examples of both **providing** and **consuming** extension points.
5. Best practices for using extension points effectively.

---

### **4.1 Purpose of Extension Points**

Extension points are interfaces that define contracts for specific functionality. Other plugins can implement these interfaces to contribute to or extend the defining plugin's functionality.

#### **Benefits:**
- **Modularity**: Plugins can extend the system without modifying the core or other plugins.
- **Flexibility**: Features can be dynamically added or overridden by implementing plugins.
- **Decoupling**: The defining plugin doesn’t need to know about the implementing plugins at compile time.

---

### **4.2 Anatomy of an Extension Point**

An extension point consists of:
1. **Interface**: Defines the contract (methods to be implemented).
2. **Implementation**: One or more classes in the defining plugin and/or other plugins that implement the interface.
3. **Runtime Integration**: The plugin using the extension point dynamically discovers implementations at runtime.

---

### **4.3 Defining an Extension Point**

To define an extension point, create an interface that extends `org.pf4j.ExtensionPoint`. This interface must specify the required methods that implementing plugins must provide.

#### **Example: ChartProvider Extension Point**
```java
import org.pf4j.ExtensionPoint;

public interface ChartProviderExtension extends ExtensionPoint {
    List<Chart> getCharts();
}
```

In this example:
- The `ChartProviderExtension` defines a contract for providing charts.
- Plugins implementing this interface will provide their own chart data.

---

### **4.4 Implementing an Extension Point**

Plugins that depend on the defining plugin can implement the extension point. Each implementation must:
1. Annotate the class with `@Extension`.
2. Provide the required functionality.

#### **Example: ChartProvider Implementation**
```java
import org.pf4j.Extension;
import org.springframework.stereotype.Component;

@Component
@Extension
public class DashboardChartProvider implements ChartProviderExtension {
    private final ChartService chartService;

    public DashboardChartProvider(ChartService chartService) {
        this.chartService = chartService;
    }

    @Override
    public List<Chart> getCharts() {
        return chartService.getAvailableCharts();
    }
}
```

Here:
- The `DashboardChartProvider` implements `ChartProviderExtension`.
- It uses a `ChartService` to fetch the available charts.

#### **Another Example: Plugin2ChartProvider**
```java
@Component
@Extension
public class Plugin2ChartProvider implements ChartProviderExtension {
    private final CustomChartService customChartService;

    public Plugin2ChartProvider(CustomChartService customChartService) {
        this.customChartService = customChartService;
    }

    @Override
    public List<Chart> getCharts() {
        return customChartService.generateCustomCharts();
    }
}
```

---

### **4.5 Querying Extension Points at Runtime**

The defining plugin can query all implementations of its extension point using the `PluginManager`. This is typically done at runtime to dynamically discover and aggregate the contributions from implementing plugins.

#### **Example: Aggregating Charts**
```java
import org.pf4j.PluginManager;

public class DashboardService {
    private final PluginManager pluginManager;

    public DashboardService(PluginManager pluginManager) {
        this.pluginManager = pluginManager;
    }

    public List<Chart> getAllCharts() {
        return pluginManager.getExtensions(ChartProviderExtension.class)
                .stream()
                .flatMap(provider -> provider.getCharts().stream())
                .collect(Collectors.toList());
    }
}
```

Here:
- `pluginManager.getExtensions(ChartProviderExtension.class)` retrieves all implementations of `ChartProviderExtension`.
- Each implementation’s `getCharts` method is invoked, and the results are aggregated.

---

### **4.6 Advanced Usage of Extension Points**

#### **Using Extension Points for Service Provision**

Some plugins provide services to other plugins through extension points. These services can then be consumed by dependent plugins.

##### **Example: HTML-to-PDF Conversion**

1. **Define the Extension Point:**
   ```java
   public interface HtmlPdfConversionExtension extends ExtensionPoint {
       ByteArrayOutputStream convertHtmlToPdf(String htmlContent);
   }
   ```

2. **Provide the Implementation:**
   ```java
   @Component
   @Extension
   public class PdfConversionService implements HtmlPdfConversionExtension {
       @Override
       public ByteArrayOutputStream convertHtmlToPdf(String htmlContent) {
           // Use a library like iText or PrinceXML for PDF conversion
           return pdfLibrary.convert(htmlContent);
       }
   }
   ```

3. **Consume the Service in Another Plugin:**
   ```java
   public class SalesReportService {
       private final PluginManager pluginManager;

       public SalesReportService(PluginManager pluginManager) {
           this.pluginManager = pluginManager;
       }

       public ByteArrayOutputStream generateSalesReport(String htmlContent) {
           var pdfConverter = pluginManager.getExtensions(HtmlPdfConversionExtension.class)
                   .stream()
                   .findFirst()
                   .orElseThrow(() -> new IllegalStateException("No PDF converter available"));

           return pdfConverter.convertHtmlToPdf(htmlContent);
       }
   }
   ```

---

### **4.7 Best Practices for Extension Points**

1. **Use Meaningful Names**:
   - Extension point names should reflect their purpose (e.g., `ChartProviderExtension`).
2. **Minimize Coupling**:
   - Ensure extension point interfaces are lightweight and focused.
   - Avoid requiring implementation details in the interface.
3. **Validate Implementations**:
   - Verify that each implementation adheres to the contract.
   - Log errors if implementations fail runtime validation.
4. **Query Efficiently**:
   - Aggregate results from multiple extensions efficiently to minimize performance overhead.
5. **Document Contracts**:
   - Provide detailed documentation for extension points, including:
     - Purpose
     - Expected behavior
     - Example use cases

---

### **4.8 Real-World Example: Dashboard Plugin**

#### **Use Case**
A dashboard plugin aggregates charts from multiple plugins. Each plugin contributes its own charts using the `ChartProviderExtension`.

#### **Implementation Steps**

1. **Define the Extension Point in Dashboard Plugin:**
   ```java
   public interface ChartProviderExtension extends ExtensionPoint {
       List<Chart> getCharts();
   }
   ```

2. **Implement the Extension in Two Plugins:**
   **Plugin 1 Implementation:**
   ```java
   @Component
   @Extension
   public class SalesChartProvider implements ChartProviderExtension {
       @Override
       public List<Chart> getCharts() {
           return List.of(new Chart("Sales", "Bar", ...));
       }
   }
   ```
   **Plugin 2 Implementation:**
   ```java
   @Component
   @Extension
   public class InventoryChartProvider implements ChartProviderExtension {
       @Override
       public List<Chart> getCharts() {
           return List.of(new Chart("Inventory", "Pie", ...));
       }
   }
   ```

3. **Query and Use Implementations:**
   ```java
   public class DashboardService {
       private final PluginManager pluginManager;

       public DashboardService(PluginManager pluginManager) {
           this.pluginManager = pluginManager;
       }

       public List<Chart> getDashboardCharts() {
           return pluginManager.getExtensions(ChartProviderExtension.class)
                   .stream()
                   .flatMap(provider -> provider.getCharts().stream())
                   .collect(Collectors.toList());
       }
   }
   ```

4. **Output in Dashboard:**
   The dashboard dynamically displays all charts contributed by plugins.

---

### **4.9 Troubleshooting Extension Points**

#### **Common Issues**
1. **Missing Implementations**:
   - Ensure the implementing plugins are deployed and enabled.
2. **Runtime Errors**:
   - Validate inputs and outputs in each implementation.
3. **Duplicate Implementations**:
   - Use unique identifiers for different implementations if needed.

#### **Debugging Tips**
- Log all discovered implementations during plugin initialization:
  ```java
  pluginManager.getExtensions(ChartProviderExtension.class)
      .forEach(extension -> log.info("Discovered ChartProvider: {}", extension.getClass().getName()));
  ```
- Use exception handling to gracefully manage missing implementations.

---


### **4.10 Extension Points (Expanded with `IPluginConfigurer`)**

In addition to standard extension points, the **SBP Platform** provides the `IPluginConfigurer` interface to simplify and enhance the process of service provisioning between plugins. Using `IPluginConfigurer`, a plugin can register shared services into the dependency injection container of dependent plugins, making them easier to consume by dependent plugins.

This section explores how to define and use `IPluginConfigurer` in the context of **service extension**.

---

### **4.11 What is `IPluginConfigurer`?**

`IPluginConfigurer` is an interface that plugins can implement to:
- Provide additional setup during plugin initialization.
- Register services or beans that dependent plugins can easily access.
- Simplify the process of consuming services from another plugin by automating registration and availability.

---

### **4.12 Why Use `IPluginConfigurer`?**

When multiple plugins need to consume a common service from a provider plugin, `IPluginConfigurer` ensures:
1. **Automatic Registration**: Services provided by a plugin are automatically registered in the dependent plugin's context.
2. **Simplified Access**: No need for repeated queries using `PluginManager`; the service is injected directly.
3. **Better Organization**: Configuration logic is centralized in the provider plugin.

---

### **4.13 Defining a Service Extension with `IPluginConfigurer`**

#### **Step 1: Define an Extension Point**
An interface represents the service to be shared between plugins. For example, a service for converting HTML to PDF.

```java
import org.pf4j.ExtensionPoint;

public interface HtmlPdfConversionExtension extends ExtensionPoint {
    ByteArrayOutputStream getPdf(String html);
}
```

---

#### **Step 2: Provide the Service Implementation**
The provider plugin implements the service and registers it as an extension.

```java
import org.pf4j.Extension;
import org.springframework.stereotype.Component;

@Component
@Extension
public class HtmlPdfConversionService implements HtmlPdfConversionExtension {
    private final PdfLibrary pdfLibrary;

    public HtmlPdfConversionService(PdfLibrary pdfLibrary) {
        this.pdfLibrary = pdfLibrary;
    }

    @Override
    public ByteArrayOutputStream getPdf(String html) {
        return pdfLibrary.convert(html); // Uses a PDF generation library like iText or PrinceXML.
    }
}
```

---

#### **Step 3: Implement `IPluginConfigurer`**
The provider plugin simplifies service registration by implementing `IPluginConfigurer`.

```java
import org.laxture.sbp.spring.boot.IPluginConfigurer;
import org.springframework.context.support.GenericApplicationContext;

public class HtmlPdfConversionConfigurer implements IPluginConfigurer {
    @Override
    public void onBootstrap(SpringBootstrap bootstrap, GenericApplicationContext pluginApplicationContext) {
        // Retrieve the service from the plugin's context and register it
        HtmlPdfConversionExtension pdfService = ApplicationContextProvider
            .getApplicationContext()
            .getBean(HtmlPdfConversionExtension.class);

        pluginApplicationContext.registerBean(
            "htmlPdfConversionService",
            HtmlPdfConversionExtension.class,
            () -> pdfService
        );
    }
}
```

---

#### **Step 4: Configure the Consumer Plugin**
The consumer plugin uses the `IPluginConfigurer` to ensure the service is automatically available to dependent plugins.

```java
import io.github.mattae.snl.core.api.bootstrap.DataSourceSpringBootPlugin;
import org.laxture.sbp.spring.boot.SpringBootstrap;
import org.pf4j.PluginWrapper;

public class ReportPlugin extends DataSourceSpringBootPlugin {

    public ReportPlugin(PluginWrapper wrapper) {
        super(wrapper, new HtmlPdfConversionConfigurer());
    }

    @Override
    protected SpringBootstrap createSpringBootstrap() {
        return new EnhancedSpringBootstrap(this, ReportPluginApp.class);
    }
}
```

---

### **4.14 Consuming the Service in a Dependent Plugin**

Dependent plugins no longer need to manually query `PluginManager` to find implementations of the extension. Instead, the service is injected directly.

#### **Example: Injecting the Service**
```java
import org.springframework.stereotype.Service;

@Service
public class SalesReportService {
    private final HtmlPdfConversionExtension htmlPdfConversionService;

    public SalesReportService(HtmlPdfConversionExtension htmlPdfConversionService) {
        this.htmlPdfConversionService = htmlPdfConversionService;
    }

    public ByteArrayOutputStream generateSalesReport(String htmlContent) {
        return htmlPdfConversionService.getPdf(htmlContent);
    }
}
```

Here:
- The `HtmlPdfConversionExtension` is automatically injected into the `SalesReportService` by the platform.
- No need to manually query `PluginManager` or handle missing services.

---

### **4.15 How it Works Internally**

1. The provider plugin:
   - Defines an extension point.
   - Implements `IPluginConfigurer` to register the service globally.
2. At runtime:
   - The SBP Platform calls the `onBootstrap` method of `IPluginConfigurer`.
   - The service is registered in the dependent plugin's context.
3. The dependent plugin:
   - Accesses the service directly via dependency injection.

---

### **4.16 Complete Example: HTML-to-PDF Conversion Service**

#### **Provider Plugin Code**
1. **Extension Point Definition:**
   ```java
   public interface HtmlPdfConversionExtension extends ExtensionPoint {
       ByteArrayOutputStream getPdf(String html);
   }
   ```

2. **Service Implementation:**
   ```java
   @Component
   @Extension
   public class HtmlPdfConversionService implements HtmlPdfConversionExtension {
       @Override
       public ByteArrayOutputStream getPdf(String html) {
           // Convert HTML to PDF
           return pdfLibrary.convert(html);
       }
   }
   ```

3. **Configurer for Automatic Registration:**
   ```java
   public class HtmlPdfConversionConfigurer implements IPluginConfigurer {
       @Override
       public void onBootstrap(SpringBootstrap bootstrap, GenericApplicationContext pluginApplicationContext) {
           var pdfService = ApplicationContextProvider.getApplicationContext()
               .getBean(HtmlPdfConversionExtension.class);

           pluginApplicationContext.registerBean(
               "htmlPdfConversionService",
               HtmlPdfConversionExtension.class,
               () -> pdfService
           );
       }
   }
   ```

4. **Consumer Plugin Class:**
   ```java
   public class ReportPlugin extends DataSourceSpringBootPlugin {
       public ReportPlugin(PluginWrapper wrapper) {
           super(wrapper, new HtmlPdfConversionConfigurer());
       }

       @Override
       protected SpringBootstrap createSpringBootstrap() {
           return new EnhancedSpringBootstrap(this, ReportPluginApp.class);
       }
   }
   ```

---

#### **Dependent Plugin Code**
1. **Service Usage:**
   ```java
   @Service
   public class SalesReportService {
       private final HtmlPdfConversionExtension htmlPdfConversionService;

       public SalesReportService(HtmlPdfConversionExtension htmlPdfConversionService) {
           this.htmlPdfConversionService = htmlPdfConversionService;
       }

       public ByteArrayOutputStream generateSalesReport(String htmlContent) {
           return htmlPdfConversionService.getPdf(htmlContent);
       }
   }
   ```

---

### **4.17 Best Practices for `IPluginConfigurer`**

1. **Encapsulation**: Keep configuration logic encapsulated within the `IPluginConfigurer` implementation.
2. **Dependency Management**: Ensure that all required services are properly registered before use.
3. **Error Handling**: Gracefully handle missing dependencies during configuration.
4. **Reuse Configurers**: For commonly used configurations, reuse `IPluginConfigurer` implementations across plugins.

---

### **Extension Points: More Examples and Details**

We will expand on:
1. Advanced scenarios of using `IPluginConfigurer` for shared services.
2. Examples of dynamic service discovery.
3. Practical use cases across plugins.
4. Managing fallback behaviors when optional dependencies or implementations are unavailable.

---

### **4.18 Advanced Scenarios with `IPluginConfigurer`**

The **`IPluginConfigurer`** interface can handle complex scenarios, including:
1. Registering multiple services from a single plugin.
2. Dynamically providing services based on runtime conditions.
3. Handling configuration for dependent plugins.

#### **4.18.1 Registering Multiple Services**
Sometimes a plugin may provide more than one service to other plugins.

**Example: A Reporting Plugin Offering Multiple Services**
- A plugin provides services for:
  - Generating PDF reports.
  - Exporting data to Excel.

**Step 1: Define Extension Points**
```java
public interface PdfReportService extends ExtensionPoint {
    ByteArrayOutputStream generatePdf(String content);
}

public interface ExcelExportService extends ExtensionPoint {
    ByteArrayOutputStream generateExcel(List<Data> data);
}
```

**Step 2: Implement the Services**
```java
@Component
@Extension
public class PdfReportServiceImpl implements PdfReportService {
    @Override
    public ByteArrayOutputStream generatePdf(String content) {
        return pdfLibrary.generate(content); // Generate PDF
    }
}

@Component
@Extension
public class ExcelExportServiceImpl implements ExcelExportService {
    @Override
    public ByteArrayOutputStream generateExcel(List<Data> data) {
        return excelLibrary.generate(data); // Generate Excel
    }
}
```

**Step 3: Register Services via `IPluginConfigurer`**
```java
public class ReportConfigurer implements IPluginConfigurer {
    @Override
    public void onBootstrap(SpringBootstrap bootstrap, GenericApplicationContext pluginApplicationContext) {
        // Register PDF Service
        PdfReportService pdfService = ApplicationContextProvider.getApplicationContext()
            .getBean(PdfReportService.class);
        pluginApplicationContext.registerBean("pdfReportService", PdfReportService.class, () -> pdfService);

        // Register Excel Service
        ExcelExportService excelService = ApplicationContextProvider.getApplicationContext()
            .getBean(ExcelExportService.class);
        pluginApplicationContext.registerBean("excelExportService", ExcelExportService.class, () -> excelService);
    }
}
```

**Step 4: Use the Services in Dependent Plugins**
```java
@Service
public class ReportGeneratorService {
    private final PdfReportService pdfReportService;
    private final ExcelExportService excelExportService;

    public ReportGeneratorService(PdfReportService pdfReportService, ExcelExportService excelExportService) {
        this.pdfReportService = pdfReportService;
        this.excelExportService = excelExportService;
    }

    public ByteArrayOutputStream createPdfReport(String content) {
        return pdfReportService.generatePdf(content);
    }

    public ByteArrayOutputStream createExcelExport(List<Data> data) {
        return excelExportService.generateExcel(data);
    }
}
```

---

### **4.19 Dynamic Service Discovery**

If the plugin environment changes dynamically or if services depend on optional plugins, you can use `PluginManager` for discovery.

#### **Dynamic Querying**
Instead of relying on direct injection, query services dynamically at runtime:
```java
public class DynamicServiceConsumer {
    private final PluginManager pluginManager;

    public DynamicServiceConsumer(PluginManager pluginManager) {
        this.pluginManager = pluginManager;
    }

    public void performService() {
        var optionalService = pluginManager.getExtensions(PdfReportService.class).stream().findFirst();

        if (optionalService.isPresent()) {
            ByteArrayOutputStream report = optionalService.get().generatePdf("Report Content");
            // Process the report
        } else {
            System.out.println("PDF service not available. Falling back to basic report.");
        }
    }
}
```

---

### **4.20 Handling Missing Implementations**

In real-world applications, not all plugins are guaranteed to be present. When using extension points or services from `IPluginConfigurer`, always design for fallback behaviors.

#### **Example: Handling Missing Dependencies**
```java
@Service
public class OptionalServiceConsumer {
    private final PluginManager pluginManager;

    public OptionalServiceConsumer(PluginManager pluginManager) {
        this.pluginManager = pluginManager;
    }

    public void execute() {
        List<ExcelExportService> services = pluginManager.getExtensions(ExcelExportService.class);

        if (services.isEmpty()) {
            System.out.println("Excel Export Service not available, using CSV as fallback.");
            // Use fallback behavior
            generateCsv();
        } else {
            ByteArrayOutputStream excelData = services.get(0).generateExcel(getData());
            // Process Excel data
        }
    }
}
```

---

### **4.21 Practical Use Case: Plugin-Based Workflow Management**

#### **Scenario: Workflow Stages**
A workflow plugin defines an extension point for workflow stages. Each stage is implemented by a separate plugin.

1. **Defining the Extension Point**
```java
public interface WorkflowStage extends ExtensionPoint {
    void executeStage(WorkflowContext context);
    int getOrder(); // Order of execution
}
```

2. **Implementing Workflow Stages in Different Plugins**
```java
@Component
@Extension
public class ApprovalStage implements WorkflowStage {
    @Override
    public void executeStage(WorkflowContext context) {
        System.out.println("Executing approval stage");
        // Approval logic
    }

    @Override
    public int getOrder() {
        return 1;
    }
}

@Component
@Extension
public class FinalizationStage implements WorkflowStage {
    @Override
    public void executeStage(WorkflowContext context) {
        System.out.println("Executing finalization stage");
        // Finalization logic
    }

    @Override
    public int getOrder() {
        return 2;
    }
}
```

3. **Aggregating and Executing Workflow Stages**
The defining plugin dynamically queries all stages and executes them in order:
```java
import java.util.Comparator;

@Service
public class WorkflowExecutor {
    private final PluginManager pluginManager;

    public WorkflowExecutor(PluginManager pluginManager) {
        this.pluginManager = pluginManager;
    }

    public void executeWorkflow(WorkflowContext context) {
        pluginManager.getExtensions(WorkflowStage.class)
            .stream()
            .sorted(Comparator.comparingInt(WorkflowStage::getOrder))
            .forEach(stage -> stage.executeStage(context));
    }
}
```

---

### **4.22 Detailed Example: Payment Gateway Integration**

1. **Use Case:**
   - The platform integrates with multiple payment gateways (e.g., PayPal, Stripe).
   - Each payment gateway is implemented as a plugin.

2. **Defining the Extension Point**
```java
public interface PaymentGateway extends ExtensionPoint {
    boolean processPayment(PaymentRequest request);
    String getGatewayName();
}
```

3. **Implementing Payment Gateways**
- **PayPal Plugin:**
```java
@Component
@Extension
public class PayPalGateway implements PaymentGateway {
    @Override
    public boolean processPayment(PaymentRequest request) {
        // PayPal-specific logic
        return true;
    }

    @Override
    public String getGatewayName() {
        return "PayPal";
    }
}
```

- **Stripe Plugin:**
```java
@Component
@Extension
public class StripeGateway implements PaymentGateway {
    @Override
    public boolean processPayment(PaymentRequest request) {
        // Stripe-specific logic
        return true;
    }

    @Override
    public String getGatewayName() {
        return "Stripe";
    }
}
```

4. **Dynamically Selecting and Using a Gateway**
```java
@Service
public class PaymentService {
    private final PluginManager pluginManager;

    public PaymentService(PluginManager pluginManager) {
        this.pluginManager = pluginManager;
    }

    public void processPayment(PaymentRequest request, String gatewayName) {
        pluginManager.getExtensions(PaymentGateway.class)
            .stream()
            .filter(gateway -> gateway.getGatewayName().equals(gatewayName))
            .findFirst()
            .ifPresentOrElse(
                gateway -> gateway.processPayment(request),
                () -> System.out.println("Payment gateway not available: " + gatewayName)
            );
    }
}
```

---

### **4.23 Summary**

By combining **extension points** and **`IPluginConfigurer`**, you can create highly modular, dynamic plugins. These mechanisms allow:
- Easy service sharing across plugins.
- Robust fallback behavior.
- Efficient handling of multiple implementations.
- Simplifying service registration and consumption.
- Reducing boilerplate code for dependent plugins.
- Ensuring consistency in service availability across plugins.

This approach makes the SBP Platform's extensibility more robust, modular, and developer-friendly.

---


## **5. Core Services**

The **SNL Platform** provides a set of core services that plugins can use to streamline functionality and reduce redundant implementations. These services include **Configuration Service**, **Value Set Service**, **Translation Service**, and **Mail Service**. They are essential building blocks for plugin development, ensuring consistency, localization, and dynamic configuration.

In this section, we will:
1. Explore the purpose of each core service.
2. Provide detailed examples for their usage.
3. Demonstrate real-world scenarios where these services can be applied.
4. Highlight best practices for integrating core services into your plugins.

---

### **5.1 Configuration Service**

The **Configuration Service** allows plugins to store and retrieve dynamic key-value pairs organized by category. This enables plugins to modify behavior or settings without requiring code changes.

#### **Core API**
```java
public interface ConfigurationService {
    List<CreateView> list(String category, String key);
    Optional<String> getValueAsStringForKey(String category, String key);
    Optional<Integer> getValueAsIntegerForKey(String category, String key);
    Optional<Boolean> getValueAsBooleanForKey(String category, String key);
}
```

#### **Example: Retrieving Configuration Values**
```java
@Service
public class PluginSettingsService {
    private final ConfigurationService configurationService;

    public PluginSettingsService(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }

    public void displayPluginSettings() {
        Optional<String> apiUrl = configurationService.getValueAsStringForKey("plugin-settings", "api-url");
        Optional<Integer> retryCount = configurationService.getValueAsIntegerForKey("plugin-settings", "retry-count");
        Optional<Boolean> debugMode = configurationService.getValueAsBooleanForKey("plugin-settings", "debug-mode");

        System.out.println("API URL: " + apiUrl.orElse("Not Set"));
        System.out.println("Retry Count: " + retryCount.orElse(3)); // Default value
        System.out.println("Debug Mode: " + debugMode.orElse(false)); // Default value
    }
}
```

#### **Real-World Scenario**
A plugin that interacts with an external API may allow administrators to configure:
- API URL
- Maximum retry count
- Debugging mode

**Configuration in the plugin deployment:**
```yaml
configurationPath:  installers/my-plugin/configuration.json
```
**configurations.json**
```json
[
   {
      "category": "plugin-settings",
      "data": [
         {
            "key": "api-url",
            "value":" https://api.example.com",
            "type": "string"
         },
         {
            "key": "retry-count",
            "value": 3,
            "type": "numeric"
         },
         {  
            "key": "debug-mode",
            "value": true,
            "type": "bool"
         }
      ]
   }
]
```

---

### **5.2 Value Set Service**

The **Value Set Service** manages collections of values (e.g., dropdown options, enumerations) that are contextual and dynamic. These are useful for creating flexible systems where options depend on specific configurations or locales.

#### **Core API**
```java
public interface ValueSetService {
    Set<ValueSet.Value> getValuesForSystem(String system, String lang, Boolean active);

    Optional<ValueSet.Value> getValue(String system, String valueCode, String lang);
}
```

#### **Example: Fetching Values**
```java
@Service
public class DropdownService {
    private final ValueSetService valueSetService;

    public DropdownService(ValueSetService valueSetService) {
        this.valueSetService = valueSetService;
    }

    public void populateGenderDropdown() {
        Set<ValueSet.Value> genderValues = valueSetService.getValuesForSystem("gender", "en", true);
        genderValues.forEach(value -> System.out.println(value.getDisplayName() + " (" + value.getCode() + ")"));
    }
}
```

#### **Output**
```
Male (M)
Female (F)
Non-Binary (NB)
```

#### **Real-World Scenario**
A plugin managing user profiles can use the Value Set Service to dynamically populate dropdowns for:
- Genders
- Nationalities
- User roles

**Configuration in the plugin deployment:**
```yaml
valueSetsPath:  installers/my-plugin/value-sets.json
```
**value-sets.json**
```json
[
   {
      "system": "gender",
      "order": 2,
      "values": [
         {
            "code": "M",
            "display": "Male",
            "active": true
         },
         {
            "code": "F",
            "display": "Female",
            "active": true
         },
         {
            "code": "NB",
            "display": "Non-Binary",
            "active": true
         }
      ]
   }
]
```

---

### **5.3 Translation Service**

The **Translation Service** simplifies localization by allowing plugins to retrieve translations dynamically based on the user’s language.

#### **Core API**
```java
public interface TranslationService {
    String getTranslation(String key, String lang);
}
```

#### **Example: Fetching Translations**
```java
@Service
public class LocalizationService {
    private final TranslationService translationService;

    public LocalizationService(TranslationService translationService) {
        this.translationService = translationService;
    }

    public void displayWelcomeMessage(String lang) {
        String welcomeMessage = translationService.getTranslation("welcome.message", lang);
        System.out.println(welcomeMessage);
    }
}
```

#### **Real-World Scenario**
A plugin displays localized error messages or interface text based on the current user’s language.

```yaml
translations:  
   - lang: en
     path: installers/my-plugin/i18n/en.json
   - lang: fr
     path: installers/my-plugin/i18n/fr.json
   - lang: es
     path: installers/my-plugin/i18n/es.json
```
**Translation data (en.json):**
```json
{
   "welcome.message": "Welcome to the platform!"
}
```
**Translation data (fr.json):**
```json
{
   "welcome.message": "Bienvenue sur la plateforme!"
}
```
**Translation data (es.json):**
```json
{
   "welcome.message": "¡Bienvenido a la plataforma!"
}
```

**Output for Different Languages:**
- English: "Welcome to the platform!"
- French: "Bienvenue sur la plateforme!"
- Spanish: "¡Bienvenido a la plataforma!"

---

### **5.4 Mail Service**

The **Mail Service** provides plugins with a mechanism to send emails. It supports plain text and HTML content, making it suitable for both simple notifications and richly formatted email templates.

#### **Core API**
```java
public interface MailService {
    void sendEmail(String from, String to, String subject, String content, boolean isHtml);
}
```

#### **Example: Sending an Email**
```java
@Service
public class NotificationService {
    private final MailService mailService;

    public NotificationService(MailService mailService) {
        this.mailService = mailService;
    }

    public void sendUserNotification(String userEmail) {
        String subject = "Welcome to the Platform!";
        String content = "<h1>Welcome!</h1><p>We're glad to have you on board.</p>";
        mailService.sendEmail("noreply@platform.com", userEmail, subject, content, true);
    }
}
```

#### **Real-World Scenario**
A user management plugin sends email notifications for:
- Welcome messages.
- Password resets.
- Event reminders.

---

### **5.5 Integrating Core Services into Your Plugin**

To use core services in your plugin:
1. **Inject the Service**: Use Spring’s dependency injection to include the service in your classes.
2. **Register Default Configurations**: Define default configurations in the `plugin.yml` file or via the Configuration Service.
3. **Handle Fallbacks**: Ensure your plugin gracefully handles scenarios where configurations or translations are missing.

---

### **5.6 Combining Core Services: Real-World Example**

#### **Scenario**
A **Notification Plugin**:
- Sends localized email notifications.
- Includes user-specific dynamic configurations.

#### **Implementation**

1. **Inject Required Services**
```java
@Service
public class NotificationPluginService {
    private final ConfigurationService configurationService;
    private final TranslationService translationService;
    private final MailService mailService;

    public NotificationPluginService(ConfigurationService configurationService,
                                     TranslationService translationService,
                                     MailService mailService) {
        this.configurationService = configurationService;
        this.translationService = translationService;
        this.mailService = mailService;
    }
}
```

2. **Generate and Send Notifications**
```java
public void sendWelcomeEmail(String userEmail, String userLang) {
    // Fetch configuration for email sender
    String fromEmail = configurationService
            .getValueAsStringForKey("notification-settings", "sender-email")
            .orElse("noreply@platform.com");

    // Fetch localized subject and message
    String subject = translationService.getTranslation("welcome.email.subject", userLang);
    String message = translationService.getTranslation("welcome.email.message", userLang);

    // Send email
    mailService.sendEmail(fromEmail, userEmail, subject, message, true);
}
```

3. **Default Configurations in `plugin.yml`**
```yaml
configurationPath:  installers/my-plugin/configuration.json
```
**configuration.json**
```json
[
   {
      "category": "notification-settings",
      "data": [
         {
            "key": "sender-email",
            "value": "notifications@platform.com",
            "type": "string"
         }
      ]
   }
]
```

4. **Translation Data**
```yaml
translations:  
   - lang: en
     path: installers/my-plugin/i18n/en.json
   - lang: fr
     path: installers/my-plugin/i18n/fr.json
   - lang: es
     path: installers/my-plugin/i18n/es.json
```
**Translation data (en.json):**
```json
{
   "welcome.email": {
      "subject": "Welcome to Our Platform",
      "message": "<h1>Hello!</h1><p>Welcome to our community.</p>"
   }
}
```
**Translation data (fr.json):**
```json
{
   "welcome.email": {
      "subject": "Bienvenue sur notre plateforme",
      "message": "<h1>Bonjour!</h1><p>Bienvenue dans notre communauté.</p>"
   }
}
```
**Translation data (es.json):**
```json
{
   "welcome.email": {
      "subject": "Bienvenido a nuestra plataforma",
      "message": "<h1>¡Hola!</h1><p>Bienvenido a nuestra comunidad.</p>"
   }
}
```

---

### **5.7 Best Practices for Core Services**

1. **Fallback Logic**: Always provide default values or behaviors if a service returns `Optional.empty()`.
2. **Localization First**: Use the Translation Service for all user-facing text.
3. **Avoid Hardcoding**: Store configurable settings in the Configuration Service.
4. **Use Value Sets for Enumerations**: Dynamically generate dropdowns or filters using the Value Set Service.

---

### **6. OpenAPI Documentation Integration**

Plugins can contribute to OpenAPI documentation:
```java
@Configuration
public class OpenApiConfig {
    @Bean
    public GroupedOpenApi publicOpenApi() {
        return GroupedOpenApi.builder()
                .group("My Plugin")
                .pathsToMatch("/api/my-plugin/**")
                .build();
    }
}
```

---
## **7. Runtime Dependency Management: Using the Maven Shade Plugin**

Runtime dependency management is a critical aspect of plugin development for the **SNL Platform**. The goal is to ensure that each plugin contains the necessary libraries and resources it needs to function correctly while avoiding dependency conflicts. The **Maven Shade Plugin** plays a pivotal role in this process by allowing developers to package dependencies within a plugin’s JAR and relocate conflicting classes.

This section covers:
1. Why runtime dependency management is important.
2. How the Maven Shade Plugin works.
3. Advanced configurations for managing conflicts.
4. Real-world examples and best practices.

---

### **7.1 Why Runtime Dependency Management Matters**

When multiple plugins are deployed within the same platform:
- **Shared Dependencies**: Different plugins may depend on the same library but require different versions.
- **Conflicts**: Version mismatches can lead to `ClassNotFoundException`, `NoSuchMethodError`, or unexpected behavior.
- **Isolation**: Plugins should ideally operate independently, bundling their specific versions of dependencies.

The Maven Shade Plugin ensures that:
1. Each plugin includes only the libraries it requires.
2. Conflicts are avoided by renaming (relocating) overlapping classes or packages.

---

### **7.2 Overview of the Maven Shade Plugin**

The **Maven Shade Plugin**:
- Bundles all required dependencies into a single JAR (a *fat JAR* or *uber JAR*).
- Relocates conflicting classes or packages to avoid classpath issues.
- Minimizes the risk of runtime errors due to shared dependencies.

---

### **7.3 Basic Configuration**

To use the Maven Shade Plugin, include it in your plugin's `pom.xml` file under the `<build>` section:

#### **Basic Example**
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.4.1</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <createDependencyReducedPom>true</createDependencyReducedPom>
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>META-INF/*.SF</exclude>
                            <exclude>META-INF/*.DSA</exclude>
                            <exclude>META-INF/*.RSA</exclude>
                        </excludes>
                    </filter>
                </filters>
            </configuration>
        </plugin>
    </plugins>
</build>
```

#### **Explanation**
- **`<execution>`**: Executes the plugin during the `package` phase.
- **`<createDependencyReducedPom>`**: Ensures the resulting JAR excludes dependencies already provided by the platform.
- **`<filters>`**: Excludes unnecessary files (e.g., signature files) to reduce JAR size.

---

### **7.4 Relocating Classes to Avoid Conflicts**

Relocation allows you to rename classes or packages to avoid conflicts with other plugins or the platform.

#### **When to Use Relocation**
1. **Conflicting Libraries**:
   - Example: Your plugin uses version `4.1.0` of a library, but another plugin requires version `5.0.0`.
2. **Shaded Libraries**:
   - Prevent your plugin's bundled libraries from interfering with the platform or other plugins.

#### **Relocation Example**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.4.1</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <relocations>
            <relocation>
                <pattern>com.fasterxml.jackson</pattern>
                <shadedPattern>com.myplugin.shaded.jackson</shadedPattern>
            </relocation>
        </relocations>
    </configuration>
</plugin>
```

#### **Explanation**
- **`<pattern>`**: Specifies the original package to relocate (e.g., `com.fasterxml.jackson`).
- **`<shadedPattern>`**: Specifies the new package name (e.g., `com.myplugin.shaded.jackson`).

After relocation:
- Classes from `com.fasterxml.jackson` are now accessible under `com.myplugin.shaded.jackson`.
- This ensures that your plugin’s Jackson library does not conflict with other plugins.

---

### **7.5 Advanced Configurations**

#### **Including Specific Dependencies**
You can specify which dependencies should be included in the shaded JAR:
```xml
<artifactSet>
    <includes>
        <include>org.apache.commons:commons-lang3</include>
        <include>org.springframework.boot:spring-boot-starter-data-elasticsearch</include>
    </includes>
</artifactSet>
```

#### **Excluding Dependencies**
Exclude dependencies already provided by the platform to avoid duplication:
```xml
<artifactSet>
    <excludes>
        <exclude>org.springframework.boot:spring-boot*</exclude>
        <exclude>javax.servlet:javax.servlet-api</exclude>
    </excludes>
</artifactSet>
```

---

### **7.6 Real-World Example: Elasticsearch Plugin**

#### **Scenario**
Your plugin requires `Elasticsearch 7.10`, but the platform uses `Elasticsearch 6.x`. Relocating Elasticsearch classes ensures compatibility.

#### **Configuration**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.4.1</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <artifactSet>
            <includes>
                <include>org.elasticsearch.client:elasticsearch-rest-high-level-client</include>
                <include>org.elasticsearch:elasticsearch</include>
            </includes>
        </artifactSet>
        <relocations>
            <relocation>
                <pattern>org.elasticsearch</pattern>
                <shadedPattern>com.myplugin.shaded.elasticsearch</shadedPattern>
            </relocation>
        </relocations>
    </configuration>
</plugin>
```

#### **Result**
- Your plugin uses its own version of `Elasticsearch 7.10` without interfering with the platform or other plugins.
- Classes from `org.elasticsearch` are renamed to `com.myplugin.shaded.elasticsearch`.

---

### **7.7 Testing and Debugging Shaded JARs**

1. **Inspect the JAR**
   - Use a tool like `jar tf` to verify that all required classes are included and relocated properly:
     ```bash
     jar tf target/myplugin-1.0.0-shaded.jar
     ```

2. **Check for Conflicts**
   - Deploy the plugin in a test environment and check logs for errors like `ClassNotFoundException` or `NoSuchMethodError`.

3. **Verify Relocations**
   - Use tools like `jdeps` or IDE features to ensure relocated classes are accessible.

---

### **7.8 Best Practices for Runtime Dependency Management**

1. **Relocate Conflicting Classes**:
   - Always relocate dependencies that are likely to conflict with the platform or other plugins.

2. **Minimize the Shaded JAR**:
   - Avoid bundling unnecessary libraries to keep the JAR size manageable.

3. **Use Dependency Exclusions**:
   - Exclude libraries provided by the platform to prevent duplication.

4. **Test Thoroughly**:
   - Deploy the plugin in a controlled environment to identify and resolve conflicts early.

5. **Maintain Clear Documentation**:
   - Document which libraries are shaded and relocated for future maintainability.

---

### **7.9 Summary**

Using the Maven Shade Plugin, developers can:
- Package plugin-specific dependencies in a *fat JAR*.
- Resolve dependency conflicts via class relocation.
- Ensure smooth integration with the platform and other plugins.

### **7.10 Using `mvn dependency:tree` to Manage Transitive Dependencies**

When using the **Maven Shade Plugin**, understanding the dependency hierarchy of your plugin is crucial. The Maven `dependency:tree` goal helps you visualize all direct and transitive dependencies, making it easier to determine which dependencies should be included or excluded in the shaded JAR.

---

### **7.10.1 What is `mvn dependency:tree`?**

The `mvn dependency:tree` command:
1. Displays a tree-like structure of your plugin’s dependencies.
2. Shows which dependencies are direct and which are transitive (brought in by other libraries).
3. Identifies potential conflicts, such as differing versions of the same library.

---

### **7.10.2 Using `mvn dependency:tree`**

Run the following command in the plugin's project directory:

```bash
mvn dependency:tree
```

This command generates a dependency tree, which might look like this:

**Example Output**
```
[INFO] --- maven-dependency-plugin:3.4.0:tree (default-cli) ---
[INFO] com.myplugin:elasticsearch-plugin:jar:1.0.0-SNAPSHOT
[INFO] +- org.elasticsearch.client:elasticsearch-rest-high-level-client:jar:7.10.0:compile
[INFO] |  +- org.elasticsearch:elasticsearch:jar:7.10.0:compile
[INFO] |  |  +- org.apache.lucene:lucene-core:jar:8.7.0:compile
[INFO] |  |  +- org.apache.lucene:lucene-analyzers-common:jar:8.7.0:compile
[INFO] |  |  \- org.apache.lucene:lucene-queryparser:jar:8.7.0:compile
[INFO] |  +- org.elasticsearch:elasticsearch-core:jar:7.10.0:compile
[INFO] |  \- org.elasticsearch:elasticsearch-rest-client:jar:7.10.0:compile
[INFO] \- org.slf4j:slf4j-api:jar:1.7.30:compile
```

---

### **7.10.3 Including Transitive Dependencies in the Shade Plugin**

#### **Step 1: Identify Transitive Dependencies**
From the example above, the `elasticsearch-rest-high-level-client` library depends on:
- `org.elasticsearch:elasticsearch`
- Various Apache Lucene libraries (e.g., `lucene-core`, `lucene-analyzers-common`).

#### **Step 2: Add Transitive Dependencies to `<include>`**
You must explicitly include transitive dependencies to ensure they are shaded correctly:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.4.1</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <artifactSet>
            <includes>
                <include>org.elasticsearch.client:elasticsearch-rest-high-level-client</include>
                <include>org.elasticsearch:elasticsearch</include>
                <include>org.apache.lucene:lucene-core</include>
                <include>org.apache.lucene:lucene-analyzers-common</include>
                <include>org.apache.lucene:lucene-queryparser</include>
            </includes>
        </artifactSet>
        <relocations>
            <relocation>
                <pattern>org.elasticsearch</pattern>
                <shadedPattern>com.myplugin.shaded.elasticsearch</shadedPattern>
            </relocation>
        </relocations>
    </configuration>
</plugin>
```

---

### **7.10.4 Analyzing and Resolving Conflicts**

The `mvn dependency:tree` command also reveals conflicts, such as multiple versions of the same library. Conflicts appear in the tree like this:

```
[INFO] +- org.slf4j:slf4j-api:jar:1.7.30:compile
[INFO] \- org.slf4j:slf4j-api:jar:1.8.0:runtime
```

#### **Resolving Conflicts**
1. **Exclude Unnecessary Versions**
   Use the `<exclusions>` tag in the `pom.xml` to exclude conflicting versions:
   ```xml
   <dependency>
       <groupId>org.some-library</groupId>
       <artifactId>some-dependency</artifactId>
       <version>1.0.0</version>
       <exclusions>
           <exclusion>
               <groupId>org.slf4j</groupId>
               <artifactId>slf4j-api</artifactId>
           </exclusion>
       </exclusions>
   </dependency>
   ```

2. **Relocate Conflicting Packages**
   If exclusion is not feasible, use the Maven Shade Plugin’s relocation feature to isolate conflicting versions:
   ```xml
   <relocation>
       <pattern>org.slf4j</pattern>
       <shadedPattern>com.myplugin.shaded.slf4j</shadedPattern>
   </relocation>
   ```

---

### **7.10.5 Best Practices for `mvn dependency:tree`**

1. **Always Check for Transitive Dependencies**:
   Use `mvn dependency:tree` before configuring the Maven Shade Plugin to ensure no required dependencies are missed.

2. **Regularly Review for Conflicts**:
   Run `mvn dependency:tree` after updating dependencies to identify new conflicts.

3. **Document Dependencies**:
   Maintain a list of direct and transitive dependencies included in the shaded JAR for future reference and debugging.

4. **Use Wildcards Carefully**:
   While you can include all dependencies with `*:*`, it may lead to bloated JARs and unnecessary conflicts:
   ```xml
   <include>*:*</include>
   ```

---

### **7.10.6 Complete Workflow for Dependency Management**

1. **Generate Dependency Tree**:
   ```bash
   mvn dependency:tree > dependency-tree.txt
   ```

2. **Identify Direct and Transitive Dependencies**:
   - Look for key dependencies required for your plugin.
   - Identify transitive dependencies brought in by those libraries.

3. **Configure the Maven Shade Plugin**:
   - Include necessary dependencies.
   - Relocate classes/packages to avoid conflicts.
   - Exclude platform-provided libraries.

4. **Test the Shaded JAR**:
   - Verify all dependencies are included and relocated properly.
   - Deploy in a test environment to check for runtime conflicts.

---

### **7.10.7 Example: Elasticsearch Plugin with Dependency Tree**

#### **Dependency Tree**
```
[INFO] +- org.elasticsearch.client:elasticsearch-rest-high-level-client:jar:7.10.0:compile
[INFO] |  +- org.elasticsearch:elasticsearch:jar:7.10.0:compile
[INFO] |  |  +- org.apache.lucene:lucene-core:jar:8.7.0:compile
[INFO] |  |  +- org.apache.lucene:lucene-analyzers-common:jar:8.7.0:compile
[INFO] |  \- org.elasticsearch:elasticsearch-core:jar:7.10.0:compile
```

#### **Shade Plugin Configuration**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.4.1</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <artifactSet>
            <includes>
                <include>org.elasticsearch.client:elasticsearch-rest-high-level-client</include>
                <include>org.elasticsearch:elasticsearch</include>
                <include>org.apache.lucene:lucene-core</include>
                <include>org.apache.lucene:lucene-analyzers-common</include>
            </includes>
        </artifactSet>
        <relocations>
            <relocation>
                <pattern>org.elasticsearch</pattern>
                <shadedPattern>com.myplugin.shaded.elasticsearch</shadedPattern>
            </relocation>
        </relocations>
    </configuration>
</plugin>
```

---
### **7.11 Core Libraries and Autoconfiguration Best Practices**

When managing runtime dependencies, it is critical to understand which libraries are provided by the **SNL Platform** and how to handle situations where your plugin includes custom autoconfiguration. Improper handling can lead to redundancy, classpath conflicts, or unintended overrides. This section discusses:

1. **Avoid Shading Core Libraries**: Core Spring libraries (`org.springframework.*`) provided by the SNL platform should not be shaded.
2. **When to Include Autoconfiguration**: Include specific autoconfiguration only if it is missing in the platform.
3. **Marking Autoconfiguration as Plugin-First**: Ensure plugin-provided autoconfiguration is prioritized using `plugin-first-classes`.

---

### **7.11.1 Avoid Shading Core Spring Libraries**

The **SNL Platform** already includes core Spring libraries, such as:
- **Spring Boot** (`org.springframework.boot`)
- **Spring Framework** (`org.springframework`)
- **Spring Data** modules (e.g., `spring-data-jpa`, `spring-data-elasticsearch`)

**Key Considerations**:
- **Do not shade or include these libraries** unless absolutely necessary.
- Including them redundantly can cause:
   - Classpath conflicts.
   - Version mismatches.
   - Increased plugin size.

---

### **7.11.2 Exception: Missing Autoconfiguration**

If your plugin uses autoconfiguration classes not provided by the platform (e.g., `spring-boot-autoconfigure` for Elasticsearch), you can include these libraries explicitly. However, it is essential to:
1. Minimize the included classes to only the required ones.
2. Declare these classes as plugin-first to ensure they are prioritized at runtime.

---

### **7.11.3 Maven Shade Plugin Configuration for Autoconfiguration**

Below is a detailed Maven Shade Plugin configuration that includes and manages Spring Boot autoconfiguration classes for Elasticsearch.

#### **Example Maven Shade Configuration**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <minimizeJar>true</minimizeJar>
                <artifactSet>
                    <includes>
                        <include>org.springframework.boot:spring-boot-starter-data-elasticsearch</include>
                        <include>org.apache.httpcomponents:httpcore-nio</include>
                        <include>org.apache.httpcomponents:httpasyncclient</include>
                        <include>org.apache.httpcomponents:httpcore</include>
                        <include>org.elasticsearch.client:elasticsearch-rest-client</include>
                        <include>org.eclipse.parsson:parsson</include>
                        <include>io.opentelemetry:opentelemetry-api</include>
                        <include>io.opentelemetry:opentelemetry-context</include>
                        <include>jakarta.json:jakarta.json-api</include>
                        <include>com.google.code.findbugs:jsr305</include>
                        <include>co.elastic.clients:elasticsearch-java</include>
                        <include>org.springframework.data:spring-data-elasticsearch</include>
                        <include>org.springframework.boot:spring-boot-autoconfigure</include>
                    </includes>
                </artifactSet>
                <filters>
                    <filter>
                        <artifact>org.springframework.boot:spring-boot-autoconfigure</artifact>
                        <includes>
                            <include>org/springframework/boot/autoconfigure/elasticsearch/*</include>
                            <include>org/springframework/boot/autoconfigure/data/elasticsearch/*</include>
                        </includes>
                    </filter>
                </filters>
            </configuration>
        </execution>
    </executions>
</plugin>
```

---

### **7.11.4 Declaring Plugin-First Classes**

The SNL platform allows you to mark specific classes or packages as *plugin-first* to ensure your plugin's versions are used at runtime. This is particularly important for custom autoconfiguration.

#### **Adding `plugin-first-classes` in `application.yml`**
```yaml
sbp-plugin:
  plugin-first-classes:
    - org.springframework.boot.autoconfigure.data.elasticsearch.*
    - org.springframework.boot.autoconfigure.elasticsearch.*
```

---

### **7.11.5 Best Practices for Managing Autoconfiguration**

1. **Limit Shading to Required Classes**:
   - Use `<filters>` in the Maven Shade Plugin to include only the required autoconfiguration classes.

2. **Minimize JAR Size**:
   - Set `minimizeJar` to `true` in the Maven Shade Plugin to remove unused classes.

3. **Prioritize Plugin Classes**:
   - Declare custom autoconfiguration as plugin-first using `plugin-first-classes` in `application.yml`.

4. **Avoid Duplication**:
   - Check if the platform already provides the required autoconfiguration before including it in your plugin.

5. **Test Thoroughly**:
   - Deploy the plugin in a test environment and verify that the correct autoconfiguration classes are being used.

---

### **7.11.6 Complete Example**

#### **Scenario**
A plugin uses Spring Boot’s Elasticsearch autoconfiguration (`spring-boot-autoconfigure`). This autoconfiguration is not provided by the platform and must be included in the plugin.

#### **Step 1: Maven Shade Plugin**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <minimizeJar>true</minimizeJar>
                <artifactSet>
                    <includes>
                        <include>org.springframework.boot:spring-boot-autoconfigure</include>
                        <include>org.springframework.data:spring-data-elasticsearch</include>
                    </includes>
                </artifactSet>
                <filters>
                    <filter>
                        <artifact>org.springframework.boot:spring-boot-autoconfigure</artifact>
                        <includes>
                            <include>org/springframework/boot/autoconfigure/data/elasticsearch/*</include>
                            <include>org/springframework/boot/autoconfigure/elasticsearch/*</include>
                        </includes>
                    </filter>
                </filters>
            </configuration>
        </execution>
    </executions>
</plugin>
```

#### **Step 2: Plugin-First Configuration**
Add `plugin-first-classes` to the plugin's `application.yml`:

```yaml
sbp-plugin:
  plugin-first-classes:
    - org.springframework.boot.autoconfigure.data.elasticsearch.*
    - org.springframework.boot.autoconfigure.elasticsearch.*
```

#### **Step 3: Testing**
1. Deploy the plugin and verify that the Elasticsearch autoconfiguration is loaded.
2. Ensure no conflicts occur with the platform-provided Spring libraries.

---

### **7.11.7 Summary**

- **Core Spring Libraries**: Do not shade core Spring libraries unless necessary.
- **Custom Autoconfiguration**: Shade and include only missing autoconfiguration classes.
- **Plugin-First Classes**: Use `plugin-first-classes` to prioritize plugin-provided classes at runtime.

## **8. YAML Configuration (`plugin.yml`)**

The `plugin.yml` file is a central configuration file that provides metadata and settings for your plugin. It is used by the SNL platform to:
- Define basic plugin information (e.g., name, description, version).
- Specify dependencies and optional features.
- Configure translations, menus, roles, and permissions.
- Manage plugin-specific settings.

This section expands on the structure, purpose, and examples of the `plugin.yml` file to ensure developers can use it effectively.

---

### **8.1 Purpose of `plugin.yml`**

The `plugin.yml` file:
1. Acts as a manifest for plugin metadata.
2. Provides configuration options that can be dynamically consumed at runtime.
3. Reduces the need for hardcoded values, enabling flexibility and customization.
4. Provide for dynamic values to provide contextual information
5. Configuration of UI aspects like menus
6. Configuration of Micro-frontends through Module Federation
7. Application localization through use of translations
8. Definition of plugin roles and permissions

---

### **8.2 Structure of `plugin.yml`**

A typical `plugin.yml` file contains the following sections:
1. **Plugin Metadata**: Name, description, logo, and other identifiers.
2. **Translations**: Define localization files for different languages.
3. **Menus**: Configure menus and submenus for the plugin interface.
4. **Roles and Permissions**: Define roles, permissions, and their grouping.
5. **Configurations**: Plugin-specific settings.

---

### **8.3 Example of a Comprehensive `plugin.yml`**

Here’s an example of a detailed `plugin.yml` file:

```yaml
name: User Management Plugin
description: Manages users, roles, and permissions within the platform.
logo: |
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="#4CAF50"/>
  </svg>

translations:
  - lang: en
    path: i18n/en.json
  - lang: fr
    path: i18n/fr.json

menus:
  - name: Administration
    type: dropDown
    subs:
      - route: users
        name: Manage Users
        icon: people
        type: LINK
      - route: roles
        name: Manage Roles
        icon: verified_user
        type: LINK

roles:
  - name: System Administrator
    authority: ROLE_SYS_ADMIN
    description: Full access to system settings and users.
    permissions:
      - Manage Users
      - Manage Roles

permissions:
  - name: Manage Users
    group: User Management
    description: Full access to user management.
  - name: Manage Roles
    group: User Management
    description: Manage roles and their permissions.

settings:
  user-session-timeout: 30 # in minutes
  allow-user-registration: true
```

---

### **8.4 Detailed Explanation of Sections**

#### **8.4.1 Plugin Metadata**

The metadata provides information about the plugin:
- **`name`**: The display name of the plugin.
- **`description`**: A short description of the plugin’s purpose.
- **`version`**: The plugin version (use semantic versioning).
- **`author`**: The developer or organization responsible for the plugin.
- **`logo`**: An optional logo in SVG format for branding.

**Example:**
```yaml
name: Notification Plugin
description: Sends email and in-app notifications to users.
version: 2.0.1
author: Notification Team
logo: |
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="#FF5722"/>
  </svg>
```

---

#### **8.4.2 Translations**

The `translations` section defines the paths to localization files for different languages. These files allow the plugin to support multiple languages for user-facing text.

**Example:**
```yaml
translations:
  - lang: en
    path: i18n/en.json
  - lang: es
    path: i18n/es.json
```

**`i18n/en.json` Example:**
```json
{
  "welcome.message": "Welcome to the platform!",
  "error.message": "An error occurred. Please try again."
}
```

---

#### **8.4.3 Menus**

The `menus` section defines the structure of menus and submenus displayed in the application interface.

- **`name`**: The display label of the menu or submenu.
- **`type`**: The type of menu item (`LINK`, `dropDown`, `icon`).
- **`subs`**: Submenus nested under a dropdown menu.
- **`route`**: The path invoked when the menu item is clicked.
- **`icon`**: The icon associated with the menu item (e.g., Material icons).

**Example:**
```yaml
menus:
  - name: Administration
    type: dropDown
    subs:
      - route: users
        name: Manage Users
        icon: people
        type: LINK
      - route: roles
        name: Manage Roles
        icon: verified_user
        type: LINK
```

---

#### **8.4.4 Roles and Permissions**

Define the roles and permissions needed by your plugin:
- **`roles`**: The user roles required by the plugin.
- **`permissions`**: Fine-grained permissions assigned to roles.

**Roles Example:**
```yaml
roles:
  - name: System Administrator
    authority: ROLE_SYS_ADMIN
    description: Full access to all system features.
    permissions:
      - Manage Users
      - Configure System
```

**Permissions Example:**
```yaml
permissions:
  - name: Manage Users
    group: Administration
    description: Allows creating, editing, and deleting users.
  - name: Configure System
    group: Administration
    description: Allows configuring system-wide settings.
```

---

### **8.4.5 `configurationsPath`**

#### **Purpose**
The `configurationsPath` field specifies the file or directory containing configuration values for the plugin. This allows plugins to store complex settings outside of the `plugin.yml` file, making them easier to manage and override during deployment.

#### **How it Works**
- Points to a JSON or YAML file containing configurations.
- Allows developers to organize settings hierarchically.
- Can be dynamically read by the **Configuration Service**.

#### **Example Configuration**
```yaml
configurationsPath: config/plugin-config.json
```

**`plugin-config.json` Example:**
```json
[
   {
      "category": "plugin-settings",
      "data": [
         {
            "key": "api-url",
            "value":" https://api.example.com",
            "type": "string"
         },
         {
            "key": "retry-count",
            "value": 3,
            "type": "numeric"
         },
         {
            "key": "debug-mode",
            "value": true,
            "type": "bool"
         }
      ]
   }
]
```

#### **Accessing in Code**
```java
@Service
public class PluginConfigurationService {
    private final ConfigurationService configurationService;

    public PluginConfigurationService(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }

    public void loadSettings() {
        Optional<String> apiUrl = configurationService.getValueAsStringForKey("plugin-settings", "api-url");
        Optional<Integer> retryCount = configurationService.getValueAsIntegerForKey("plugin-settings", "retry-count");

        System.out.println("API URL: " + apiUrl.orElse("Not Set"));
        System.out.println("Retry Count: " + retryCount.orElse(1));
    }
}
```

---

### **8.4.6 `valuesetsPath`**

#### **Purpose**
The `valuesetsPath` field specifies the file or directory containing predefined value sets (e.g., dropdown options, enumerations). Value sets are often dynamic and depend on specific contexts or locales.

#### **How it Works**
- Points to JSON or YAML files that define key-value pairs for various systems.
- Supports multilingual configurations and can be queried by the **Value Set Service**.

#### **Example Configuration**
```yaml
valueSetsPath: config/valuesets.json
```

**`valuesets.json` Example:**

**`gender.json` Example:**
```json
[
   {
      "system": "countries",
      "values": [
         { "code": "US", "display": "United States", "active": true },
         { "code": "FR", "display": "France", "active": true },
         { "code": "ES", "display": "Spain", "active": true }
      ]
   },
   {
      "system": "gender",
      "values": [
         { "code": "M", "display": "Male", "active": true },
         { "code": "F", "display": "Female", "active": true },
         { "code": "NB", "display": "Non-Binary", "active": true }
      ]
   }
]
```

#### **Accessing in Code**
```java
@Service
public class DropdownService {
    private final ValueSetService valueSetService;

    public DropdownService(ValueSetService valueSetService) {
        this.valueSetService = valueSetService;
    }

    public void populateDropdown(String system) {
        Set<ValueSet.Value> values = valueSetService.getValuesForSystem(system, "en", true);
        values.forEach(value -> System.out.println(value.getDisplayName() + " (" + value.getCode() + ")"));
    }
}
```

---

### **8.4.7 `webRemotes`**

#### **Purpose**
The `webRemotes` field configures **Remote Module Federation** for Angular, React, or other frontend frameworks. It enables plugins to expose web modules or components for use in micro-frontends, ensuring seamless integration between UI modules of different plugins.

#### **Key Fields**
- **`remoteEntry`**: URL for the remote module entry point (generated by `ModuleFederationPlugin` in Webpack).
- **`remoteName`**: Unique name for the remote module (must match the name in Webpack configuration).
- **`components`**: List of web components or Angular components exposed by the plugin.
   - **`exposedName`**: The key in the `exposes` section of the Webpack config.
   - **`routePath`**: The route where the component is available.
   - **`elementName`**: Custom element name (for web components, e.g. React, Vue).
   - **`componentName`**: Component name (for Angular components).
- **`modules`**: Angular modules exposed by the plugin.

#### **Example Configuration**
```yaml
webRemotes:
  - remoteEntry: "/user-management/remoteEntry.js"
    remoteName: "userManagement"
    components:
      - exposedName: UserListComponent
        routePath: user-list
        componentName: UserListComponent
        position: 10
      - exposedName: UserDetailsComponent
        routePath: user-details
        componentName: UserDetailsComponent
    modules:
      - name: UserModule
        routePath: user-module
```

---

#### **How it Works**

1. **Exposing Components**
   - In the plugin’s Webpack configuration (`webpack.config.js`), expose the components or modules:
   ```javascript
   const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

   module.exports = {
       plugins: [
           new ModuleFederationPlugin({
               name: "userManagement",
               filename: "remoteEntry.js",
               exposes: {
                   "./UserListComponent": "./src/app/user-list/user-list.component.ts",
                   "./UserDetailsComponent": "./src/app/user-details/user-details.component.ts",
               },
           }),
       ],
   };
   ```

2. **Using the Remote**
   - Another plugin or application can consume these components:
   ```javascript
   const UserManagement = await import("userManagement/UserListComponent");
   const UserDetails = await import("userManagement/UserDetailsComponent");
   ```

3. **Dynamically Loading Components**
   Angular can dynamically load exposed modules:
   ```typescript
   const routes: Routes = [
       {
           path: 'user-list',
           loadChildren: () =>
               loadRemoteModule({
                   remoteEntry: '/user-management/remoteEntry.js',
                   remoteName: 'userManagement',
                   exposedModule: './UserListComponent',
               }).then((m) => m.UserListComponent),
       },
   ];
   ```

---

### **8.4.8 Best Practices for `configurationsPath`, `valuesetsPath`, and `webRemotes`**

1. **ConfigurationsPath**:
   - Use descriptive and hierarchical keys for easy retrieval.
   - Store sensitive information (like API keys) securely and avoid committing them to source control.

2. **ValuesetsPath**:
   - Keep value sets contextual and localized.
   - Use a consistent structure for JSON or YAML files to simplify querying.

3. **WebRemotes**:
   - Ensure the `remoteName` matches the `name` field in the Webpack configuration.
   - Test remote module loading independently before integration.


---

### **8.5 Best Practices for `plugin.yml`**
1. **Validate YAML Syntax**: Use YAML linting tools to ensure there are no syntax errors.
2**Leverage Translations**: Always define localization keys in `translations` for multi-language support.
3**Organize Permissions**: Group permissions logically to simplify role management.

---

### **8.6 Real-World Example**

#### **Scenario: A Reporting Plugin**

The **Reporting Plugin** generates customizable reports and supports multiple roles, permissions, and menu options. Its `plugin.yml` might look like this:

```yaml
name: Reporting Plugin
description: Generates and manages reports for the platform.
version: 1.0.0
author: Jane Smith

dependencies:
  - plugin: data-warehouse
  - plugin: notification
    optional: true

translations:
  - lang: en
    path: i18n/en.json
  - lang: fr
    path: i18n/fr.json

menus:
  - name: Reports
    type: dropDown
    subs:
      - route: create-report
        name: Create Report
        icon: note_add
        type: LINK
      - route: manage-reports
        name: Manage Reports
        icon: list_alt
        type: LINK

roles:
  - name: Report Manager
    authority: ROLE_REPORT_MANAGER
    description: Manages report creation and sharing.
    permissions:
      - Create Reports
      - View Reports

permissions:
  - name: Create Reports
    group: Reporting
    description: Allows creating new reports.
  - name: View Reports
    group: Reporting
    description: Allows viewing existing reports.
```
---

### **8.7 Summary**

By leveraging `configurationsPath`, `valuesetsPath`, and `webRemotes`, plugins on the SNL platform can achieve:
- **Scalability**: Modular configuration management and reusable value sets.
- **Flexibility**: Decoupled UI components and shared frontends via Module Federation.
- **Localization**: Seamless support for multilingual and context-specific value sets.
---
### **9 Plugin Development Best Practices**

To ensure modularity, maintainability, and seamless integration of plugins within the **SNL Platform**, developers must adhere to several best practices. These guidelines focus on schema management, table naming conventions, REST endpoint design, and conflict prevention.

---

### **9.1. Schema Management with Liquibase**

Plugins that require database tables must manage their schema changes using **Liquibase**, a powerful tool for version-controlled database migrations. By standardizing schema management, plugins can ensure:
- Database integrity.
- Compatibility across different platform versions.
- Clear version tracking of schema changes.

#### **9.1.1 Indicating Liquibase Change Log in `application.yml`**

Each plugin must specify its Liquibase change log file in its `application.yml`. This file defines the schema changes required by the plugin.

**Example `application.yml`:**
```yaml
spring:
  liquibase:
    change-log: classpath:/installers/my-plugin/schema/schema.xml
    enabled: true
```

#### **9.1.2 Change Log File Requirements**
- **File Path**: Ensure the change log file is stored in a logical and unique location (e.g., `classpath:/installers/{plugin-name}/schema/`).
- **File Format**: Liquibase supports XML, YAML, JSON, and SQL for defining schema changes. XML is recommended for consistency.

---

### **9.2. Table Naming Conventions**

#### **9.2.1 Use Unique Table Prefixes**
All tables created by a plugin must have a unique prefix, typically derived from the plugin name or an abbreviation. This ensures:
1. **Avoidance of Conflicts**: Prevents table name collisions with other plugins or platform tables.
2. **Easy Identification**: Makes it easier to identify which plugin a table belongs to.

**Example Prefix**: For a plugin named "My Plugin Framework (MPF)," use the prefix `mpf_` for all tables.

#### **9.2.2 Schema Example**

Below is an example of a Liquibase schema definition using unique table prefixes.

**Example `schema.xml`:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.5.xsd">

    <property name="autoIncrement" value="true"/>

    <!-- Table 1 Definition -->
    <changeSet id="table-1" author="mattae">
        <preConditions onFail="MARK_RAN">
            <not>
                <tableExists tableName="mpf_table1"/>
            </not>
        </preConditions>
        <createTable tableName="mpf_table1">
            <column name="id" type="serial" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="title" type="varchar(32)">
                <constraints nullable="false"/>
            </column>
            <column name="description" type="varchar(512)">
                <constraints nullable="false"/>
            </column>
        </createTable>
    </changeSet>

    <!-- Table 2 Definition -->
    <changeSet id="table-2" author="mattae">
        <preConditions onFail="MARK_RAN">
            <not>
                <tableExists tableName="mpf_table2"/>
            </not>
        </preConditions>
        <createTable tableName="mpf_table2">
            <column name="id" type="serial" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="title" type="varchar(32)">
                <constraints nullable="false"/>
            </column>
            <column name="description" type="varchar(512)">
                <constraints nullable="false"/>
            </column>
        </createTable>
    </changeSet>
</databaseChangeLog>
```

---

### **9.3. REST Endpoint Design**

REST controllers in a plugin must use a unique base path prefix to avoid endpoint clashes with other plugins. The prefix is typically derived from the plugin's name or abbreviation.

#### **3.1 Prefix Guidelines**
1. Use a consistent and descriptive prefix for all endpoints within a plugin.
2. Group related controllers under the same base path.

**Example Prefix**: For the "My Plugin Framework (MPF)" plugin, use `/api/mpf` as the base path.

#### **3.2 REST Controller Examples**

**Controller 1**:
Handles operations related to `resource1`.

```java
@RestController
@RequestMapping("/api/mpf")
public class Controller1 {

    @GetMapping("/resource1")
    public String getResource() {
        // Logic for retrieving resource1
        return "Resource 1";
    }
}
```

**Controller 2**:
Handles operations related to `resource2`.

```java
@RestController
@RequestMapping("/api/mpf")
public class Controller2 {

    @GetMapping("/resource2")
    public String getResource() {
        // Logic for retrieving resource2
        return "Resource 2";
    }
}
```

**Resulting Endpoints**:
- `/api/mpf/resource1`
- `/api/mpf/resource2`

#### **3.3 Benefits of Unique Endpoint Prefixes**
- **Avoidance of Conflicts**: Prevents different plugins from exposing endpoints with the same path.
- **Modularity**: Ensures each plugin operates within its namespace.
- **Traceability**: Simplifies debugging and logging by associating endpoints with specific plugins.

---

### **9.4. Summary of Best Practices**

#### **9.4.1 Schema Management**
- Use Liquibase for all schema changes.
- Store change log files in a logical directory (e.g., `/installers/{plugin-name}/schema/`).
- Use unique table prefixes derived from the plugin name.

#### **9.4.2 REST Endpoint Design**
- Use unique prefixes for all REST endpoints (e.g., `/api/{plugin-prefix}`).
- Group related endpoints under the same base path.

#### **9.4.3 Example Naming Conventions**
| **Aspect**           | **Example Prefix** | **Description**                                            |
|-----------------------|--------------------|------------------------------------------------------------|
| **Table Name**        | `mpf_table1`      | Prefix `mpf` for tables belonging to "My Plugin Framework".|
| **REST Endpoints**    | `/api/mpf`        | Prefix for API paths to avoid conflicts.                   |
| **Liquibase Changelog** | `/installers/mpf/schema.xml` | Logical location for schema change log.                   |

### **9.4.4 Separate API and Implementation JARs**:
   - For plugins that provide **extension points**, it is a best practice to separate the plugin into two JARs:
      - **API JAR**: Contains the extension point interfaces and shared constants. This JAR can be consumed by other plugins that implement the extension points.
      - **Implementation JAR**: Contains the actual implementation of the extension points and plugin-specific logic.
   - This separation promotes modularity, reduces coupling, and makes it easier for other plugins to depend on the extension points without pulling in the implementation.

   **Example Structure**:
   - **API Module (`my-plugin-api`)**:
     ```java
     public interface MyExtensionPoint {
         void execute();
     }
     ```
     **Dependencies in `pom.xml`**:
     ```xml
     <dependency>
         <groupId>io.github.mattae</groupId>
         <artifactId>snl-core</artifactId>
         <version>1.0.0</version>
     </dependency>
     ```

   - **Implementation Module (`my-plugin-impl`)**:
     ```java
     @Component
     @Extension
     public class MyExtensionPointImpl implements MyExtensionPoint {
         @Override
         public void execute() {
             // Implementation logic
         }
     }
     ```
     **Dependencies in `pom.xml`**:
     ```xml
     <dependency>
         <groupId>com.example.plugins</groupId>
         <artifactId>my-plugin-api</artifactId>
         <version>1.0.0</version>
     </dependency>
     ```

   - The **API JAR** can be shared across plugins, while the **Implementation JAR** is used only when deploying the plugin itself.

---
### **9.5. Testing Plugins with JUnit 5**

Testing is a critical part of plugin development on the **SNL Platform** to ensure functionality, compatibility, and maintainability. This section outlines how to effectively test plugins using **JUnit 5** with **Spring Boot's testing framework** and **plugin extension mocking**.

---

### **9.5.1 Why Test Plugins?**

1. **Ensure Functional Integrity**: Validate that the plugin works as expected, both in isolation and when integrated with the platform.
2. **Prevent Regressions**: Ensure updates or refactoring do not break existing functionality.
3. **Verify Extension Points**: Test extension point implementations in isolation and with mocked dependencies.
4. **Validate Configuration**: Confirm that Liquibase scripts, REST controllers, and configurations are loaded and behave as expected.

---

### **9.5.2 Setting Up Testing Dependencies**

Ensure your `pom.xml` includes the necessary testing dependencies:

```xml
<dependencies>
    <!-- Spring Boot Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
        <exclusions>
            <exclusion>
                <groupId>org.junit.vintage</groupId>
                <artifactId>junit-vintage-engine</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <!-- JUnit 5 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <scope>test</scope>
    </dependency>

    <!-- Mocking PF4J extensions -->
    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-core</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

### **9.5.3 Writing Unit Tests for Plugins**

#### **9.5.3.1 Testing Spring Boot Components**

For components like services, controllers, and configuration, leverage **Spring Boot's testing capabilities** with the `@SpringBootTest` annotation.

**Example: Testing a REST Controller**

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testGetResource1() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/mpf/resource1", String.class);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo("Expected Resource 1 Response");
    }
}
```

---

#### **9.5.3.2 Mocking Dependencies**

Use **Mockito** to mock dependencies that the plugin interacts with, such as extension points or external services.

**Example: Mocking a Service Dependency**

```java
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.BDDMockito.given;

@SpringBootTest
public class ServiceTest {

    @MockBean
    private SomeDependency dependency;

    @Autowired
    private MyService service;

    @Test
    void testServiceMethod() {
        // Mock dependency behavior
        given(dependency.someMethod()).willReturn("Mocked Response");

        // Call the service method
        String result = service.serviceMethod();

        // Assert the response
        assertThat(result).isEqualTo("Expected Response Based on Mock");
    }
}
```

---

### **9.5.4 Testing Extension Points**

Plugins often implement **extension points** to provide functionality to the platform or other plugins. Mocking these extension points helps verify behavior in isolation.

#### **Example: Testing an Extension Point Implementation**

Suppose your plugin implements an extension point for providing charts:

**Extension Point Definition**
```java
public interface ChartProviderExtension {
    List<Chart> getCharts();
}
```

**Implementation**
```java
@Component
@Extension
public class ChartProviderImpl implements ChartProviderExtension {
    @Override
    public List<Chart> getCharts() {
        return List.of(new Chart("Sales", "Bar"), new Chart("Inventory", "Pie"));
    }
}
```

**Test**
```java
import org.junit.jupiter.api.Test;
import org.pf4j.PluginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ChartProviderExtensionTest {

    @Autowired
    private PluginManager pluginManager;

    @Test
    void testChartProviderExtension() {
        List<ChartProviderExtension> extensions = pluginManager.getExtensions(ChartProviderExtension.class);
        assertThat(extensions).hasSize(1);

        ChartProviderExtension chartProvider = extensions.get(0);
        List<Chart> charts = chartProvider.getCharts();

        assertThat(charts).isNotEmpty();
        assertThat(charts).extracting("name").contains("Sales", "Inventory");
    }
}
```

---

### **9.5.5 Testing Liquibase Schema**

Testing schema migrations ensures that database changes are applied correctly and that tables are created as expected.

**Example: Testing Liquibase Execution**
```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class LiquibaseTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void testLiquibaseSchema() {
        // Verify that the table exists
        Boolean tableExists = jdbcTemplate.queryForObject(
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'mpf_table1')", 
            Boolean.class
        );
        assertThat(tableExists).isTrue();
    }
}
```

---

### **9.5.6 Mocking Plugin Interactions**

Plugins may depend on other plugins' extension points. Mocking these dependencies ensures that your plugin behaves correctly when interacting with the platform.

**Example: Mocking Another Plugin’s Extension**

```java
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.pf4j.PluginManager;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
public class PluginInteractionTest {

    @Autowired
    private PluginManager pluginManager;

    @Test
    void testWithMockedExtensionPoint() {
        // Mock an extension point
        ChartProviderExtension mockExtension = Mockito.mock(ChartProviderExtension.class);
        when(mockExtension.getCharts()).thenReturn(List.of(new Chart("Mock Chart", "Line")));

        // Register the mock extension
        pluginManager.registerExtension(ChartProviderExtension.class, mockExtension);

        // Test behavior
        List<ChartProviderExtension> extensions = pluginManager.getExtensions(ChartProviderExtension.class);
        assertThat(extensions).hasSize(1);

        List<Chart> charts = extensions.get(0).getCharts();
        assertThat(charts).extracting("name").contains("Mock Chart");
    }
}
```

---

### **9.5.7 Best Practices for Plugin Testing**

1. **Use Unique Test Profiles**:
   - Isolate test configurations by creating separate `application-test.yml` or profiles.

2. **Mock Dependencies**:
   - Use `@MockBean` or `Mockito` to mock dependencies that are external to the plugin.

3. **Test Extension Points in Isolation**:
   - Validate both the implementation of your plugin's extension points and their integration with the platform.

4. **Validate REST APIs**:
   - Use `TestRestTemplate` or `MockMvc` to test your plugin's REST endpoints comprehensively.

5. **Verify Database Changes**:
   - Ensure Liquibase migrations are applied as expected and test the resulting database schema.

6. **Automate Tests**:
   - Include your tests in a CI/CD pipeline to catch regressions early.

7. **Focus on Integration**:
   - Test the interaction between your plugin and the platform or other plugins to ensure compatibility.


### **10. Frontend Development on the SNL Platform**

The **SNL Platform** adopts a **micro-frontend architecture**, enabling pluggable frontends that align seamlessly with the platform's extensibility goals. This architecture allows plugins to dynamically contribute user interface components, providing unparalleled flexibility in building modular, scalable applications. While Angular has been a primary consideration during development, the framework is agnostic, and plugins can be built using other technologies such as React, Vue, or even vanilla JavaScript.

This guide focuses on the design principles, integration strategies, and examples of how frontend plugins can interact with the platform.

---

### **Frontend Architecture**

The SNL Platform employs a **component-based paradigm**, where:
1. **Components**: Each plugin can publish one or more frontend components. Components can either:
   - **Serve as full pages**: Routed as standalone pages via module federation.
   - **Serve as micro-components**: Dynamically embedded into existing pages.
2. **Routing**: Components intended as full pages are routed using the `webRemotes` section in `plugin.yml`.
3. **Dynamic Loading**: Micro-components are identified by a unique `UUID` and dynamically loaded into the frontend using module federation.

---

### **Micro-Frontend Integration**

Frontend plugins interact with the SNL platform using **Module Federation**, which enables sharing and consuming frontend modules or components across plugins dynamically.

---

### **Key Concepts**

#### **10.1. Plugin Configuration**

Each plugin must declare its frontend contributions in the `plugin.yml` file. This file defines:
- **Menus**: Specifies how the plugin's UI components integrate into the platform's navigation.
- **Web Remotes**: Details the module federation configuration, including the exposed modules or components.

**Example `plugin.yml` Configuration**
```yaml
menus:
  - name: Tutorials
    type: link
    route: tutorials
    icon: library_books

webRemotes:
  - remoteEntry: "/js/elasticsearch/remoteEntry.js"
    remoteName: eaa79d93_436e_4fb8_bba7_04b44618697e
    modules:
      - name: TutorialRouting
        routePath: tutorials
        title: PLUGINS.TUTORIAL.TITLE
```

In this example:
- The `menus` section adds a new entry labeled "Tutorials" in the platform's navigation.
- The `webRemotes` section declares a federated module (`TutorialRouting`) and maps it to the `tutorials` route.

---

#### **10.2. Module Federation with Angular**

For plugins developed using Angular, modules and components are exposed via Webpack's Module Federation Plugin.

**Example `webpack.common.js` Configuration**
```js
const {
    setInferVersion,
    withModuleFederationPlugin,
    share
} = require('@angular-architects/module-federation/webpack');
setInferVersion(true);

module.exports = withModuleFederationPlugin({
    name: 'eaa79d93_436e_4fb8_bba7_04b44618697e',
    exposes: {
        'TutorialRouting': './src/main/webapp/app/tutorial/plugin.routing.ts'
    },
    shared: share({
        '@angular/core': {singleton: true, strictVersion: false},
        '@angular/common': {singleton: true, strictVersion: false},
        '@angular/router': {singleton: true, strictVersion: false},
        'rxjs': {singleton: true, strictVersion: false}
    })
});
```

**Key Points**:
1. **`name`**: Must match the `remoteName` defined in the plugin's `plugin.yml`. Use a UUID for uniqueness.
2. **`exposes`**: Maps module paths in the plugin to names accessible via federation.
3. **`shared`**: Defines libraries shared across the platform to minimize duplication.

---

#### **10.3. Component-Based Routing**

Plugins can expose individual components as web components, enabling dynamic integration across different frontend frameworks (e.g., Angular, React, Vue). These components are registered and rendered at runtime using Module Federation.

**Example `plugin.yml` for Web Components**
```yaml
webRemotes:
  - remoteEntry: "/js/react/remoteEntry.js"
    remoteName: _4bfb2d5c_cd09_431c_94c8_752c9db51596
    components:
      - exposedName: tutorial-elements
        elementName: tutorial-list
        routePath: tutorials
        title: PLUGINS.TUTORIAL.PAGES.LIST
      - exposedName: tutorial-elements
        elementName: add-tutorial-element
        routePath: tutorials/add
        title: PLUGINS.TUTORIAL.PAGES.ADD
```

**React-Based Web Component Registration**
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ExposedTutorialListComponent from "./components/exposed-tutorial-list.component";
import ExposedAddTutorialComponent from "./components/exposed-add-tutorial.component";

class TutorialsListElement extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<ExposedTutorialListComponent />, this);
    }
}

class AddTutorialElement extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<ExposedAddTutorialComponent />, this);
    }
}

customElements.define('tutorial-list', TutorialsListElement);
customElements.define('add-tutorial-element', AddTutorialElement);
```

**Webpack Configuration for React Plugin**
```js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: "_4bfb2d5c_cd09_431c_94c8_752c9db51596",
            filename: "remoteEntry.js",
            exposes: {
                'tutorial-elements': './src/main/webapp/Elements',
            },
            shared: ['react', 'react-dom']
        }),
    ]
};
```

---

### **Loading Components and Modules**

The platform dynamically loads frontend modules or components based on configuration. This is facilitated by the `loadRemoteModule` function.

#### **Loading an Angular Module**
```js
const remoteEntry = '/js/elasticsearch/remoteEntry.js';
const moduleName = 'TutorialRouting';

loadRemoteModule({
    type: 'module',
    remoteEntry: remoteEntry,
    exposedModule: moduleName
}).then((module) => {
    // Use the loaded module (e.g., activate its routing)
});
```

#### **Loading a React Web Component**
```js
const remoteEntry = '/js/react/remoteEntry.js';
const exposedModule = 'tutorial-elements';
const elementName = 'tutorial-list';

loadRemoteModule({
    type: 'module',
    remoteEntry: remoteEntry,
    exposedModule: exposedModule
}).then(() => {
    const element = document.createElement(elementName);
    document.getElementById('placeholder').appendChild(element);
});
```

**Example Angular Wrapper Component**
```ts
import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    template: `<div #placeholder></div>`,
    standalone: true
})
export class WrapperComponent implements AfterContentInit {
    @ViewChild('placeholder', { static: true }) placeholder!: ElementRef;

    async ngAfterContentInit(): Promise<void> {
        const remoteEntry = '/js/react/remoteEntry.js';
        const exposedModule = 'tutorial-elements';
        const elementName = 'tutorial-list';

        await loadRemoteModule({
            type: 'module',
            remoteEntry: remoteEntry,
            exposedModule: exposedModule
        });

        const element = document.createElement(elementName);
        this.placeholder.nativeElement.appendChild(element);
    }
}
```

---

### **Best Practices for Micro-Frontend Development**

1. **Use Unique Identifiers**:
   - Assign UUIDs to `remoteName` in `plugin.yml` and `name` in Webpack configurations to avoid conflicts.
   - For UUIDs starting with numbers, prepend `_` to ensure compatibility.

2. **Leverage Shared Libraries**:
   - Define common libraries (e.g., Angular, React, RxJS) as shared in Module Federation to reduce bundle size.

3. **Optimize Component Design**:
   - Design components to be reusable, lightweight, and framework-independent when possible.By leveraging the SNL Maven archetype, developers can quickly set up a plugin project with all the required boilerplate code, configurations, and best practices. This reduces setup time and ensures adherence to platform standards while allowing flexibility for customization.

4. **Ensure Version Compatibility**:
   - Align versions of shared libraries across plugins and the platform to avoid runtime errors.

5. **Test Extensively**:
   - Test plugins in isolation and integration with the platform to ensure seamless functionality.

6. **Fallback for Non-Angular Frameworks**:
   - For non-Angular plugins, export components as web components to ensure compatibility.

---

### **11. SNL Platform Maven Archetype: Quick Plugin Development Setup**

To streamline the process of plugin development for the **SNL Platform**, a Maven archetype is provided. This archetype facilitates the creation of a new plugin project with all the necessary configurations, folder structures, and basic test setups, enabling developers to focus on implementing business logic and custom features.

The Maven archetype is hosted in the Maven Central Repository and has the following coordinates:

```xml
<dependency>
    <groupId>io.github.mattae</groupId>
    <artifactId>snl-archetype</artifactId>
    <version>1.0.1</version>
</dependency>
```

---

### **11.1. Generating a New Plugin Project**

To generate a plugin project using the archetype, run the following Maven command:

```bash
mvn archetype:generate \
  -DarchetypeGroupId=io.github.mattae \
  -DarchetypeArtifactId=snl-archetype \
  -DarchetypeVersion=1.0.1
```

Alternatively, use your favorite IDE's Maven archetype support to initiate the project.

---

#### **11.1.1 Input Parameters**

During project generation, the archetype prompts for specific inputs. Below is a breakdown of these parameters:

| **Property**             | **Description**                                                                                                 | **Example**                                 |
|--------------------------|-------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| `plugin-id`              | Unique identifier for the plugin.                                                                            | `dashboard`                                 |
| `plugin-name`            | Display name of the plugin.                                                                                  | `Dashboard Framework`                       |
| `plugin-name-camel-case` | CamelCase name of the plugin. Typically, a concise version of the `plugin-name`.                             | `Dashboard`                                 |
| `plugin-author`          | Name and contact information for the plugin author. Markdown is supported.                                   | `[John Doe](mailto:example@gmail.com)` |
| `plugin-description`     | A brief description of the plugin. Markdown is supported.                                                    | `A base Dashboard framework for SNL`        |
| `frontend`               | Indicates the type of frontend to generate: `0` for backend-only, `1` for Angular, and `2` for React.        | `1`                                         |
| `plugin-prefix`          | Prefix for table names and REST paths to avoid conflicts across plugins.                                      | `dsf`                                       |
| `groupId`                | Maven `groupId` for the plugin.                                                                              | `io.github.johndoe`                    |
| `artifactId`             | Maven `artifactId` for the plugin.                                                                           | `dashboard`                                 |
| `version`                | Maven `version` for the plugin.                                                                              | `1.0.0`                                     |

**Sample Input Dialogue**
```
Define value for property 'plugin-id': dashboard
Define value for property 'plugin-name': Dashboard Framework
Define value for property 'plugin-name-camel-case': Dashboard
Define value for property 'plugin-author': [John Doe](mailto:example@gmail.com)
Define value for property 'plugin-description': A base Dashboard framework for SNL
Define value for property 'frontend' (should match expression '[0-2]'): 1
Define value for property 'plugin-prefix': dsf
Define value for property 'groupId': io.github.johndoe
Define value for property 'artifactId': dashboard
Define value for property 'version' 1.0-SNAPSHOT: 1.0.0
```

---

### **11.2. Generated Project Structure**

The generated project structure varies depending on whether a frontend is included.

#### **11.2.1 Backend-Only Plugin**
For a backend-only plugin (`frontend=0`):
```
src
├── main
│   ├── java
│   ├── resources
└── test
```

#### **2.2 Plugin with Angular or React Frontend**
For plugins with Angular (`frontend=1`) or React (`frontend=2`):
```
src
├── main
│   ├── java
│   ├── resources
│   └── webapp
└── test
```

---

### **11.3. Generated Configurations**

#### **11.3.1 `pom.xml`**

The `pom.xml` is pre-configured with essential dependencies, plugins, and settings optimized for SNL development. Below are notable sections:

1. **Parent Project**
    - Inherits from Spring Boot's `spring-boot-starter-parent`.
   ```xml
   <parent>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-parent</artifactId>
       <version>3.4.0</version>
       <relativePath/>
   </parent>
   ```

2. **Predefined Properties**
    - Includes settings for Java version, Node.js version, and other tools.
   ```xml
   <properties>
       <java.version>21</java.version>
       <node.version>v22.0.0</node.version>
       <yarn.version>v1.22.0</yarn.version>
   </properties>
   ```

3. **Dependencies**
    - Includes core dependencies for Spring Boot, testing, and optional frontend frameworks.
    - **Backend**: JPA, Liquibase, PostgreSQL, and security starters.
    - **Frontend**: Node.js and Yarn configurations.
   ```xml
   <dependency>
       <groupId>io.github.mattae</groupId>
       <artifactId>snl-core</artifactId>
       <version>1.0.0</version>
   </dependency>
   ```

4. **Plugins**
    - Tools for code quality (Checkstyle, Spotless), test coverage (Jacoco), and frontend integration (frontend-maven-plugin).
   ```xml
   <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-jar-plugin</artifactId>
      <version>3.4.2</version>
      <configuration>
         <archive>
            <index>true</index>
            <manifest>
               <addClasspath>true</addClasspath>
            </manifest>
            <manifestEntries>
               Plugin-Id>dashboard</Plugin-Id>
               <Plugin-Version>${project.version}</Plugin-Version>
               <Plugin-Provider>[John Doe](mailto:johndoe@gmail.com "johndoe@gmail.com")</Plugin-Provider>
               <Plugin-Description>A base Dashboard framework for SNL</Plugin-Description>
               <Plugin-Dependencies>security</Plugin-Dependencies>
               <Plugin-Class>io.github.johndoe.dasboard.DashboardPlugin</Plugin-Class>
            </manifestEntries>
         </archive>
      </configuration>
   </plugin>
   <plugin>
       <groupId>com.github.eirslett</groupId>
       <artifactId>frontend-maven-plugin</artifactId>
       <version>1.15.1</version>
   </plugin>
   ```

---

### **11.4. Key Locations and Files**

#### **11.4.1 Webpack Configuration**

For plugins with frontend capabilities (Angular or React), the `webpack` folder in Angular project is automatically generated. It contains the configurations required for **Module Federation**. For React, `vite.config.mts` is created for the same purpose

- **Location**:  
  `src/main/webapp/webpack/webpack.common.js` (Angular)
  `vite.config.mts` (React)

- **Purpose**:  
  Configures module federation for the plugin, including shared dependencies, exposed components, and routing.

**`webpack.common.js` Example Configuration:**
```js
const {
    setInferVersion,
    withModuleFederationPlugin,
    share
} = require('@angular-architects/module-federation/webpack');
setInferVersion(true);

module.exports = withModuleFederationPlugin({
    name: '_tutorials_plugin',
    exposes: {
        'TutorialRouting': './src/main/webapp/app/tutorial/tutorial.routing.ts'
    },
    shared: share({
        '@angular/core': { singleton: true, strictVersion: false },
        '@angular/router': { singleton: true, strictVersion: false },
        'rxjs': { singleton: true, strictVersion: false }
    })
});
```
**`vite.config.mts` Example Configuration:**
```js
    federation({
        name: '_tutorials_plugin',
        filename: 'remoteEntry.js',
        exposes: {
            tutorials: './src/main/webapp/Elements.jsx'
        },
        shared: ['react', 'react-dom', 'react-i18next','i18next']
    })
```

---

#### **11.4.2 Important Angular Files**

For Angular-based plugins, the archetype generates three critical files to facilitate development and testing:

1. **`handlers.js`**
    - **Location**:  
      `src/main/webapp/app/providers/mocks/handlers.js`
      - **Purpose**:  
        Simulates backend responses during frontend development by intercepting HTTP requests and providing mock data.
        - **Example**:
          ```js
          export const handlers = [
             http.get('/api/dbf/tutorials', () => {
                return HttpResponse.json([
                   {
                      "id": 1,
                      "title": "Introduction to Java",
                      "description": "A beginner's guide to Java programming language.",
                      "published": true
                   },
                   {
                      "id": 2,
                      "title": "Understanding Spring Boot",
                      "description": "A comprehensive tutorial on building RESTful APIs using Spring Boot.",
                      "published": false
                   }
                ])
             })
          ];
        ```

2. **`icons.provider.ts`**
    - **Location**:  
      `src/main/webapp/app/providers/icons.provider.ts`
    - **Purpose**:  
      Registers custom icons for use with Angular Material's `mat-icon` during development.
    - **Example**:
      ```ts
      matIconRegistry.addSvgIcon(
          'custom-icon',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/custom-icon.svg')
      );
      ```

3. **`navigation.service.ts`**
    - **Location**:  
      `src/main/webapp/app/services/navigation.service.ts`
    - **Purpose**:  
      Manages dynamic menu navigation in the Angular application.
    - **Example**:
      ```ts
       import { Injectable } from '@angular/core';
       import { FuseNavigationItem } from '@mattae/angular-shared';

        @Injectable({
        providedIn: 'root'
        })
        export class NavigationService {
        
            navigations(): FuseNavigationItem[] {
                return [
                    {
                        title:'PLUGINS.TUTORIAL.TITLE',
                        type: 'basic',
                        link: 'tutorials'
                    }
                ]
            }
        }
      ```
For React-based plugins, the archetype generates three critical files to facilitate development and testing:
1. **`handlers.js`**
    - **Location**:  
      `src/main/webapp/mocks/handlers.js`
        - **Purpose**:  
          Simulates backend responses during frontend development by intercepting HTTP requests and providing mock data.
            - **Example**:
              ```js
              export const handlers = [
                 http.get('/api/dbf/tutorials', () => {
                    return HttpResponse.json([
                       {
                          "id": 1,
                          "title": "Introduction to Java",
                          "description": "A beginner's guide to Java programming language.",
                          "published": true
                       },
                       {
                          "id": 2,
                          "title": "Understanding Spring Boot",
                          "description": "A comprehensive tutorial on building RESTful APIs using Spring Boot.",
                          "published": false
                       }
                    ])
                 })
              ];
              
2. **`pagesData.tsx`**
   - **Location**
     `src/main/webapp/pages`
---

#### **11.5 `plugin.yml` Test Class**

The archetype generates a test class to validate the correctness of the `plugin.yml` file.

- **Location**:  
  `src/test/java/.../PluginConfigurationTest.java`

- **Purpose**:  
  Ensures the `plugin.yml` conforms to required standards and integrates correctly with the platform.

**Example Test Class:**
```java
import static org.junit.jupiter.api.Assertions.assertTrue;

@IntegrationTest
public class PluginConfigurationTest {

    @Test
    void shouldLoadPluginYml() {
       String config = new String(Files.readAllBytes(new ClassPathResource("plugin.yml").getFile().toPath()));
        assertTrue(ConfigSchemaValidator.isValid(config), "Configuration file is not correct");
    }
}
```

---

### **11.6. Integration Testing with @IntegrationTest**

#### **11.6.1 @IntegrationTest Annotation**

The `@IntegrationTest` annotation is preconfigured to simplify the setup of integration tests. It bundles multiple Spring and Mockito configurations, enabling testing of services, repositories, and domain models with minimal boilerplate.

- **Location**:  
  `src/test/java/.../IntegrationTest.java`

- **Definition**:
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest
@ExtendWith({SpringExtension.class, MockitoExtension.class})
@DirtiesContext
@ContextConfiguration
@AutoConfigureEmbeddedDatabase(provider = AutoConfigureEmbeddedDatabase.DatabaseProvider.ZONKY)
@TestExecutionListeners({
    DependencyInjectionTestExecutionListener.class,
    DirtiesContextTestExecutionListener.class,
    TransactionalTestExecutionListener.class,
    MockitoTestExecutionListener.class
})
@ComponentScan(basePackageClasses = {DashboardPluginApp.class, TestConfiguration.class})
@EntityScan(basePackageClasses = {CoreDomain.class, DashboardDomain.class})
@Import(ContextProvider.class)
public @interface IntegrationTest {}
```

#### **11.6.2 Key Features of @IntegrationTest**
- **Database Setup**: Configures an **embedded PostgreSQL database** using Zonky.
- **Context Cleanup**: Ensures clean application context for each test.
- **Spring and Mockito**: Integrates Spring Boot testing with Mockito for mocking dependencies.
- **Entity Scanning**: Includes domain classes specific to the plugin and the platform.
- **Test Listeners**: Manages transactional and dependency injection test execution.

---

#### **11.6.3 Example Integration Test**

**Test a Service with @IntegrationTest**
```java
@IntegrationTest
public class TutorialServiceTest {

    @Autowired
    private TutorialService service;

    @Test
    void shouldCreateServiceInstance() {
        assertNotNull(service, "The TutorialService instance should be created");
    }

    @Test
    void shouldReturnAllTutorials() {
        List<Tutorial> tutorials = service.getAllTutorials();
        assertFalse(tutorials.isEmpty(), "The service should return a list of tutorials");
    }
}
```

**Explanation**:
1. The `@IntegrationTest` annotation automatically configures the test with an embedded PostgreSQL database and a Spring application context.
2. Mocked services and components can be injected and tested without additional setup.

---

### **11.7. Frontend and Backend Integration**

For Angular or React plugins, the archetype sets up backend tests alongside frontend development configurations. These setups enable seamless testing and integration.

#### **Backend Testing**
- **Database Tests**: Test repository classes and query logic using the preconfigured embedded PostgreSQL database.

**Example Repository Test:**
```java
@IntegrationTest
public class TutorialRepositoryTest {

    @Autowired
    private TutorialRepository repository;

    @Test
    void shouldSaveAndRetrieveTutorial() {
        Tutorial tutorial = new Tutorial("Test Title", "Test Description");
        repository.save(tutorial);

        List<Tutorial> tutorials = repository.findAll();
        assertTrue(tutorials.stream().anyMatch(t -> t.getTitle().equals("Test Title")));
    }
}
```

---

### **11.8. Running the Application in Development Mode**

The generated application includes a development profile to facilitate testing prior to deployment. To run the application in development mode, execute one of the following commands:

- **Using npm**:
  ```bash
  npm run dev:run
  ```

- **Using Maven**:
  ```bash
  ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
  ```

This will start the application on the default port **8080**.

---

### **Database Configuration**
Before starting the application, you can configure database parameters in the `application-dev.yml` file. Below is an example of the configuration file:

```yaml
spring:
    datasource:
        username: snl                 # Database username
        password: snl                 # Database password
        driver-class-name: org.postgresql.Driver
        url: jdbc:postgresql://127.0.0.1:5432/snl  # Database URL
```

Ensure the values for `username`, `password`, and `url` align with your database setup.

---

### **Development-Specific Configuration Classes**
The following configuration classes are provided to support development mode and are not activated in production deployments:

1. **`BlazePersistenceConfiguration`**
2. **`EntityViewConfiguration`**
3. **`SecurityConfig`**

These can be adjusted to suit your development requirements as needed.

---

### **Swagger UI**
Swagger UI is enabled in development mode and can be accessed at:
[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

This interface provides an interactive API documentation tool, allowing you to test and explore the application's endpoints.

---

### **11.9. Best Practices**

1. **Organize Configuration Files**:
    - Keep the `webpack.common.js` in the `webpack` folder.
    - Use `handlers.js` and `icons.provider.ts` in Angular, for clean frontend configurations.

2. **Use Unique Prefixes**:
    - Use the `plugin-prefix` for database tables and REST endpoints to avoid conflicts.

3. **Validate Metadata**:
    - Include tests for `plugin.yml` to ensure compliance with platform standards.

4. **Leverage Integration Testing**:
    - Use `@IntegrationTest` for comprehensive backend tests with minimal boilerplate.

5. **Test Frontend Components**:
    - Mock API responses during frontend development using `handlers.js`.

6. **Test Thoroughly in Development Mode**:
    - Before deployment, use the development profile to test all key features, including database interactions, API functionality, and security configurations.

---
### **12. Running the Application and Plugins**

The **SNL Platform** is designed as a pluggable framework that leverages a **Spring Boot** application (`snl.jar`) to manage its core functionalities. To get started, you need to configure a PostgreSQL database, prepare your plugins, and start the application.

---

### **12.1 Prerequisites**

Before running the application, ensure you have the following:
1. **PostgreSQL Database**:
   - The platform requires a PostgreSQL database for persistence. Install and configure PostgreSQL **>=16** if it is not already available on your system.
   - Create a database and user for the application.
2. **Java Runtime**:
   - The application requires **JRE/JDK 21** or later to run. Ensure that the appropriate version is installed and set up in your environment.

---

### **12.2 Setting Up the Application**

#### **Step 1: Create `application.yml`**

The application requires an `application.yml` file for configuration. This file defines the database connection parameters and other settings.

**Example `application.yml` File:**
```yaml
spring:
    datasource:
        username: snl                 # Database username
        password: snl                 # Database password
        driver-class-name: org.postgresql.Driver
        url: jdbc:postgresql://127.0.0.1:5432/snl  # Database URL
```

**Instructions**:
- Replace `username`, `password`, and `url` with the credentials and connection string for your PostgreSQL database.
- Place the `application.yml` file in the root directory where you plan to run the application.

#### **Step 2: Prepare the `plugins` Folder**

1. Create a folder named `plugins` in the root directory where you will run the application.
   ```bash
   mkdir plugins
   ```
2. Add your plugin JAR files (and any dependent plugins) into this `plugins` folder.
   - Example folder structure:
     ```
     plugins/
     ├── my-plugin.jar
     ├── security.jar
     ├── angular-frontend.jar
     ```

#### **Step 3: Start the Application**

Use the following command to start the application:
```bash
java -jar snl.jar --spring.config.additional-location=application.yml
```

- **`snl.jar`**: The Spring Boot application file.
- **`--spring.config.additional-location`**: Specifies the location of the `application.yml` file.

---

### **12.3 Accessing the Application**

After starting the application:
1. Open your browser and navigate to:
   - Default: [http://localhost:8080](http://localhost:8080)
   - Or on the port specified in your `application.yml`.
2. **Swagger Documentation**:
   - Access API documentation at: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html).

---

### **12.4 Installing Plugins**

If no plugins are present in the `plugins` folder when the application starts, the platform will load only its core functionalities. To install plugins after the application is running:

1. **Place Plugin JAR Files**:
   - Add your plugin JARs to the `plugins` folder.

2. **Interact with the API**:
   - Use a tool like **Postman** to interact with the platform's REST API.
   - By default, basic authentication is enabled:
      - **Username**: `admin`
      - **Password**: `admin`

   - After plugins are installed, JWT Bearer Authentication will be required if `security.jar` is loaded.

---

### **12.5 Initial Plugins and Admin Access**

If your `plugins` folder contains the following base plugins:
1. **`security.jar`**: Provides security features, including JWT authentication.
2. **`angular-frontend.jar`**: Offers a user interface for interacting with the platform and plugins.

The platform will generate an initial password for the `admin` user. This password will be displayed in the console logs between the following log entries:
```
====================================================================
=========Copy and use the password below for initial login==========
Generated Password: <your-password-here>
====================================================================
====================================================================
```

---

### **12.6 Post-Initialization Behavior**

- **With `security.jar` Plugin**:
   - Basic authentication (`admin/admin`) will be disabled.
   - Only JWT Bearer Authentication will be supported going forward.
   - Use the generated admin password to log in initially and create new users or tokens.

- **With `angular-frontend.jar` Plugin**:
   - A graphical user interface (GUI) will be available for easier management and interaction with the platform.
   - The UI is accessible at the application URL (e.g., [http://localhost:8080](http://localhost:8080)).

---

### **12.7 Summary**

1. **Preconditions**:
   - Ensure PostgreSQL is configured and running.
   - Verify that JRE/JDK 21+ is installed.

2. **Configuration**:
   - Create and customize the `application.yml` file.
   - Place plugins and their dependencies in the `plugins` folder.

3. **Startup**:
   - Start the application with the `java -jar` command.
   - Access the application at the specified URL.

4. **Default Credentials**:
   - Username: `admin`
   - Password: `admin` (or the generated password from logs if `security.jar` is used).

5. **API and Swagger**:
   - Explore API endpoints using Swagger at [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html).


Provide documentation on how to generate translation files
