import { v4 as uuidv4 } from "uuid";

export const initialState = {
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
            "This is my resumeA resume is a concise, one-to-two-page document that summarizes your professional history, skills, and accomplishments to help you secure a job. It serves as a marketing tool to present your qualifications and experience to potential employers, who often use it to screen candidates before an interview. Key sections typically include contact information, a professional summary, work experience, education, and skills.",
        },
        {
          id: uuidv4(),
          name: "react_note.docx",
          type: "file",
          content:
            "React, often referred to as React.js or ReactJS, is an open-source JavaScript library primarily used for building user interfaces (UIs) for web applications. Developed and maintained by Facebook, it focuses on the layer of an application, meaning it's responsible for what the user sees and interacts with.",
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
          content:
            "HTML, or HyperText Markup Language, is the standard language for creating and structuring web pages. It uses a system of tags and elements to define the structure of content like headings, paragraphs, images, and links, which web browsers interpret to",
        },
        {
          id: uuidv4(),
          name: "app.js",
          type: "file",
          content:
            "JS is the common abbreviation for JavaScript, which is a high-level, dynamic, and interpreted programming language. It is one of the three core technologies of the World Wide Web, alongside HTML and CSS. ",
        },
      ],
    },
  ],
  selectedFile: null,
};
