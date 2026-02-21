# Taara's prototype - run locally and open browser
$port = 3000
$root = $PSScriptRoot

# Try to start a local server
$started = $false
if (Get-Command py -ErrorAction SilentlyContinue) {
    Start-Process -FilePath "py" -ArgumentList "-m", "http.server", $port -WorkingDirectory $root -WindowStyle Hidden
    $started = $true
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    Start-Process -FilePath "python" -ArgumentList "-m", "http.server", $port -WorkingDirectory $root -WindowStyle Hidden
    $started = $true
} elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    Start-Process -FilePath "npx" -ArgumentList "-y", "serve", ".", "-p", $port -WorkingDirectory $root -WindowStyle Hidden
    $started = $true
}

if ($started) {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:$port"
    Write-Host "Prototype running at http://localhost:$port"
} else {
    # No server available - open file directly
    Start-Process (Join-Path $root "index.html")
    Write-Host "Opened index.html in browser (no server - file://)"
}
