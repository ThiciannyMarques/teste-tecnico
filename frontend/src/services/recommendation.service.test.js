import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna array vazio quando não há produtos', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      []
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna array vazio quando não há matches', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
  });
});

describe('Integridade dos dados', () => {
  test('Não modifica os arrays de input', () => {
    const originalProducts = [...mockProducts];
    const originalFormData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Rastreamento de comportamento'],
      selectedRecommendationType: 'SingleProduct',
    };

    recommendationService.getRecommendations(
      originalFormData,
      originalProducts
    );

    expect(originalProducts).toEqual(mockProducts);
    expect(originalFormData.selectedPreferences).toEqual([
      'Automação de marketing',
    ]);
  });

  test('Mantém todas propriedades originais do produto', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations[0]).toMatchObject({
      name: expect.any(String),
      score: expect.any(Number),
      originalIndex: expect.any(Number),
      preferences: expect.any(Array),
      features: expect.any(Array),
    });
  });

  test('Lida corretamente com propriedades undefined', () => {
    const customProducts = [
      {
        name: 'Produto Teste',
        preferences: undefined,
        features: undefined,
      },
      ...mockProducts,
    ];

    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      customProducts
    );

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.some((p) => p.name === 'Produto Teste')).toBe(false);
  });
});
