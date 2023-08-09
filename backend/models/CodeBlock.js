const codeBlocks = [
  {
    id: "code-block-1",
    title: "closing parenthesis",
    testCode: "console.log('Hello, World!';",
    correctedCode: "console.log('Hello, World!');",
  },
  {
    id: "code-block-2",
    title: "components-react",
    testCode: "function app ()=>{};",
    correctedCode:
      "import React from 'react';function App() {return ();} export default App;",
  },
  {
    id: "code-block-3",
    title: "loop",
    testCode: "for (let i = 0; i < 5; i++) {",
    correctedCode: "for (let i = 0; i < 5; i++) {}",
  },
  {
    id: "code-block-4",
    title: "object+array",
    testCode: "child=[{name: 'child1' age: 1 },}]",
    correctedCode: "child=[{name: 'child1', age: 1, },]",
  },
];
