package com.revogue.rental.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "rental_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String bookingId;

    @Column(nullable = false)
    private String customerId;

    @Column(nullable = false)
    private String customerName;

    private String customerPhone;

    // Garment information
    private String productId;
    private String productName;
    private String productBrand;
    private String selectedSize;
    private String backupSize;

    // Rental Dates
    private int rentalDurationDays;
    private LocalDate startDate;
    private LocalDate endDate;

    // Nashik specific destination
    private String deliveryCity = "Nashik";
    private String nashikLocality;
    private String streetAddress;
    private String pincode;

    // Financials
    private Double rentalFee;
    private Double securityDeposit;
    private Double discountApplied;
    private Double totalPaid;

    @Enumerated(EnumType.STRING)
    private DepositStatus depositStatus;

    private String depositRefundUpi;
    private String depositRefundTxn;

    @Enumerated(EnumType.STRING)
    private RentalStatus status;

    private String courierRiderName;
    private String courierContact;

    private LocalDateTime createdAt = LocalDateTime.now();
}
