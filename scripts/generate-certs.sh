#!/bin/bash

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "mkcert is not installed. Please install it first:"
    echo "On Ubuntu/Debian: sudo apt install mkcert"
    echo "On macOS: brew install mkcert"
    echo "On Windows: choco install mkcert"
    exit 1
fi

# Create certificates directory if it doesn't exist
mkdir -p letsencrypt

# Install local CA
mkcert -install

# Generate certificates for our domains
mkcert -cert-file letsencrypt/local.crt -key-file letsencrypt/local.key "*.localhost"

echo "Certificates generated successfully!"
echo "Certificates are stored in the letsencrypt directory" 