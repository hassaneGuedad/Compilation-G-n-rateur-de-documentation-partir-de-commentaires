import { useState } from 'react';
import { JavadocParser } from './utils/JavadocParser';
import { JavadocValidator } from './utils/JavadocValidator'; // Import modifié
import { HtmlOutput } from './components/HtmlOutput';
import { MarkdownOutput } from './components/MarkdownOutput';
import { ValidationOutput } from './components/ValidationOutput';
import { GrammarViewer } from './components/GrammarViewer';
import './App.css';

function App() {
  const [sourceCode, setSourceCode] = useState('');
  const [documentation, setDocumentation] = useState(null);
  const [validation, setValidation] = useState(null);
  const [showGrammar, setShowGrammar] = useState(false);

  const handleSourceCodeChange = (event) => {
    const code = event.target.value;
    setSourceCode(code);
    
    if (code.trim()) {
      // Validate Javadoc comments
      const classMatch = code.match(/\/\*\*([\s\S]*?)\*\//);
      if (classMatch) {
        const validation = JavadocValidator.validateJavadoc(classMatch[0]);
        setValidation(validation);
      }

      // Parse and generate documentation
      const parsedDoc = JavadocParser.parseJavadoc(code);
      setDocumentation(parsedDoc);
    } else {
      setDocumentation(null);
      setValidation(null);
    }
  };

  return (
    <div className="container">
      <h1>Générateur de Documentation Javadoc</h1>
      
      <div className="controls">
        <button 
          onClick={() => setShowGrammar(!showGrammar)}
          className="grammar-toggle"
        >
          {showGrammar ? 'Masquer' : 'Afficher'} les Grammaires
        </button>
      </div>

      {showGrammar && <GrammarViewer />}
      
      <div className="input-section">
        <h2>Code Source Java</h2>
        <textarea
          value={sourceCode}
          onChange={handleSourceCodeChange}
          placeholder="Collez votre code source Java ici..."
          rows={15}
          className="source-input"
        />
      </div>

      {validation && <ValidationOutput validation={validation} />}

      {documentation && (
        <div className="output-container">
          <HtmlOutput documentation={documentation} />
          <MarkdownOutput documentation={documentation} />
        </div>
      )}
    </div>
  );
}

export default App;
