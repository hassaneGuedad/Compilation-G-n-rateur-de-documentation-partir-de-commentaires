import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function HtmlOutput({ documentation }) {
  if (!documentation) return null;

  const html = `
<h2>Classe : ${documentation.className}</h2>

<p><strong>Description :</strong> ${documentation.description}</p>

${
  documentation.author
    ? `<p><strong>Auteur :</strong> ${documentation.author}</p>`
    : ""
}
${
  documentation.version
    ? `<p><strong>Version :</strong> ${documentation.version}</p>`
    : ""
}

<h3>Méthodes</h3>
${documentation.methods
  .map(
    (method) => `
<ul>
    <li><strong>${method.name} :</strong>
        <pre><code>${method.name}(${method.params
      .map((p) => `${p.name}`)
      .join(", ")})</code></pre>
    </li>
    ${method.params
      .map(
        (param) => `
    <li><strong>@param ${param.name} :</strong> ${param.description}</li>
    `
      )
      .join("")}
    ${
      method.returns
        ? `<li><strong>@return :</strong> ${method.returns}</li>`
        : ""
    }
</ul>
`
  )
  .join("\n")} 
`;
// .join("\n")}    (éliminer les virgules du tableau final)
  const handlePrint = () => {
    const blob = new Blob([html], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${documentation.className}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="output-section">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>HTML Output</h3>
        <button
          onClick={handlePrint}
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
      <SyntaxHighlighter language="html" style={docco}>
        {html}
      </SyntaxHighlighter>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
