import sys
import argparse
import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize

def count_tokens(text):
    tokens = word_tokenize(text)
    return len(tokens)

def save_tokens(tokens, start_index, max_tokens, output_filename):
    selected_tokens = tokens[start_index:start_index + max_tokens]
    with open(output_filename, 'w', encoding='utf-8') as file:
        file.write(' '.join(selected_tokens))

def main(filename, start_index, max_tokens, output_filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            text = file.read()
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)

    tokens = word_tokenize(text)
    token_count = len(tokens)
    print("Number of tokens:", token_count)
    
    if start_index >= token_count:
        print(f"Error: start_index {start_index} is out of range. The total number of tokens is {token_count}.")
        sys.exit(1)

    save_tokens(tokens, start_index, max_tokens, output_filename)
    print(f"Selected tokens saved to {output_filename}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Count tokens in a text file and save a portion of the tokens to another file.")
    parser.add_argument("filename", help="Path to the text file to be analyzed.")
    parser.add_argument("start_index", type=int, help="The starting index of the tokens to be saved (0-indexed).")
    parser.add_argument("max_tokens", type=int, help="The maximum number of tokens to be saved.")
    parser.add_argument("output_filename", help="Path to the output file where the selected tokens will be saved.")
    args = parser.parse_args()
    main(args.filename, args.start_index, args.max_tokens, args.output_filename)
