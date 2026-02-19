import { Component, OnInit, PendingTasks, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Artigo } from '../../features/artigos/artigos.model';
import { ArtigosRepository } from '../../features/artigos/artigos.repository';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage implements OnInit {
  artigos = signal<Artigo[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  private artigosRepository = inject(ArtigosRepository);
  private pendingTasks = inject(PendingTasks);

  ngOnInit() {
    void this.pendingTasks.run(async () => {
      try {
        const artigos = await this.artigosRepository.getAll();
        this.artigos.set(artigos);
      } catch {
        this.erro.set('Nao foi possivel carregar a lista de artigos.');
      } finally {
        this.carregando.set(false);
      }
    });
  }
}
