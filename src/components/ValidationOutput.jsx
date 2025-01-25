import React from 'react';

export function ValidationOutput({ validation }) {
  if (!validation) return null;

  return (    // Applique une classe CSS conditionnelle : "valid" si la validation est réussie, sinon "invalid"

    <div className={`validation-output ${validation.isValid ? 'valid' : 'invalid'}`}>
      <h3>Validation de la Grammaire</h3>
      
      {validation.isValid ? (
        <p className="success">✓ La documentation est valide selon la grammaire Javadoc</p>
      ) : (
        <div className="errors">
          <p>❌ Erreurs de validation:</p>
          <ul>
                        {/* Parcours la liste des erreurs et les affiche sous forme de liste */}

            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}