package com.revogue.rental.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "nashik_localities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NashikLocality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String localityName;

    @Column(nullable = false)
    private String pincode;

    private String hubName;

    private String deliveryHoursEstimate;

    private boolean active = true;

    public NashikLocality(String localityName, String pincode, String hubName, String deliveryHoursEstimate) {
        this.localityName = localityName;
        this.pincode = pincode;
        this.hubName = hubName;
        this.deliveryHoursEstimate = deliveryHoursEstimate;
        this.active = true;
    }
}
