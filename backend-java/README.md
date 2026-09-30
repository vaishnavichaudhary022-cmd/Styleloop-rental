# REVOGUE Luxury Dress Rental - Java Spring Boot Backend

Enterprise REST API backend built in **Java 17 / Spring Boot 3** for designer dress rentals, security deposit escrow automation, and exclusive **Nashik, Maharashtra** delivery logistics.

---

## 🚀 Quickstart

### Prerequisites
- Java 17 or higher (`java -version`)
- Maven 3.8+ (`mvn -version`)

### 1. Build and Run
```bash
cd backend-java
mvn clean spring-boot:run
```

The server starts on port `8080`.

---

## 📡 Key REST Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/rentals/customer/{customerId}` | Retrieves full customer rental history, active Nashik tracking, and deposit status |
| `POST` | `/api/v1/rentals/book` | Books a new designer rental with Nashik address validation & escrow deposit hold |
| `POST` | `/api/v1/rentals/{bookingId}/extend` | Extends active rental by +2 or +3 days with updated return dates |
| `GET` | `/api/v1/delivery/nashik-localities` | Fetches active delivery zones (College Rd, Gangapur Rd, Indira Nagar, etc.) |
| `GET` | `/api/v1/delivery/check-pincode/{pincode}` | Validates if a pincode is within Nashik Municipal limits (422xxx) |

---

## 🛠️ Interactive Documentation & DB Console

- **Swagger UI / OpenAPI Spec:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **H2 In-Memory DB Web Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - JDBC URL: `jdbc:h2:mem:revoguedb`
  - Username: `sa`
  - Password: *(leave blank)*

---

## 📍 Nashik Exclusive Operational Zones
- College Road (422005) - Hub: Thatte Nagar
- Gangapur Road (422013) - Hub: Gangapur Corridor
- Mahatma Nagar (422007)
- Indira Nagar (422009)
- Govind Nagar & City Centre (422009)
- Panchavati (422003)
- Nashik Road & Bytco (422101)
- Tidke Colony & Canada Corner (422002)
- CIDCO & Trimurti Chowk (422009)
- Deolali Camp (422401)
