import React, { useState } from 'react';
import {
  X,
  Code2,
  Server,
  Terminal,
  Database,
  CheckCircle2,
  Copy,
  ExternalLink,
  Zap,
  Play,
  Layers,
  Sparkles,
  MapPin,
  Cpu
} from 'lucide-react';

interface JavaBackendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JavaBackendModal: React.FC<JavaBackendModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'code' | 'schema' | 'quickstart'>('endpoints');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('get-rentals');
  const [copiedCode, setCopiedCode] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('RentalOrderController.java');

  if (!isOpen) return null;

  const endpoints = [
    {
      id: 'get-rentals',
      method: 'GET',
      path: '/api/v1/rentals/customer/{customerId}',
      desc: 'Retrieves customer rental history, active Nashik courier tracking, and security deposit status',
      sampleParams: { customerId: 'user-cust-1' },
      sampleResponse: {
        success: true,
        customerId: 'user-cust-1',
        totalBookings: 4,
        activeInNashik: 2,
        totalDepositRefunded: 2300,
        rentals: [
          {
            bookingId: 'RVG-NSK-2024-9182',
            productName: 'Ivory & Champagne Gold Chikankari Bridal Lehenga',
            rentalDurationDays: 4,
            startDate: '2024-10-11',
            endDate: '2024-10-15',
            nashikLocality: 'College Road, Nashik (422005)',
            status: 'OUT_FOR_DELIVERY',
            securityDeposit: 1500,
            depositStatus: 'HELD_IN_ESCROW',
            courierRider: 'Akash Deshmukh',
            contact: '+91 94239 88120'
          }
        ]
      }
    },
    {
      id: 'post-book',
      method: 'POST',
      path: '/api/v1/rentals/book',
      desc: 'Creates a new designer dress rental booking with Nashik delivery validation & deposit escrow',
      sampleParams: {
        productId: 'prod-w-wed3',
        selectedSize: 'M',
        rentalDays: 4,
        startDate: '2024-10-15',
        nashikPincode: '422005',
        localityId: 'nsk-collegerd'
      },
      sampleResponse: {
        status: 'SUCCESS',
        bookingId: 'RVG-NSK-2024-9921',
        estimatedDelivery: '2024-10-14T14:00:00+05:30',
        hub: 'West Nashik Central Hub (Thatte Nagar)',
        depositEscrowStatus: 'CONFIRMED',
        message: 'Order placed successfully for Nashik delivery'
      }
    },
    {
      id: 'get-localities',
      method: 'GET',
      path: '/api/v1/delivery/nashik-localities',
      desc: 'Returns active Nashik operational delivery zones (College Rd, Gangapur Rd, Indira Nagar, etc.)',
      sampleParams: {},
      sampleResponse: {
        city: 'Nashik',
        state: 'Maharashtra',
        operatingRadiusKm: 25,
        totalLocalities: 12,
        activeHubs: ['Gangapur Corridor Hub', 'West Nashik Central Hub', 'Govind Nagar Express Hub'],
        localities: [
          { name: 'College Road', pincode: '422005', deliveryHours: '2-3 Hours' },
          { name: 'Gangapur Road', pincode: '422013', deliveryHours: '2-3 Hours' },
          { name: 'Indira Nagar', pincode: '422009', deliveryHours: '2-4 Hours' }
        ]
      }
    },
    {
      id: 'post-extend',
      method: 'POST',
      path: '/api/v1/rentals/{bookingId}/extend',
      desc: 'Extends active rental duration by +2 or +3 days with real-time Nashik inventory re-check',
      sampleParams: { bookingId: 'RVG-NSK-2024-9182', additionalDays: 2 },
      sampleResponse: {
        bookingId: 'RVG-NSK-2024-9182',
        originalReturnDate: '2024-10-15',
        newReturnDate: '2024-10-17',
        extensionFee: 799,
        reversePickupRescheduled: true,
        hubNotified: 'West Nashik Central Hub'
      }
    }
  ];

  const javaFiles: Record<string, string> = {
    'RentalOrderController.java': `package com.revogue.rental.controller;

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
    public ResponseEntity<List<RentalOrder>> getCustomerRentalHistory(
            @PathVariable String customerId) {
        List<RentalOrder> orders = rentalOrderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/book")
    public ResponseEntity<RentalOrderResponse> createBooking(
            @Valid @RequestBody RentalBookingRequest request) {
        RentalOrderResponse response = rentalOrderService.processBooking(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{bookingId}/extend")
    public ResponseEntity<RentalOrder> extendRental(
            @PathVariable String bookingId,
            @RequestParam int additionalDays) {
        RentalOrder updated = rentalOrderService.extendRental(bookingId, additionalDays);
        return ResponseEntity.ok(updated);
    }
}`,

    'RentalOrder.java': `package com.revogue.rental.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "rental_orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RentalOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String bookingId; // e.g. RVG-NSK-2024-9182

    @Column(nullable = false)
    private String customerId;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerPhone;

    // Garment Details
    private String productId;
    private String productName;
    private String productBrand;
    private String selectedSize;
    private String backupSize;

    // Rental Period
    private int rentalDurationDays;
    private LocalDate startDate;
    private LocalDate endDate;

    // Nashik Specific Delivery Zone
    @Column(nullable = false)
    private String deliveryCity = "Nashik";
    private String nashikLocality; // College Road, Gangapur Road, etc.
    private String streetAddress;
    private String pincode; // 422005

    // Financials & Security Deposit Escrow
    private Double rentalFee;
    private Double securityDeposit; // e.g. 1500
    private Double discountApplied;
    private Double totalPaid;

    @Enumerated(EnumType.STRING)
    private DepositStatus depositStatus; // HELD_IN_ESCROW, REFUNDED

    private String depositRefundUpi;
    private String depositRefundTxn;

    @Enumerated(EnumType.STRING)
    private RentalStatus status; // OUT_FOR_DELIVERY, WITH_CUSTOMER, COMPLETED

    private String courierRiderName;
    private String courierContact;

    private LocalDateTime createdAt = LocalDateTime.now();
}`,

    'NashikDeliveryService.java': `package com.revogue.rental.service;

import com.revogue.rental.model.NashikLocality;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NashikDeliveryService {

    // Validates that delivery is exclusively within Nashik Municipal Corporation
    public boolean isPincodeServiced(String pincode) {
        if (pincode == null) return false;
        // Nashik pincodes range from 422001 to 422401
        return pincode.startsWith("422");
    }

    public List<NashikLocality> getOperationalLocalities() {
        return List.of(
            new NashikLocality("College Road", "422005", "West Nashik Central Hub", "2-3 Hours"),
            new NashikLocality("Gangapur Road", "422013", "Gangapur Corridor Hub", "2-3 Hours"),
            new NashikLocality("Mahatma Nagar", "422007", "West Nashik Central Hub", "2-4 Hours"),
            new NashikLocality("Indira Nagar", "422009", "South Nashik Hub", "2-4 Hours"),
            new NashikLocality("Govind Nagar & City Centre", "422009", "Govind Nagar Express Hub", "1-2 Hours"),
            new NashikLocality("Panchavati", "422003", "Old Nashik & Heritage Hub", "3-4 Hours"),
            new NashikLocality("Nashik Road", "422101", "Nashik Road Station Hub", "3-5 Hours"),
            new NashikLocality("Tidke Colony & Canada Corner", "422002", "Central Nashik Hub", "2-3 Hours"),
            new NashikLocality("CIDCO", "422009", "CIDCO Zone Hub", "2-4 Hours"),
            new NashikLocality("Deolali Camp", "422401", "Cantonment Express Hub", "4-5 Hours")
        );
    }
}`,

    'pom.xml': `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
    </parent>
    <groupId>com.revogue</groupId>
    <artifactId>rental-backend</artifactId>
    <version>1.0.0</version>
    <name>REVOGUE Java Backend</name>
    <description>Spring Boot 3 REST API for Designer Dress Rental Platform (Nashik)</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.3.0</version>
        </dependency>
    </dependencies>
</project>`
  };

  const handleTestEndpoint = (ep: any) => {
    setSimulatedResponse(JSON.stringify(ep.sampleResponse, null, 2));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-neutral-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-neutral-900 font-brand">
                  Java Spring Boot Backend Architecture
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Java 17 / Spring Boot 3
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                REST API Microservice for Dress Rentals, Security Deposit Escrow & Nashik Localities
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2 border-b border-neutral-100 bg-neutral-50 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'endpoints', label: 'REST API Endpoints & Live Tester', icon: Zap },
            { id: 'code', label: 'Java Spring Boot Code Viewer', icon: Code2 },
            { id: 'schema', label: 'Database Schema & Nashik Tables', icon: Database },
            { id: 'quickstart', label: 'How to Run (mvn clean install)', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar">
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  All endpoints are configured with Spring Web MVC, JPA Hibernate entities, and CORS mapping for this web application.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Endpoints List */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block">
                    Available Spring Boot Endpoints
                  </span>
                  {endpoints.map((ep) => {
                    const isSelected = selectedEndpoint === ep.id;
                    return (
                      <div
                        key={ep.id}
                        onClick={() => {
                          setSelectedEndpoint(ep.id);
                          handleTestEndpoint(ep);
                        }}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                              ep.method === 'GET'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {ep.method}
                          </span>
                          <span className="font-mono text-xs font-bold text-neutral-900 truncate">
                            {ep.path}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                          {ep.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* API Request & Response Simulation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider">
                      Spring Boot JSON Response
                    </span>
                    <button
                      onClick={() => {
                        const ep = endpoints.find((e) => e.id === selectedEndpoint);
                        if (ep) handleTestEndpoint(ep);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <Play className="w-3 h-3" /> Execute Test
                    </button>
                  </div>

                  <div className="bg-neutral-950 text-emerald-400 p-4 rounded-2xl font-mono text-[11px] h-80 overflow-y-auto border border-neutral-800 shadow-inner">
                    <pre className="whitespace-pre-wrap">
                      {simulatedResponse ||
                        JSON.stringify(
                          endpoints.find((e) => e.id === selectedEndpoint)?.sampleResponse,
                          null,
                          2
                        )}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              {/* File Selector */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {Object.keys(javaFiles).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                      selectedFile === fileName
                        ? 'bg-neutral-900 text-amber-300'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {fileName}
                  </button>
                ))}
              </div>

              {/* Code Display */}
              <div className="relative bg-neutral-950 text-neutral-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-neutral-800 shadow-inner">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(javaFiles[selectedFile]);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-bold flex items-center gap-1"
                >
                  {copiedCode ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <pre className="leading-relaxed">{javaFiles[selectedFile]}</pre>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-rose-500" />
                    Table: rental_orders
                  </h4>
                  <ul className="text-xs text-neutral-600 space-y-1 font-mono text-[11px]">
                    <li>id BIGINT PRIMARY KEY AUTO_INCREMENT</li>
                    <li>booking_id VARCHAR(32) UNIQUE</li>
                    <li>customer_id VARCHAR(64)</li>
                    <li>customer_name VARCHAR(128)</li>
                    <li>product_id VARCHAR(64)</li>
                    <li>selected_size VARCHAR(16)</li>
                    <li>backup_size VARCHAR(32)</li>
                    <li>rental_duration_days INT</li>
                    <li>start_date DATE</li>
                    <li>end_date DATE</li>
                    <li>delivery_city VARCHAR(32) DEFAULT 'Nashik'</li>
                    <li>nashik_locality VARCHAR(128)</li>
                    <li>pincode VARCHAR(10)</li>
                    <li>rental_fee DECIMAL(10,2)</li>
                    <li>security_deposit DECIMAL(10,2)</li>
                    <li>deposit_status VARCHAR(32)</li>
                    <li>status VARCHAR(32)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Table: nashik_localities
                  </h4>
                  <ul className="text-xs text-neutral-600 space-y-1 font-mono text-[11px]">
                    <li>id BIGINT PRIMARY KEY AUTO_INCREMENT</li>
                    <li>locality_name VARCHAR(128)</li>
                    <li>pincode VARCHAR(10)</li>
                    <li>hub_name VARCHAR(128)</li>
                    <li>delivery_hours_estimate VARCHAR(32)</li>
                    <li>active_delivery_partner VARCHAR(64)</li>
                    <li>express_eligible BOOLEAN DEFAULT TRUE</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quickstart' && (
            <div className="space-y-4 text-xs text-neutral-700">
              <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3 font-mono text-[11px]">
                <p className="text-amber-300 font-bold"># 1. Navigate into the Java backend folder</p>
                <p className="bg-black/40 p-2 rounded">cd backend-java</p>

                <p className="text-amber-300 font-bold"># 2. Build and run Spring Boot with Maven</p>
                <p className="bg-black/40 p-2 rounded">mvn clean spring-boot:run</p>

                <p className="text-amber-300 font-bold"># 3. Access Swagger UI for interactive REST testing</p>
                <p className="text-emerald-400">http://localhost:8080/swagger-ui.html</p>

                <p className="text-amber-300 font-bold"># 4. Access H2 In-Memory Database Web Console</p>
                <p className="text-emerald-400">http://localhost:8080/h2-console</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs">
                <strong>Project Location:</strong> All Java source files, Maven <code>pom.xml</code>, Spring Boot models, repositories, and controllers are stored in the <code>/backend-java</code> directory in this codebase.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>Spring Boot 3 Microservice Architecture · Ready for Deployment</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
