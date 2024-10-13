#!/bin/bash

output_file="combined_scraper.py"

> $output_file

add_file_content() {
    local file=$1
    echo -e "\n# --- $file ---\n" >> $output_file
    cat $file >> $output_file
}
add_file_content "constants.py"
add_file_content "database.py"
add_file_content "Reclamacao.py"
add_file_content "scraper.py"
add_file_content "url_collector.py"
add_file_content "utils.py"
add_file_content "reclame_aqui_scraper.py"

echo "Todos os arquivos foram combinados em $output_file"