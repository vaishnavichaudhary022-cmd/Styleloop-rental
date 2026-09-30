package com.revogue.rental.controller;

import com.revogue.rental.model.NashikLocality;
import com.revogue.rental.service.NashikDeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/delivery")
@CrossOrigin(origins = "*")
public class NashikDeliveryController {

    private final NashikDeliveryService deliveryService;

    public NashikDeliveryController(NashikDeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/nashik-localities")
    public ResponseEntity<List<NashikLocality>> getNashikLocalities() {
        return ResponseEntity.ok(deliveryService.getAllNashikLocalities());
    }

    @GetMapping("/check-pincode/{pincode}")
    public ResponseEntity<Map<String, Object>> checkPincode(@PathVariable String pincode) {
        boolean serviced = deliveryService.isPincodeServicedInNashik(pincode);
        Map<String, Object> res = new HashMap<>();
        res.put("pincode", pincode);
        res.put("serviced", serviced);
        res.put("city", "Nashik");
        res.put("state", "Maharashtra");
        if (serviced) {
            res.put("message", "Address is within Nashik express delivery corridor.");
        } else {
            res.put("message", "We currently operate exclusively in Nashik city & cantonment areas (422xxx).");
        }
        return ResponseEntity.ok(res);
    }
}
