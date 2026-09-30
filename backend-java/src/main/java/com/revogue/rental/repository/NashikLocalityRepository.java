package com.revogue.rental.repository;

import com.revogue.rental.model.NashikLocality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NashikLocalityRepository extends JpaRepository<NashikLocality, Long> {
    List<NashikLocality> findByActiveTrue();
    Optional<NashikLocality> findByPincode(String pincode);
}
