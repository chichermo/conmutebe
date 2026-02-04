insert into public.challenges (title, description, points, target)
values
  ('Semana sin coche', 'Completa 3 rutas en bici o tren', 120, 3),
  ('Eco-lluvia', 'Viaja en transporte público con mal clima', 80, 2)
on conflict do nothing;
