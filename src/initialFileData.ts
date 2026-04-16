import { v4 as uuidv4 } from "uuid";
import type { FileExplorerState } from "./types";

export const initialState: FileExplorerState = {
  fileData: [
    {
      id: uuidv4(),
      name: "notes",
      type: "folder",
      expanded: false,
      children: [
        {
          id: uuidv4(),
          name: "resume_ashish.pdf",
          type: "file",
          content:
            "This is my resume. A resume is a concise, one-to-two-page document that summarizes your professional history, skills, and accomplishments to help you secure a job.",
        },
        {
          id: uuidv4(),
          name: "react_note.docx",
          type: "file",
          content:
            "React, often referred to as React.js or ReactJS, is an open-source JavaScript library primarily used for building user interfaces (UIs) for web applications.",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "code",
      type: "folder",
      expanded: false,
      children: [
        {
          id: uuidv4(),
          name: "index.html",
          type: "file",
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Explorer API</title>
</head>
<body>
  <div id="app">
    <h1>Hello, Developer</h1>
    <p>This is standard HTML 5 boilerplate.</p>
  </div>
  <script src="./app.js"></script>
</body>
</html>`,
        },
        {
          id: uuidv4(),
          name: "app.js",
          type: "file",
          content: `/**
 * Math utilities
 */
function sum(a, b) {
  return a + b;
}

const result = sum(5, 7);
console.log("The sum is:", result);`,
        },
      ],
    },
  ],
  selectedFile: null,
};
