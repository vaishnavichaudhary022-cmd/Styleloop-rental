package com.revogue.rental.service;

import com.revogue.rental.dto.RentalBookingRequest;
import com.revogue.rental.dto.RentalOrderResponse;
import com.revogue.rental.model.DepositStatus;
import com.revogue.rental.model.RentalOrder;
import com.revogue.rental.model.RentalStatus;
import com.revogue.rental.repository.RentalOrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class RentalOrderService {

    private final RentalOrderRepository rentalOrderRepository;
    private final NashikDeliveryService nashikDeliveryService;

    public RentalOrderService(RentalOrderRepository rentalOrderRepository,
                              NashikDeliveryService nashikDeliveryService) {
        this.rentalOrderRepository = rentalOrderRepository;
        this.nashikDeliveryService = nashikDeliveryService;
    }

    public List<RentalOrder> getOrdersByCustomerId(String customerId) {
        return rentalOrderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public RentalOrderResponse processBooking(RentalBookingRequest request) {
        // Validate Nashik Service Area
        if (!nashikDeliveryService.isPincodeServicedInNashik(request.getPincode())) {
            return RentalOrderResponse.builder()
                    .success(false)
                    .message("Delivery is currently restricted exclusively to Nashik (422xxx). Selected pincode is outside service limits.")
                    .build();
        }

        String assignedHub = nashikDeliveryService.resolveAssignedHub(request.getNashikLocality());
        String generatedBookingId = "RVG-NSK-" + LocalDate.now().getYear() + "-" + (1000 + (int)(Math.random() * 9000));

        LocalDate startDate = request.getStartDate();
        LocalDate endDate = startDate.plusDays(request.getRentalDurationDays());

        Double rentalFee = request.getRentalFee() != null ? request.getRentalFee() : 2499.0;
        Double deposit = request.getSecurityDeposit() != null ? request.getSecurityDeposit() : 1000.0;
        Double discount = rentalFee * 0.40; // 40% promo
        Double total = (rentalFee - discount) + deposit;

        RentalOrder order = RentalOrder.builder()
                .bookingId(generatedBookingId)
                .customerId(request.getCustomerId())
                .customerName(request.getCustomerName())
                .customerPhone(request.getCustomerPhone())
                .productId(request.getProductId())
                .productName(request.getProductName() != null ? request.getProductName() : "Designer Couture Fit")
                .productBrand(request.getProductBrand() != null ? request.getProductBrand() : "REVOGUE Archive")
                .selectedSize(request.getSelectedSize())
                .backupSize(request.getBackupSize() != null ? request.getBackupSize() : "Complimentary Backup Size")
                .rentalDurationDays(request.getRentalDurationDays())
                .startDate(startDate)
                .endDate(endDate)
                .deliveryCity("Nashik")
                .nashikLocality(request.getNashikLocality())
                .streetAddress(request.getStreetAddress())
                .pincode(request.getPincode())
                .rentalFee(rentalFee)
                .securityDeposit(deposit)
                .discountApplied(discount)
                .totalPaid(total)
                .depositStatus(DepositStatus.HELD_IN_ESCROW)
                .status(RentalStatus.BOOKED)
                .courierRiderName("Akash Deshmukh (Nashik Express Fleet)")
                .courierContact("+91 94239 88120")
                .build();

        RentalOrder saved = rentalOrderRepository.save(order);

        return RentalOrderResponse.builder()
                .success(true)
                .message("Booking confirmed for delivery across " + request.getNashikLocality())
                .bookingId(saved.getBookingId())
                .hubAssigned(assignedHub)
                .estimatedDelivery(startDate.minusDays(1).toString() + " afternoon")
                .order(saved)
                .build();
    }

    public RentalOrder extendRental(String bookingId, int additionalDays) {
        RentalOrder order = rentalOrderRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + bookingId));

        order.setRentalDurationDays(order.getRentalDurationDays() + additionalDays);
        order.setEndDate(order.getEndDate().plusDays(additionalDays));

        return rentalOrderRepository.save(order);
    }
}
