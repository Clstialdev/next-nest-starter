# Check if mkcert is installed
try {
    $mkcertVersion = mkcert -version
    Write-Host "✅ mkcert is installed: $mkcertVersion"
} catch {
    Write-Host "❌ mkcert is not installed. Please install it first:"
    Write-Host "   Using Chocolatey: choco install mkcert"
    Write-Host "   Or download from: https://github.com/FiloSottile/mkcert/releases"
    exit 1
}

# Create certificates directory if it doesn't exist
if (-not (Test-Path "letsencrypt")) {
    New-Item -ItemType Directory -Path "letsencrypt" | Out-Null
    Write-Host "📁 Created letsencrypt directory"
}

# Install local CA
Write-Host "🔐 Installing local CA..."
mkcert -install

# Generate certificates for our domains
Write-Host "🔑 Generating certificates for *.localhost..."
mkcert -cert-file letsencrypt/local.crt -key-file letsencrypt/local.key "*.localhost"

Write-Host "✅ Certificates generated successfully!"
Write-Host "📁 Certificates are stored in the letsencrypt directory" 