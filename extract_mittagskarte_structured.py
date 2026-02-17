import pdfplumber
import json
import re

# Open the PDF
pdf = pdfplumber.open('public/Mittagskarte 2025-2.pdf')

print(f"Total pages: {len(pdf.pages)}\n")

all_text = []
all_tables = []

# Extract text and tables from all pages
for i, page in enumerate(pdf.pages):
    print(f"\n{'='*60}")
    print(f"PAGE {i+1}")
    print('='*60)
    
    text = page.extract_text()
    all_text.append(text)
    print(text)
    
    # Extract tables
    tables = page.extract_tables()
    if tables:
        print(f"\n--- TABLES ON PAGE {i+1} ---")
        for j, table in enumerate(tables):
            print(f"\nTable {j+1}:")
            all_tables.append(table)
            for row in table:
                print(row)

pdf.close()

# Save raw extracted data
with open('mittagskarte_raw.txt', 'w', encoding='utf-8') as f:
    f.write("\n\n=== ALL TEXT ===\n\n")
    f.write("\n\n===PAGE BREAK===\n\n".join(all_text))
    f.write("\n\n=== ALL TABLES ===\n\n")
    f.write(json.dumps(all_tables, indent=2, ensure_ascii=False))

print("\n\nRaw data saved to mittagskarte_raw.txt")
