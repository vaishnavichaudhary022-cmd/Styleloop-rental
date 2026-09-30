package com.revogue.rental.dto;

import com.revogue.rental.model.RentalOrder;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalOrderResponse {
    private boolean success;
    private String message;
    private String bookingId;
    private String hubAssigned;
    private String estimatedDelivery;
    private RentalOrder order;
}
