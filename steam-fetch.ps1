param([string]$Url)
try {
  $client = New-Object System.Net.WebClient
  $bytes = $client.DownloadData($Url)
  $contentType = ""
  try { $contentType = $client.ResponseHeaders["Content-Type"].ToString() } catch {}
  if ($contentType -like "image/*") {
    $b64 = [System.Convert]::ToBase64String($bytes)
    Write-Output "IMG_BASE64:$b64"
  } else {
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    Write-Output $text
  }
} catch {
  Write-Output "{""error"":true,""statusCode"":0,""message"":""$($_.Exception.Message)""}"
}

