# Get the hosts file path
$hostsPath = "$env:windir\System32\drivers\etc\hosts"

# Define the domains to add
$domains = @(
    "frontend.localhost",
    "backend.localhost",
    "traefik.localhost"
)

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️ Warning: Not running as administrator - hosts file will not be updated"
    Write-Host "💡 To enable local domain access, manually add these entries to your hosts file:"
    foreach ($domain in $domains) {
        Write-Host "   127.0.0.1 $domain"
    }
    exit 1
}

# Read current hosts file content
$hostsContent = Get-Content $hostsPath

# Add new entries if they don't exist
$addedEntries = $false
foreach ($domain in $domains) {
    $entry = "127.0.0.1 $domain"
    if (-not ($hostsContent -match [regex]::Escape($entry))) {
        Add-Content -Path $hostsPath -Value $entry
        $addedEntries = $true
    }
}

if ($addedEntries) {
    Write-Host "✅ Hosts file updated successfully!"
} else {
    Write-Host "✅ All required domains are already configured in hosts file."
} 