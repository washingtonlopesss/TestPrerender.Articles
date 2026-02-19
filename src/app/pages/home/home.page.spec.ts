import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Artigo } from '../../features/artigos/artigos.model';
import { ArtigosRepository } from '../../features/artigos/artigos.repository';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let artigosRepositorySpy: jasmine.SpyObj<ArtigosRepository>;

  beforeEach(async () => {
    artigosRepositorySpy = jasmine.createSpyObj<ArtigosRepository>('ArtigosRepository', ['getAll']);

    artigosRepositorySpy.getAll.and.resolveTo([
      {
        title: 'Revisao da Vida Toda',
        slug: 'revisao-da-vida-toda',
        content: '<p>Texto</p>',
        createdAt: '2026-02-17',
      },
    ] as Artigo[]);

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ArtigosRepository, useValue: artigosRepositorySpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles list', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(artigosRepositorySpy.getAll).toHaveBeenCalled();
    expect(component.artigos().length).toBe(1);
  });
});
