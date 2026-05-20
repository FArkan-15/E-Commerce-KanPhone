with open(r'd:\PKK\ecommerce\src\views\Product\ProductDetailView.vue', 'r', encoding='utf-8') as f:
    lines = f.readlines()

import_statement = "import ProductSpecifications from '@/components/ProductSpecifications.vue'\n"
lines.insert(4, import_statement)

del lines[156:615]
lines.insert(156, '        <ProductSpecifications :product="product" :selectedColor="selectedColor" />\n')

with open(r'd:\PKK\ecommerce\src\views\Product\ProductDetailView.vue', 'w', encoding='utf-8') as f:
    f.writelines(lines)
