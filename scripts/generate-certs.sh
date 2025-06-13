#!/bin/bash
set -e

# Check if mkcert is installed
if ! command -v mkcert &>/dev/null; then
  echo "❌ mkcert is not installed."
  echo "Please install it from https://github.com/FiloSottile/mkcert"
  exit 1
fi

CERT_DIR="certs"
mkdir -p "$CERT_DIR"

# Use a more descriptive name for the multi-domain certificate
CERT_FILE="$CERT_DIR/local-domains.pem"
KEY_FILE="$CERT_DIR/local-domains-key.pem"

# Check if certificates already exist
if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
  echo "✅ Certificates already exist. Skipping generation."
  exit 0
fi

echo "🚀 Installing local CA (you might be prompted for your password)..."
mkcert -install

echo "🔐 Generating certificate for specific domains..."
# --- UPDATED ---
# Generate a single certificate for all required domains
mkcert -cert-file "$CERT_FILE" -key-file "$KEY_FILE" zennstack.localhost api.zennstack.localhost traefik.zennstack.localhost

echo "✅ Certificates generated successfully in $CERT_DIR/"