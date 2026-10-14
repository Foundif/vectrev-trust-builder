CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text,
  image_url text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content" ON public.site_content
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can insert site content" ON public.site_content
  FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update site content" ON public.site_content
  FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Admins can delete site content" ON public.site_content
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE POLICY "Public can read site images" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'site-images');
CREATE POLICY "Staff can upload site images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff can update site images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete site images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND public.is_staff(auth.uid()));