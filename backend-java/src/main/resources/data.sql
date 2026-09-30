-- Seed Nashik Delivery Operational Zones
INSERT INTO nashik_localities (locality_name, pincode, hub_name, delivery_hours_estimate, active)
VALUES
('College Road', '422005', 'West Nashik Central Hub (Thatte Nagar)', '2 - 3 Hours', true),
('Gangapur Road', '422013', 'Gangapur Corridor Hub', '2 - 3 Hours', true),
('Mahatma Nagar', '422007', 'West Nashik Central Hub', '2 - 4 Hours', true),
('Indira Nagar', '422009', 'South Nashik Hub (Govind Nagar)', '2 - 4 Hours', true),
('Govind Nagar & City Centre', '422009', 'Govind Nagar Express Hub', '1 - 2 Hours', true),
('Panchavati', '422003', 'Old Nashik & Heritage Hub', '3 - 4 Hours', true),
('Nashik Road & Bytco Point', '422101', 'Nashik Road Station Hub', '3 - 5 Hours', true),
('Tidke Colony & Canada Corner', '422002', 'Central Nashik Hub', '2 - 3 Hours', true),
('CIDCO & Trimurti Chowk', '422009', 'CIDCO Zone Hub', '2 - 4 Hours', true),
('Deolali Camp', '422401', 'Cantonment Express Hub', '4 - 5 Hours', true),
('Ashoka Marg', '422011', 'East Nashik Corridor', '3 - 4 Hours', true),
('Pathardi Phata & Ambad MIDC', '422010', 'South Gateway Hub', '3 - 5 Hours', true);

-- Seed Initial Customer Rental Orders in Nashik for Vaishnavi Chaudhary
INSERT INTO rental_orders (
  booking_id, customer_id, customer_name, customer_phone,
  product_id, product_name, product_brand, selected_size, backup_size,
  rental_duration_days, start_date, end_date,
  delivery_city, nashik_locality, street_address, pincode,
  rental_fee, security_deposit, discount_applied, total_paid,
  deposit_status, status, courier_rider_name, courier_contact, created_at
) VALUES
(
  'RVG-NSK-2024-9182', 'user-cust-1', 'Vaishnavi Chaudhary', '+91 94239 88120',
  'prod-w-wed3', 'Ivory & Champagne Gold Chikankari Bridal Lehenga', 'AURELIA COUTURE', 'M', 'L (Free Backup)',
  4, '2024-10-11', '2024-10-15',
  'Nashik', 'College Road, Nashik (422005)', 'Flat 402, Samraat Tropicano, Near BYK College', '422005',
  3299.00, 1500.00, 1320.00, 3479.00,
  'HELD_IN_ESCROW', 'OUT_FOR_DELIVERY', 'Akash Deshmukh', '+91 94239 88120', CURRENT_TIMESTAMP
),
(
  'RVG-NSK-2024-8840', 'user-cust-1', 'Vaishnavi Chaudhary', '+91 94239 88120',
  'prod-w1', 'Emerald Slit Velvet Evening Gown', 'MARCHESI ATELIER', 'M', 'S (Free Backup)',
  4, '2024-10-08', '2024-10-12',
  'Nashik', 'Gangapur Road, Nashik (422013)', 'Bungalow 14, Serene Meadows, Someshwar Road', '422013',
  1899.00, 999.00, 760.00, 2138.00,
  'HELD_IN_ESCROW', 'WITH_CUSTOMER', 'Sachin Patil', '+91 94239 88120', CURRENT_TIMESTAMP
),
(
  'RVG-NSK-2024-7431', 'user-cust-1', 'Vaishnavi Chaudhary', '+91 94239 88120',
  'prod-w4', 'Rani Pink Peacock Hand-Embroidered Bridal Lehenga', 'SABYASACHI ARCHIVE', 'M', 'L (Free Backup)',
  4, '2024-09-18', '2024-09-22',
  'Nashik', 'College Road, Nashik (422005)', 'Flat 402, Samraat Tropicano, Near BYK College', '422005',
  3499.00, 1500.00, 1400.00, 3599.00,
  'REFUNDED', 'COMPLETED', 'Akash Deshmukh', '+91 94239 88120', CURRENT_TIMESTAMP
);
