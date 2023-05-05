#!/bin/bash

# Define the header text with the current date and file name
DATE=$(date +"%B %e %Y, %l:%M:%S %p")
HEADER="/*
 * -----------------------------
 * File - %s
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: %s
 * Version: 1.0
 * Description:
 * -----------------------------
 */
"

# Loop through all the .js and .jsx files in the folder
find ./src \( -name "*.js" -o -name "*.jsx" \) -type f | while read file; do
  # Add the header to the beginning of the file
  printf "$HEADER" "$(basename "$file")" "$DATE" | cat - "$file" > temp && mv temp "$file"
done
