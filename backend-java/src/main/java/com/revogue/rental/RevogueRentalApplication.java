package com.revogue.rental;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RevogueRentalApplication {

    public static void main(String[] args) {
        SpringApplication.run(RevogueRentalApplication.class, args);
        System.out.println("==================================================");
        System.out.println("  REVOGUE Haute Couture Rentals Java Backend Started!");
        System.out.println("  Service Location: Nashik, Maharashtra");
        System.out.println("  Swagger UI: http://localhost:8080/swagger-ui.html");
        System.out.println("  H2 Console: http://localhost:8080/h2-console");
        System.out.println("==================================================");
    }
}
