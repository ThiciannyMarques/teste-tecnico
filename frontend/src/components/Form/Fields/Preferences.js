import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Preferências:
      </h2>

      <ul>
        {preferences.map((preference, index) => (
          <li key={index}>
            <div className="flex items-center p-3 hover:bg-gray-50">
              <Checkbox
                value={preference}
                checked={currentPreferences.includes(preference)}
                onChange={() => handlePreferenceChange(preference)}
                className="h-4 w-4"
              >
                <span className="ml-2 text-gray-700">{preference}</span>
              </Checkbox>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Preferences;
