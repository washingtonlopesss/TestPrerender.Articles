import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

type ArtigoPrerender = {
  slug: string;
};

function getPrerenderSlugs(): ArtigoPrerender[] {
  try {
    const filePath = join(process.cwd(), 'public/shared-content/artigos.json');
    const content = readFileSync(filePath, 'utf-8');
    const artigos = JSON.parse(content) as ArtigoPrerender[];

    return artigos.filter((artigo) => typeof artigo.slug === 'string');
  } catch (error) {
    console.error('Failed to read prerender slugs:', error);
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'artigos/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return getPrerenderSlugs().map((artigo) => ({ slug: artigo.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
