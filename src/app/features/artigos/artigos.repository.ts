import { Injectable } from '@angular/core';
import { Artigo } from './artigos.model';

@Injectable({ providedIn: 'root' })
export class ArtigosRepository {
  private readonly sourceUrl = '/shared-content/artigos.json';

  async getAll(): Promise<Artigo[]> {
    const response = await fetch(this.sourceUrl);

    if (!response.ok) {
      throw new Error(`Failed to load artigos.json (${response.status}).`);
    }

    const payload = (await response.json()) as unknown;

    if (!Array.isArray(payload)) {
      throw new Error('Invalid artigos payload.');
    }

    return payload.filter((item): item is Artigo => this.isArtigo(item));
  }

  async getBySlug(slug: string): Promise<Artigo | null> {
    const artigos = await this.getAll();
    return artigos.find((artigo) => artigo.slug === slug) ?? null;
  }

  private isArtigo(value: unknown): value is Artigo {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const artigo = value as Partial<Artigo>;

    return (
      typeof artigo.title === 'string' &&
      typeof artigo.slug === 'string' &&
      typeof artigo.content === 'string' &&
      typeof artigo.createdAt === 'string'
    );
  }
}
