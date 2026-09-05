import pandas as pd
import json

base_path = r'C:\Users\shrss\.gemini\antigravity-ide\scratch\sStockflow-ai\data\chatbot'
inv_df = pd.read_csv(f'{base_path}\inventory.csv')
prod_df = pd.read_csv(f'{base_path}\products.csv')
loc_df = pd.read_csv(f'{base_path}\locations.csv')

print("Inventory columns:", inv_df.columns.tolist())
print("Product columns:", prod_df.columns.tolist())
print("Location columns:", loc_df.columns.tolist())

# Example: How many products are currently available across all warehouses?
print("Total products:", prod_df['sku'].nunique())

# Example: Which warehouses have Paracetamol 650 mg?
# Let's find paracetamol sku
para = prod_df[prod_df['name'].str.contains('Paracetamol', case=False, na=False)]
print("Paracetamol SKUs:", para[['sku', 'name']].to_dict('records'))

if not para.empty:
    sku = para.iloc[0]['sku']
    para_inv = inv_df[inv_df['sku'] == sku]
    print(f"Warehouses with {sku}:", para_inv[para_inv['available'] > 0]['warehouse_id'].unique().tolist())
