import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onSetRecommendations }) {
  const { preferences, features, products, isLoading, error } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const [validationErrors, setValidationErrors] = useState([]);

  const { getRecommendations } = useRecommendations(products);

  const validateForm = () => {
    const errors = [];

    if (formData.selectedPreferences.length === 0) {
      errors.push('preferência');
    }
    if (formData.selectedFeatures.length === 0) {
      errors.push('funcionalidade');
    }
    if (!formData.selectedRecommendationType) {
      errors.push('tipo de recomendação');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const getErrorMessage = () =>
    validationErrors.length > 0
      ? `Por favor, selecione: ${validationErrors.join(', ')}`
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) {
      console.error('Error loading products:', error);
      return;
    }

    if (isLoading) return;

    const isValid = validateForm();
    if (!isValid) return;

    const recommendations = getRecommendations(formData);
    onSetRecommendations(recommendations);
  };

  if (error) {
    return <div className="text-red-500">Error loading products</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />

      {validationErrors.length > 0 && (
        <div className="mt-3 p-2 bg-red-100 text-red-700 rounded text-sm">
          {getErrorMessage()}
        </div>
      )}
    </form>
  );
}

Form.propTypes = {
  onSetRecommendations: PropTypes.func.isRequired,
};

export default Form;
