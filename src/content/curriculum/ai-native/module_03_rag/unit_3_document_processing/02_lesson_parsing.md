# Lesson 3.2: Document Parsing and Extraction

> **Duration**: 55 minutes | **Type**: Technical
> **Unit**: 3 - Document Processing

---

## 📚 Reading Material

### Common Document Types

| Format | Library | Notes |
|--------|---------|-------|
| PDF | PyPDF2, pdfplumber | Layout matters |
| Word | python-docx | Preserves structure |
| HTML | BeautifulSoup | Strip navigation |
| Markdown | markdown | Clean parsing |
| Code | tree-sitter | AST-aware |

### PDF Extraction

```python
from pypdf import PdfReader

def extract_pdf(path):
    reader = PdfReader(path)
    texts = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        texts.append({"page": i+1, "text": text})
    return texts

# For complex PDFs with tables/layout
import pdfplumber

def extract_pdf_tables(path):
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                yield table
```

### LangChain Document Loaders

```python
from langchain_community.document_loaders import (
    PyPDFLoader,
    DirectoryLoader,
    WebBaseLoader
)

# Single PDF
loader = PyPDFLoader("document.pdf")
docs = loader.load()

# Directory of files
loader = DirectoryLoader("./docs", glob="**/*.md")
docs = loader.load()

# Web page
loader = WebBaseLoader("https://example.com")
docs = loader.load()
```

### Structured Data Extraction

For complex documents, use LLMs:
```python
def extract_metadata(text):
    prompt = f"""Extract from this document:
- Title
- Author
- Date
- Key Topics (list)

Document: {text[:2000]}

Return JSON."""
    
    return llm.generate(prompt, json_mode=True)
```

---

## 🎬 Video Script

**[INTRO - Document format variety]**

Before chunking, you need to extract text. Each format has challenges.

**[CUT TO: PDF]**

PDFs are tricky—layouts, tables, scanned images. PyPDF for simple text, pdfplumber for tables, OCR for scans.

**[CUT TO: LangChain loaders]**

LangChain provides loaders for most formats. PDF, Word, Markdown, web pages, even Notion and Slack.

**[CUT TO: LLM extraction]**

For complex metadata, use LLMs. Extract title, author, topics in one call.

**[END - Runtime: 4:30]**

---

## ✅ Knowledge Check

### Question 1
Why are PDFs challenging to parse?

A) They're encrypted  
B) Layout, tables, and images complicate extraction  
C) They're too large  
D) Python can't read them  

**Correct Answer**: B
