import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins = new Set([
  Deno.env.get('GALLERY_ALLOWED_ORIGIN') || 'https://thisisvarun.me',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

function getCorsHeaders(request: Request) {
  const origin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : 'https://thisisvarun.me',
    'Access-Control-Allow-Headers': 'authorization, content-type, x-gallery-admin-secret',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    Vary: 'Origin',
  };
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

async function hashToken(token: string) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: getCorsHeaders(request) });
  }

  if (request.method === 'POST') {
    if (request.headers.get('x-gallery-admin-secret') !== Deno.env.get('GALLERY_ADMIN_SECRET')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401, headers: getCorsHeaders(request) });
    }

    const body = await request.json().catch(() => null);
    if (!body?.expiresAt || !Array.isArray(body.images) || body.images.length === 0) {
      return Response.json({ error: 'expiresAt and at least one image are required' }, { status: 400, headers: getCorsHeaders(request) });
    }

    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    const token = btoa(String.fromCharCode(...randomBytes))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const { data: createdGallery, error: createError } = await supabase
      .from('galleries')
      .insert({
        token_hash: await hashToken(token),
        title: body.title || 'Private gallery',
        description: body.description || null,
        expires_at: body.expiresAt,
      })
      .select('id')
      .single();

    if (createError) {
      console.error(createError);
      return Response.json({ error: 'Unable to create gallery' }, { status: 500, headers: getCorsHeaders(request) });
    }

    const { error: imageError } = await supabase.from('gallery_images').insert(
      body.images.map((image: { path: string; alt?: string }, index: number) => ({
        gallery_id: createdGallery.id,
        storage_path: image.path,
        alt: image.alt || null,
        sort_order: index,
      })),
    );

    if (imageError) {
      await supabase.from('galleries').delete().eq('id', createdGallery.id);
      console.error(imageError);
      return Response.json({ error: 'Unable to add gallery images' }, { status: 500, headers: getCorsHeaders(request) });
    }

    return Response.json({ token }, { headers: { ...getCorsHeaders(request), 'Cache-Control': 'no-store' } });
  }

  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: getCorsHeaders(request) });
  }

  const token = new URL(request.url).searchParams.get('token');
  if (!token || token.length < 32 || token.length > 200) {
    return Response.json({ error: 'Invalid gallery link' }, { status: 400, headers: getCorsHeaders(request) });
  }

  const { data: gallery, error: galleryError } = await supabase
    .from('galleries')
    .select('id, title, description, expires_at, revoked_at')
    .eq('token_hash', await hashToken(token))
    .maybeSingle();

  if (galleryError) {
    console.error(galleryError);
    return Response.json({ error: 'Unable to load gallery' }, { status: 500, headers: getCorsHeaders(request) });
  }

  if (!gallery || gallery.revoked_at || new Date(gallery.expires_at) <= new Date()) {
    return Response.json({ error: 'This gallery link is invalid or has expired' }, { status: 404, headers: getCorsHeaders(request) });
  }

  const { data: images, error: imagesError } = await supabase
    .from('gallery_images')
    .select('storage_path, alt')
    .eq('gallery_id', gallery.id)
    .order('sort_order');

  if (imagesError) {
    console.error(imagesError);
    return Response.json({ error: 'Unable to load gallery images' }, { status: 500, headers: getCorsHeaders(request) });
  }

  const { data: signedImages, error: signedImagesError } = await supabase.storage
    .from('gallery')
    .createSignedUrls(images.map((image) => image.storage_path), 600);

  if (signedImagesError) {
    console.error(signedImagesError);
    return Response.json({ error: 'Unable to prepare gallery images' }, { status: 500, headers: getCorsHeaders(request) });
  }

  return Response.json({
    title: gallery.title,
    description: gallery.description,
    images: signedImages.map((image, index) => ({
      path: images[index].storage_path,
      alt: images[index].alt,
      url: image.signedUrl,
    })),
  }, { headers: { ...getCorsHeaders(request), 'Cache-Control': 'no-store' } });
});
