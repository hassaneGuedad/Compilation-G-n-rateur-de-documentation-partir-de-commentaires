export class JavadocParser {
    // Méthode statique qui analyse le code source et extrait la documentation Javadoc
  static parseJavadoc(sourceCode) {
    if (!sourceCode) {
      return null;
    }

    try {
      const classMatch = sourceCode.match(/\/\*\*\s*([\s\S]*?)\s*\*\/\s*public class (\w+)/);
      if (!classMatch) return null;

      const classComments = classMatch[1];// Contenu du commentaire de la classe
      const className = classMatch[2];// Nom de la classe extraite
      
//Crée un objet metadata pour stocker les informations extraites de la classe.
      const metadata = {
        className,
        author: this.extractTag(classComments, '@author'),
        version: this.extractTag(classComments, '@version'),
        description: this.extractDescription(classComments),
        methods: []
      };

      // Extract method documentation
      const methodRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*public\s+(\w+)\s+(\w+)\s*\(([\s\S]*?)\)/g;
      let match;

      while ((match = methodRegex.exec(sourceCode)) !== null) {
        const methodDoc = match[1];
        const methodName = match[3];
        const params = match[4].split(',').map(param => param.trim());

        const method = {
          name: methodName,
          description: this.extractDescription(methodDoc),
          params: this.extractParams(methodDoc),
          returns: this.extractTag(methodDoc, '@return')
        };

        metadata.methods.push(method);
      }

      return metadata;
    } catch (error) {
      console.error('Erreur lors du parsing:', error);
      return null;
    }
  }

  static extractTag(text, tag) {
    const match = text.match(new RegExp(`${tag}\\s+([^\\n@]*)`));
    return match ? match[1].trim() : '';
  }

  static extractDescription(text) {
    const lines = text.split('\n');
    const description = lines
      .map(line => line.replace(/^\s*\*\s*/, ''))// Supprime les "* " au début des lignes
      .filter(line => !line.startsWith('@'))// Ignore les lignes contenant des tags (@param, @return...)
      .join(' ')// Concatène les lignes en une seule
      .trim();
    return description;
  }

  static extractParams(text) {
    const params = [];
    const paramRegex = /@param\s+(\w+)\s+([^@\n]*)/g;
    let match;

    while ((match = paramRegex.exec(text)) !== null) {
      params.push({
        name: match[1],
        description: match[2].trim()
      });
    }

    return params;
  }
}