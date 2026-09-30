package com.revogue.rental.service;

import com.revogue.rental.model.NashikLocality;
import com.revogue.rental.repository.NashikLocalityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NashikDeliveryService {

    private final NashikLocalityRepository localityRepository;

    public NashikDeliveryService(NashikLocalityRepository localityRepository) {
        this.localityRepository = localityRepository;
    }

    public boolean isPincodeServicedInNashik(String pincode) {
        if (pincode == null) return false;
        // Pincode must be in Nashik region (422xxx)
        return pincode.trim().startsWith("422");
    }

    public List<NashikLocality> getAllNashikLocalities() {
        return localityRepository.findByActiveTrue();
    }

    public String resolveAssignedHub(String localityName) {
        if (localityName == null) return "West Nashik Central Hub (Thatte Nagar)";
        String lower = localityName.toLowerCase();
        if (lower.contains("gangapur")) {
            return "Gangapur Corridor Hub";
        } else if (lower.contains("indira") || lower.contains("govind") || lower.contains("city centre")) {
            return "South Nashik Hub (Govind Nagar)";
        } else if (lower.contains("panchavati")) {
            return "Old Nashik & Heritage Hub";
        } else if (lower.contains("road") || lower.contains("deolali")) {
            return "Nashik Road & Cantonment Hub";
        }
        return "West Nashik Central Hub (Thatte Nagar)";
    }
}
