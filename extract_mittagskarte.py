import pdfplumber
import json

# Open the PDF
pdf = pdfplumber.open('public/Mittagskarte 2025-2.pdf')

print(f"Total pages: {len(pdf.pages)}\n")

# Extract text from all pages
for i, page in enumerate(pdf.pages):
    print(f"\n{'='*60}")
    print(f"PAGE {i+1}")
    print('='*60)
    text = page.extract_text()
    print(text)
    
    # Also try to extract tables
    tables = page.extract_tables()
    if tables:
        print(f"\n--- TABLES ON PAGE {i+1} ---")
        for j, table in enumerate(tables):
            print(f"\nTable {j+1}:")
            for row in table:
                print(row)

pdf.close()
