import { Routes } from '@angular/router';
import { ArtigoPage } from './features/artigos/artigo.page';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  { path: 'TestPrerender.Articles', redirectTo: '', pathMatch: 'full' },

  { path: '', component: HomePage, title: 'Home' },
  { path: 'artigos/:slug', component: ArtigoPage, title: 'Artigo' },

  { path: '**', redirectTo: '' },
]
