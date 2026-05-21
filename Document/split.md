import os
import re

def find_balanced_block(text, start_pos, open_char, close_char):
    pos = start_pos
    count = 0
    started = False
    while pos < len(text):
        if text[pos] == open_char:
            count += 1
            started = True
        elif text[pos] == close_char:
            count -= 1
            if started and count == 0:
                return pos + 1
        pos += 1
    return -1

# Paths
workspace_path = r"d:\Mindx\AppProducer\Sample Personal\AlgoCraft"
template_path = os.path.join(workspace_path, "user", "template.html")

print(f"Reading monolithic template from: {template_path}")
with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract CSS
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    css_content = style_match.group(1).strip()
    print("Found CSS style block.")
else:
    raise ValueError("CSS style block not found in template.html!")

# 2. Extract JS Block
script_match = re.search(r'<!-- JavaScript Logical Core Code -->\s*<script>(.*?)</script>', content, re.DOTALL)
if not script_match:
    # Try finding script block with system definitions
    script_match = re.search(r'<script>\s*// System definitions of 31 Categories(.*?)</script>', content, re.DOTALL)

if script_match:
    js_block = script_match.group(1)
    print("Found Javascript block.")
else:
    raise ValueError("Javascript block not found in template.html!")

# 3. Extract sub-JS variables
# - algoCategories
# - megaGroups
# - graphData
# - algorithmDatabase

# algoCategories
algo_cat_idx = js_block.find("const algoCategories = [")
if algo_cat_idx == -1:
    algo_cat_idx = js_block.find("const algoCategories =")
algo_cat_end = find_balanced_block(js_block, algo_cat_idx, '[', ']')
if algo_cat_idx == -1 or algo_cat_end == -1:
    raise ValueError("Could not extract algoCategories array!")
algo_categories_str = js_block[algo_cat_idx:algo_cat_end]

# megaGroups
mega_groups_idx = js_block.find("const megaGroups = [")
if mega_groups_idx == -1:
    mega_groups_idx = js_block.find("const megaGroups =")
mega_groups_end = find_balanced_block(js_block, mega_groups_idx, '[', ']')
if mega_groups_idx == -1 or mega_groups_end == -1:
    raise ValueError("Could not extract megaGroups array!")
mega_groups_str = js_block[mega_groups_idx:mega_groups_end]

# algorithmDatabase
algo_db_idx = js_block.find("const algorithmDatabase = {")
if algo_db_idx == -1:
    algo_db_idx = js_block.find("const algorithmDatabase =")
algo_db_end = find_balanced_block(js_block, algo_db_idx, '{', '}')
if algo_db_idx == -1 or algo_db_end == -1:
    raise ValueError("Could not extract algorithmDatabase object!")
algorithm_database_str = js_block[algo_db_idx:algo_db_end]

# graphData
graph_data_idx = js_block.find("let graphData = {")
if graph_data_idx == -1:
    graph_data_idx = js_block.find("let graphData =")
graph_data_end = find_balanced_block(js_block, graph_data_idx, '{', '}')
if graph_data_idx == -1 or graph_data_end == -1:
    raise ValueError("Could not extract graphData object!")
graph_data_str = js_block[graph_data_idx:graph_data_end]

# Write CSS
css_dir = os.path.join(workspace_path, "user", "css")
os.makedirs(css_dir, exist_ok=True)
css_file_path = os.path.join(css_dir, "style.css")
with open(css_file_path, 'w', encoding='utf-8') as f:
    f.write("/* ==========================================================================\n")
    f.write("   AlgoMaster Lab - Custom Stylesheet\n")
    f.write("   ========================================================================== */\n\n")
    f.write(css_content + "\n")
print(f"Created/updated: {css_file_path}")

