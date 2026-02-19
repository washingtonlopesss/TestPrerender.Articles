import { Component, OnInit, PendingTasks, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Artigo } from './artigos.model';
import { ArtigosRepository } from './artigos.repository';

@Component({
  selector: 'app-artigo-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './artigo.page.html',
  styleUrl: './artigo.page.css',
})
export class ArtigoPage implements OnInit {
  artigo = signal<Artigo | null>(null);
  carregando = signal(true);
  erro = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private artigosRepository = inject(ArtigosRepository);
  private pendingTasks = inject(PendingTasks);

  ngOnInit() {
    void this.pendingTasks.run(async () => {
      const slug = this.route.snapshot.paramMap.get('slug');

      if (!slug) {
        this.erro.set('Slug invalido.');
        this.carregando.set(false);
        return;
      }

      try {
        const artigo = await this.artigosRepository.getBySlug(slug);

        if (!artigo) {
          this.erro.set('Artigo nao encontrado.');
          return;
        }

        this.artigo.set(artigo);
      } catch {
        this.erro.set('Nao foi possivel carregar o artigo.');
      } finally {
        this.carregando.set(false);
      }
    });
  }
}
