package com.revogue.rental.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalBookingRequest {

    @NotBlank(message = "Customer ID is required")
    private String customerId;

    @NotBlank(message = "Customer Name is required")
    private String customerName;

    private String customerPhone;

    @NotBlank(message = "Product ID is required")
    private String productId;

    private String productName;
    private String productBrand;

    @NotBlank(message = "Size is required")
    private String selectedSize;

    private String backupSize;

    private int rentalDurationDays = 4;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotBlank(message = "Street address is required")
    private String streetAddress;

    @NotBlank(message = "Nashik locality is required")
    private String nashikLocality;

    @NotBlank(message = "Nashik pincode is required")
    private String pincode;

    private Double rentalFee;
    private Double securityDeposit;
}
