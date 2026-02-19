import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Artigo } from './artigos.model';
import { ArtigoPage } from './artigo.page';
import { ArtigosRepository } from './artigos.repository';

describe('ArtigoPage', () => {
  let component: ArtigoPage;
  let fixture: ComponentFixture<ArtigoPage>;
  let artigosRepositorySpy: jasmine.SpyObj<ArtigosRepository>;

  beforeEach(async () => {
    artigosRepositorySpy = jasmine.createSpyObj<ArtigosRepository>('ArtigosRepository', ['getBySlug']);

    artigosRepositorySpy.getBySlug.and.resolveTo({
      title: 'Revisao da Vida Toda',
      slug: 'revisao-da-vida-toda',
      content: '<p>Texto</p>',
      createdAt: '2026-02-17',
    } as Artigo);

    await TestBed.configureTestingModule({
      imports: [ArtigoPage],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ slug: 'revisao-da-vida-toda' }),
            },
          },
        },
        { provide: ArtigosRepository, useValue: artigosRepositorySpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtigoPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load article by slug', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(artigosRepositorySpy.getBySlug).toHaveBeenCalledWith('revisao-da-vida-toda');
    expect(component.artigo()?.title).toBe('Revisao da Vida Toda');
  });
});
