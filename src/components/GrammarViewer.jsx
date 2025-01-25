import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { BNF_GRAMMAR, EBNF_GRAMMAR } from '../utils/JavadocGrammar';

export function GrammarViewer() {
  return (
    <div className="grammar-viewer">
      <div className="grammar-section">
        <h3>Grammaire BNF</h3>
        <SyntaxHighlighter language="bnf" style={docco}>
          {BNF_GRAMMAR}
        </SyntaxHighlighter>
      </div>
      
      <div className="grammar-section">
        <h3>Grammaire EBNF</h3>
        <SyntaxHighlighter language="ebnf" style={docco}>
          {EBNF_GRAMMAR}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}