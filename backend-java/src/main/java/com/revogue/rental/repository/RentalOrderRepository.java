package com.revogue.rental.repository;

import com.revogue.rental.model.RentalOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalOrderRepository extends JpaRepository<RentalOrder, Long> {
    List<RentalOrder> findByCustomerIdOrderByCreatedAtDesc(String customerId);
    Optional<RentalOrder> findByBookingId(String bookingId);
}
