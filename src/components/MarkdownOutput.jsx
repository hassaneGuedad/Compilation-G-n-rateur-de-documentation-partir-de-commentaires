import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { marked } from "marked";// Importe la bibliothèque Marked pour convertir du Markdown en HTML

export function MarkdownOutput({ documentation }) {
  if (!documentation) return null;

  const markdown = `# Classe : ${documentation.className} 

*Description :* ${documentation.description}  
${documentation.author ? `*Auteur :* ${documentation.author}  ` : ""}
${documentation.version ? `*Version :* ${documentation.version}  ` : ""}


## Méthodes  

${documentation.methods
  .map(// Parcourt toutes les méthodes de la classe
    (method) => `
**${method.name}**  
\`${method.name}(${method.params.map((p) => p.name).join(", ")})\`  
${method.params
  .map((param) => `*@param ${param.name} :* ${param.description}  `)
  .join("\n")}
${method.returns ? `*@return :* ${method.returns}  ` : ""}
`
  )
  .join("\n")}`;// Transforme toutes les méthodes en texte Markdown


  const downloadMarkdown = () => { // Fonction pour télécharger le fichier Markdown généré
    const blob = new Blob([markdown], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);// Génère une URL temporaire pour le fichier
    link.download = "documentation.md";// Définit le nom du fichier
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Rendu du composant dans l'interface utilisateur
  return (
    <div className="output-section">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Markdown Output</h3>
        <button
          onClick={downloadMarkdown}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Télécharger
        </button>
      </div>
      <SyntaxHighlighter language="markdown" style={docco}>
        {markdown}
      </SyntaxHighlighter>
      <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
    </div>
  );
}
