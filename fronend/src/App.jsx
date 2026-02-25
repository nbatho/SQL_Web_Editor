import { useState, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
// SQL Keywords
const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 
  'ALTER', 'TABLE', 'DATABASE', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION',
  'TRIGGER', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'FULL', 'CROSS',
  'ON', 'AS', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE',
  'IS', 'NULL', 'ORDER', 'BY', 'GROUP', 'HAVING', 'DISTINCT', 'LIMIT',
  'OFFSET', 'UNION', 'ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION', 'SET', 'VALUES', 'INTO'
];

// SQL Functions
const SQL_FUNCTIONS = [
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROUND', 'FLOOR', 'CEILING',
  'UPPER', 'LOWER', 'TRIM', 'LTRIM', 'RTRIM', 'SUBSTRING', 'CONCAT',
  'LENGTH', 'REPLACE', 'CAST', 'CONVERT', 'COALESCE', 'ISNULL',
  'GETDATE', 'DATEADD', 'DATEDIFF', 'YEAR', 'MONTH', 'DAY',
  'NOW', 'CURRENT_TIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIME'
];
function App() {
  const [value, setValue] = useState("");
  const [database, setDatabase] = useState("SQL Server");
  const [suggestions, setSuggestions] = useState(false);
  const [results, setResults] = useState(null);
  const completionProviderRef = useRef(null);

  const handleMount = (editor, monaco) => {
    console.log("Editor mounted");
    
    // Dispose provider cũ nếu có
    if (completionProviderRef.current) {
      completionProviderRef.current.dispose();
    }
    
    // Đăng ký completion provider cho SQL
    completionProviderRef.current = monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const suggestions = [];

        // SQL Keywords
        SQL_KEYWORDS.forEach(keyword => {
          suggestions.push({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword,
            range: range,
            detail: 'SQL Keyword',
            sortText: '1' + keyword
          });
        });

        // SQL Functions
        SQL_FUNCTIONS.forEach(func => {
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: func + '($1)',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
            detail: 'SQL Function',
            sortText: '2' + func
          });
        });
        return { suggestions };
      }
    });

    // Cấu hình SQL language
    monaco.languages.setLanguageConfiguration('sql', {
      comments: {
        lineComment: '--',
        blockComment: ['/*', '*/']
      },
      brackets: [
        ['(', ')'],
        ['[', ']']
      ],
      autoClosingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: "'", close: "'" },
        { open: '"', close: '"' }
      ],
      surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: "'", close: "'" },
        { open: '"', close: '"' }
      ]
    });
  };

  const runQuery = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/query', { query: value });
      setResults(response.data);
    } catch (error) {
      console.error("Error executing query:", error);
      setResults({ success: false, error: error.response?.data?.error || 'Unknown error' });
    }
  };
  
  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="bg-[#0a0a0a] h-screen text-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-3 bg-[#141414] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e] rounded-lg border border-gray-700 cursor-pointer hover:bg-[#252525]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span className="font-medium">{database}</span>
           
          </div>

          <button
            onClick={runQuery}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-green-500 rounded-lg hover:bg-green-500/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="font-medium">Run</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between px-6 py-3 bg-[#141414] border-b border-gray-800">
            <span className="text-gray-400 text-sm">SQL Editor</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Suggestions</span>
              <button
                onClick={() => setSuggestions(!suggestions)}
                className={`px-3 py-1 rounded text-sm ${
                  suggestions ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                {suggestions ? "On" : "Off"}
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#1e1e1e]">
            <MonacoEditor
              height="100%"
              defaultLanguage="sql"
              language="sql"
              value={value}
              onChange={(val) => setValue(val || "")}
              onMount={handleMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                wordWrap: "on",
                fontSize: 14,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                lineNumbers: "on",
                renderLineHighlight: "all",
                suggestOnTriggerCharacters: suggestions,
                quickSuggestions: suggestions,
              }}
            />
          </div>
        </div>

        <div className="h-64 flex flex-col border-t border-gray-800">
          <div className="flex items-center justify-between px-6 py-3 bg-[#141414] border-b border-gray-800">
            <span className="text-gray-400 text-sm">Output</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
          </div>

          {/* Output Content */}
          <div className={`flex-1 bg-[#1e1e1e] overflow-auto ${!results?.success ? 'flex items-center justify-center' : ''}`}>
            {results && results.success ? (
              <div className="w-full h-full">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-800 sticky top-0 z-10">
                    <tr>
                      {results.columns.map((col, i) => (
                        <th key={i} className="px-4 py-2 text-left border-b border-gray-700 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.rows.map((row, i) => (
                      <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
                        {results.columns.map((col, j) => (
                          <td key={j} className="px-4 py-2 whitespace-nowrap">{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : results && !results.success ? (
              <div className="text-red-500 px-6">
                <div className="font-semibold">Error:</div>
                <div className="text-sm mt-1">{results.error}</div>
                {results.details && <div className="text-xs mt-1 text-red-400">{results.details}</div>}
              </div>
            ) : (
              <span className="text-gray-500">No results to display</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;