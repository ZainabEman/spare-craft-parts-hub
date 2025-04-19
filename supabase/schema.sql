
-- Create tables for the SpareCraft Parts Hub

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    image TEXT
);

-- Spare Parts Table
CREATE TABLE spare_parts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    main_image TEXT,
    additional_images JSONB DEFAULT '[]'::jsonb,
    part_number TEXT NOT NULL,
    label TEXT,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_spare_parts_category ON spare_parts(category_id);
CREATE INDEX idx_spare_parts_part_number ON spare_parts(part_number);

-- Sample data for categories
INSERT INTO categories (id, name, description, image) VALUES
    ('loom', 'Loom Machine Parts', 'Spare parts for various loom machines', '/assets/images/categories/loom.jpg'),
    ('feeder', 'Feeder Machine Parts', 'Reliable parts for industrial feeders', '/assets/images/categories/feeder.jpg'),
    ('motor', 'Electric Motors', 'High performance motors for industrial machines', '/assets/images/categories/motor.jpg'),
    ('bearings', 'Bearings & Bushings', 'Long-lasting bearings for all applications', '/assets/images/categories/bearings.jpg');

-- Sample data for spare parts
INSERT INTO spare_parts (name, main_image, additional_images, part_number, label, description, category_id) VALUES
    ('Loom Shuttle Assembly', '/assets/images/parts/loom_shuttle.jpg', '["assets/images/parts/loom_shuttle_2.jpg", "assets/images/parts/loom_shuttle_3.jpg"]', 'LS-1001', 'Essential', 'High-speed shuttle assembly for modern looms. Includes shuttle body, bobbin, and tension spring.', 'loom'),
    ('Warp Beam Bearing', '/assets/images/parts/warp_bearing.jpg', '["assets/images/parts/warp_bearing_2.jpg"]', 'WB-2034', 'Heavy-Duty', 'Heavy-duty bearings specifically designed for warp beams in high-tension applications.', 'loom'),
    ('Reed Assembly Kit', '/assets/images/parts/reed_kit.jpg', '[]', 'RA-3045', 'Standard', 'Complete reed assembly kit including frame, dents, and mounting brackets.', 'loom'),
    ('Feeder Chain Drive', '/assets/images/parts/feeder_chain.jpg', '["assets/images/parts/feeder_chain_2.jpg", "assets/images/parts/feeder_chain_3.jpg"]', 'FC-5023', 'Industrial', 'Hardened steel chain drive for industrial feeders with 18-inch pitch.', 'feeder'),
    ('Tension Roller Assembly', '/assets/images/parts/tension_roller.jpg', '["assets/images/parts/tension_roller_2.jpg"]', 'TR-5089', 'Premium', 'Premium tension roller assembly with adjustable pressure control.', 'feeder'),
    ('Feed Gate Mechanism', '/assets/images/parts/feed_gate.jpg', '[]', 'FG-5102', 'Standard', 'Standard replacement feed gate mechanism for material flow control.', 'feeder'),
    ('3HP Electric Motor', '/assets/images/parts/3hp_motor.jpg', '["assets/images/parts/3hp_motor_2.jpg", "assets/images/parts/3hp_motor_3.jpg"]', 'EM-7011', 'Industrial', '3 horsepower electric motor with thermal protection and sealed bearings.', 'motor'),
    ('Motor Control Unit', '/assets/images/parts/control_unit.jpg', '["assets/images/parts/control_unit_2.jpg"]', 'MCU-7056', 'Digital', 'Digital motor control unit with speed regulation and overload protection.', 'motor'),
    ('Capacitor Kit', '/assets/images/parts/capacitor_kit.jpg', '[]', 'CK-7099', 'Essential', 'Replacement capacitor kit for electric motors, includes start and run capacitors.', 'motor'),
    ('Precision Ball Bearing Set', '/assets/images/parts/ball_bearing.jpg', '["assets/images/parts/ball_bearing_2.jpg", "assets/images/parts/ball_bearing_3.jpg"]', 'BB-9012', 'Precision', 'Set of precision ball bearings in various sizes for high-speed applications.', 'bearings'),
    ('Heavy-Duty Roller Bearing', '/assets/images/parts/roller_bearing.jpg', '["assets/images/parts/roller_bearing_2.jpg"]', 'RB-9045', 'Heavy-Duty', 'Reinforced roller bearing designed for extreme loads and harsh environments.', 'bearings'),
    ('Bronze Bushing Assortment', '/assets/images/parts/bronze_bushing.jpg', '[]', 'BBA-9078', 'Standard', 'Assortment of standard bronze bushings in common industrial sizes.', 'bearings');