# Write data.js
js_dir = os.path.join(workspace_path, "user", "js")
os.makedirs(js_dir, exist_ok=True)
data_file_path = os.path.join(js_dir, "data.js")
data_js_content = f"""/* ==========================================================================
   AlgoMaster Lab - Config & Initial State Data
   ========================================================================== */

// 1. System definitions of 31 Categories (Structured mapping)
{algo_categories_str}

// 2. MegaGroups mapping to organize 31 categories into 7 large groups
{mega_groups_str}

// 3. Initial Graph visualizer data modeling (Default layout)
{graph_data_str}
"""
with open(data_file_path, 'w', encoding='utf-8') as f:
    f.write(data_js_content.strip() + "\n")
print(f"Created/updated: {data_file_path}")

# Write database.js
db_file_path = os.path.join(js_dir, "database.js")
db_js_content = f"""/* ==========================================================================
   AlgoMaster Lab - Academic Encyclopedia & Simulation Step Generators
   ========================================================================== */

// Master database detailing standard algorithms
{algorithm_database_str}
"""
with open(db_file_path, 'w', encoding='utf-8') as f:
    f.write(db_js_content.strip() + "\n")
print(f"Created/updated: {db_file_path}")

# Construct main.js
main_js_content = js_block
main_js_content = main_js_content.replace(algo_categories_str, "// algoCategories moved to js/data.js")
main_js_content = main_js_content.replace(mega_groups_str, "// megaGroups moved to js/data.js")
main_js_content = main_js_content.replace(algorithm_database_str, "// algorithmDatabase moved to js/database.js")
main_js_content = main_js_content.replace(graph_data_str, "// graphData moved to js/data.js")

# Clean up redundant titles/comments from lines preceding declarations
main_js_content = re.sub(r'\n\s*// System definitions of 31 Categories\n\s*// algoCategories moved to js/data.js', '\n    // algoCategories moved to js/data.js', main_js_content)
main_js_content = re.sub(r'\n\s*// MegaGroups mapping to organize 31 categories into 7 large groups.*?\n\s*// megaGroups moved to js/data.js', '\n    // megaGroups moved to js/data.js', main_js_content)
main_js_content = re.sub(r'\n\s*// Master database detailing standard algorithms\n\s*// algorithmDatabase moved to js/database.js', '\n    // algorithmDatabase moved to js/database.js', main_js_content)
main_js_content = re.sub(r'\n\s*// Graph visualizer data modeling\n\s*// graphData moved to js/data.js', '\n    // graphData moved to js/data.js', main_js_content)

main_file_path = os.path.join(js_dir, "main.js")
with open(main_file_path, 'w', encoding='utf-8') as f:
    f.write("/* ==========================================================================\n")
    f.write("   AlgoMaster Lab - Main Logical Controller & Visualizers Engine\n")
    f.write("   ========================================================================== */\n\n")
    f.write(main_js_content.strip() + "\n")
print(f"Created/updated: {main_file_path}")

# 4. Generate modular HTML
modular_html = content

# Replace CSS block
style_pattern = r'  <style>.*?</style>'
modular_html = re.sub(style_pattern, '  <!-- External Custom Stylesheet -->\n  <link rel="stylesheet" href="css/style.css">', modular_html, flags=re.DOTALL)

# Replace JS block
js_pattern = r'  <!-- JavaScript Logical Core Code -->\s*<script>.*?</script>'
replacement_js = """  <!-- JavaScript Logical Core Code -->
  <script src="js/data.js"></script>
  <script src="js/database.js"></script>
  <script src="js/main.js"></script>"""

if not re.search(js_pattern, modular_html, re.DOTALL):
    js_pattern = r'<script>\s*// System definitions of 31 Categories.*?</script>'

modular_html = re.sub(js_pattern, replacement_js, modular_html, flags=re.DOTALL)

# Write to template.html
with open(template_path, 'w', encoding='utf-8') as f:
    f.write(modular_html)
print(f"Updated monolithic source template to modular link state: {template_path}")

# Write to index.html
index_path = os.path.join(workspace_path, "user", "index.html")
with open(index_path, 'w', encoding='utf-8') as f:
    f.write(modular_html)
print(f"Updated index.html: {index_path}")

print("\nRefactoring split finished successfully!")
