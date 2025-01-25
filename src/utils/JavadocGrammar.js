// BNF Grammar for Javadoc
export const BNF_GRAMMAR = `
/* Javadoc Grammar in BNF */
<javadoc> ::= "/**" <content> "*/"
<content> ::= <description> <tags>
<description> ::= <text>
<tags> ::= <tag> <tags> | ε
<tag> ::= "@" <tag-name> <text>
<tag-name> ::= "param" | "return" | "throws" | "author" | "version" | "since"
<text> ::= <word> <text> | <word>
<word> ::= [a-zA-Z0-9.,!?'"-]+
`;

// EBNF Grammar for Javadoc
export const EBNF_GRAMMAR = `
/* Javadoc Grammar in EBNF */
javadoc = "/**", content, "*/";
content = description, {tag};
description = text;
tag = "@", tag-name, text;
tag-name = "param" | "return" | "throws" | "author" | "version" | "since";
text = {word};
word = [a-zA-Z0-9.,!?'"-]+;
`;

export class JavadocValidator {
  static validateJavadoc(comment) {
    // Basic validation rules
    const rules = {
      startsWithSlashStarStar: /^\/\*\*/,   // Vérifie si le commentaire commence par "/**"
      endsWithStarSlash: /\*\/$/, // Vérifie si le commentaire se termine par "*/"
      hasDescription: /\*\s+[^@\n\r]+/,// Vérifie s'il y a une description avant les tags
      validTags: /@(param|return|throws|author|version|since)\s+\S+/g,// Vérifie les tags valides
      paramFormat: /@param\s+\w+\s+[^@]+/g,// Vérifie que @param a un nom et une description
      returnFormat: /@return\s+[^@]+/g,// Vérifie que @return a une description
    };

    const errors = [];
    // Initialise un tableau errors pour stocker les erreurs détectées.
    // Check basic structure
    if (!rules.startsWithSlashStarStar.test(comment)) {
      errors.push("Le commentaire Javadoc doit commencer par '/**'");
    }
    if (!rules.endsWithStarSlash.test(comment)) {
      errors.push("Le commentaire Javadoc doit se terminer par '*/'");
    }
    if (!rules.hasDescription.test(comment)) {
      errors.push("Le commentaire Javadoc doit avoir une description");
    }

    // Validate tags
    const tags = comment.match(rules.validTags) || [];
    tags.forEach((tag) => {
      if (tag.startsWith("@param")) {
        if (!rules.paramFormat.test(tag)) {
          errors.push(`Format invalide pour le tag @param: ${tag}`);
        }
      }
      if (tag.startsWith("@return")) {
        if (!rules.returnFormat.test(tag)) {
          errors.push(`Format invalide pour le tag @return: ${tag}`);
        }
      }
    });

    return {
      isValid: errors.length === 0,// true si aucune erreur n'a été trouvée
      errors, // Liste des erreurs détectées
    };
  }
}
