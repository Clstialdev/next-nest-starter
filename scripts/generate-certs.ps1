# Check if mkcert is installed
if (-not (Get-Command mkcert -ErrorAction SilentlyContinue)) {
    Write-Host "❌ mkcert is not installed." -ForegroundColor Red
    Write-Host "Please install it using 'choco install mkcert' or from https://github.com/FiloSottile/mkcert"
    exit 1
}

$certDir = "certs"
if (-not (Test-Path $certDir)) {
    New-Item -ItemType Directory -Path $certDir | Out-Null
}

# Use a more descriptive name for the multi-domain certificate
$certFile = Join-Path $certDir "local-domains.pem"
$keyFile = Join-Path $certDir "local-domains-key.pem"

# Check if certificates already exist
if ((Test-Path $certFile) -and (Test-Path $keyFile)) {
    Write-Host "✅ Certificates already exist. Skipping generation." -ForegroundColor Green
    exit 0
}

Write-Host "🚀 Installing local CA (a security prompt may appear)..." -ForegroundColor Cyan
mkcert -install

Write-Host "🔐 Generating certificate for specific domains..." -ForegroundColor Cyan
# --- UPDATED ---
# Generate a single certificate for all required domains
mkcert -cert-file $certFile -key-file $keyFile zennstack.localhost api.zennstack.localhost traefik.zennstack.localhost

Write-Host "✅ Certificates generated successfully in $certDir/" -ForegroundColor Green