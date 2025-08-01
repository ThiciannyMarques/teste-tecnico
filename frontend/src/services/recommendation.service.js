const validateInputs = (products, recommendationType) => {
  if (!Array.isArray(products)) {
    throw new Error('Products deve ser um array');
  }
  if (typeof recommendationType !== 'string') {
    throw new Error('Tipo de recomendação inválido');
  }
};

const scoreProduct = (product, preferenceSet, featureSet, index) => {
  const preferenceMatches =
    product.preferences?.filter((p) => preferenceSet.has(p)).length || 0;
  const featureMatches =
    product.features?.filter((f) => featureSet.has(f)).length || 0;

  return {
    ...product,
    score: preferenceMatches + featureMatches,
    originalIndex: index,
  };
};

const sortByScore = (a, b) =>
  b.score - a.score || b.originalIndex - a.originalIndex;

const getRecommendations = (formData = {}, products = []) => {
  try {
    const {
      selectedPreferences = [],
      selectedFeatures = [],
      selectedRecommendationType = '',
    } = formData;

    if (!products.length || !selectedRecommendationType) return [];

    validateInputs(products, selectedRecommendationType);

    const preferenceSet = new Set(selectedPreferences);
    const featureSet = new Set(selectedFeatures);

    const relevantProducts = products
      .map((product, index) =>
        scoreProduct(product, preferenceSet, featureSet, index)
      )
      .filter((product) => product.score > 0)
      .sort(sortByScore);

    return selectedRecommendationType === 'SingleProduct'
      ? relevantProducts.slice(0, 1)
      : relevantProducts;
  } catch (error) {
    console.error('Erro no serviço de recomendação:', error.message);
    return [];
  }
};

const recommendationService = { getRecommendations };

export default recommendationService;
