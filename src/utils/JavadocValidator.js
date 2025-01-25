export class JavadocValidator {
    // Méthode statique pour valider un commentaire Javadoc
  static validateJavadoc(comment) {
    const errors = [];// Liste pour stocker les erreurs détectées


    // Vérification si le commentaire est vide ou nul
    if (!comment || comment.trim() === '') {
      return {
        isValid: false,// Indique que la validation a échoué
        errors: ['Le commentaire Javadoc ne peut pas être vide']
      };
    }

    // Vérification de la structure de base du Javadoc
    if (!comment.trim().startsWith('/**')) {
      errors.push("Le commentaire Javadoc doit commencer par '/**'");
    }
    if (!comment.trim().endsWith('*/')) {
      errors.push("Le commentaire Javadoc doit se terminer par '*/'");
    }

    // Validation de la description
    const descriptionMatch = comment.match(/\/\*\*\s*\n\s*\*\s*([^@\n\r]+)/);
    if (!descriptionMatch || !descriptionMatch[1].trim()) {
      errors.push("Le commentaire Javadoc doit commencer par une description");
    }

    // Validation des tags valides
    const validTags = ['@param', '@return', '@throws', '@author', '@version', '@since'];
    const tagMatches = comment.match(/@\w+/g) || [];
    const invalidTags = tagMatches.filter(tag => !validTags.includes(tag));

    if (invalidTags.length > 0) {
      invalidTags.forEach(tag => {
        errors.push(`Tag invalide: ${tag}`);
      });
    }

    // Validation spécifique des @param
    const paramTags = comment.match(/@param\s+\w+\s+[^@\n\r]+/g) || [];
    paramTags.forEach(tag => {
      if (!tag.match(/@param\s+[a-zA-Z_]\w*\s+[^@\n\r]+/)) {
        errors.push(`Format invalide pour le tag @param: ${tag}`);
      }
    });

    // Validation spécifique de @return
    const returnTags = comment.match(/@return\s+[^@\n\r]+/g) || [];
    returnTags.forEach(tag => {
      if (!tag.match(/@return\s+[^@\n\r]+/)) {
        errors.push(`Format invalide pour le tag @return: ${tag}`);
      }
    });

    // Validation spécifique de @since
    const sinceTags = comment.match(/@since\s+[^@\n\r]+/g) || [];
    sinceTags.forEach(tag => {
      if (!tag.match(/@since\s+[a-zA-Z_]\w*\s+[^@\n\r]+/)) {
        errors.push(`Format invalide pour le tag @since: ${tag}`);
      }
    });

    // Vérification de l'ordre des tags : @param, @return, @throws
    const tagOrder = ['@param', '@return', '@throws'];
    const foundTags = tagMatches.filter(tag => tagOrder.includes(tag));
    for (let i = 0; i < foundTags.length - 1; i++) {
      if (tagOrder.indexOf(foundTags[i]) > tagOrder.indexOf(foundTags[i + 1])) {
        errors.push("L'ordre des tags est invalide. Assurez-vous que @param précède @return et @throws.");
      }
    }

    // Validation de l'absence de @param sans description
    const paramTagsWithoutDescription = comment.match(/@param\s+\w+\s+/g) || [];
    paramTagsWithoutDescription.forEach(tag => {
      if (!tag.match(/@param\s+[a-zA-Z_]\w*\s+[^@\n\r]+/)) {
        errors.push(`Le tag @param doit être suivi d'une description.`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
