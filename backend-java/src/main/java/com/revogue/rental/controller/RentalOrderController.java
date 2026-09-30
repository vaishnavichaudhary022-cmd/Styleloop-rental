package com.revogue.rental.controller;

import com.revogue.rental.dto.RentalBookingRequest;
import com.revogue.rental.dto.RentalOrderResponse;
import com.revogue.rental.model.RentalOrder;
import com.revogue.rental.service.RentalOrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rentals")
@CrossOrigin(origins = "*")
public class RentalOrderController {

    private final RentalOrderService rentalOrderService;

    public RentalOrderController(RentalOrderService rentalOrderService) {
        this.rentalOrderService = rentalOrderService;
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<RentalOrder>> getCustomerRentalHistory(@PathVariable String customerId) {
        List<RentalOrder> orders = rentalOrderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/book")
    public ResponseEntity<RentalOrderResponse> createBooking(@Valid @RequestBody RentalBookingRequest request) {
        RentalOrderResponse response = rentalOrderService.processBooking(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{bookingId}/extend")
    public ResponseEntity<RentalOrder> extendRental(
            @PathVariable String bookingId,
            @RequestParam(defaultValue = "2") int additionalDays) {
        RentalOrder updated = rentalOrderService.extendRental(bookingId, additionalDays);
        return ResponseEntity.ok(updated);
    }
}
