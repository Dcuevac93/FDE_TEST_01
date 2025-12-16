INSERT INTO public.users (email, password, name, role) VALUES
('dcuevac93@gmail.com', '$2b$10$czgMjDE2JIkpOfxLEDY1IOzxDXGWh.OlZeKT33tmChxt00T6x5i7G', 'David Cueva', 'admin'),
('admin@example.com', '$2b$10$czgMjDE2JIkpOfxLEDY1IOzxDXGWh.OlZeKT33tmChxt00T6x5i7G', 'Admin User', 'admin'),
('client@example.com', '$2b$10$czgMjDE2JIkpOfxLEDY1IOzxDXGWh.OlZeKT33tmChxt00T6x5i7G', 'Client User', 'client');

INSERT INTO public.projects (name, description, status, client_id, created_by) VALUES
('Website Redesign', 'Redesign marketing website', 'active', 2, 1),
('Mobile App', 'Build mobile application', 'pending', 2, 1);

INSERT INTO public.comments (project_id, user_id, content) VALUES
(1, 1, 'Project initialized'),
(1, 2, 'Looks good so far'),
(2, 1, 'Waiting for client feedback');
