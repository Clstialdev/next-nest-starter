# Set UTF-8 encoding for the console
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Enable emoji support
Set-ItemProperty HKCU:\Console -Name VirtualTerminalLevel -Type DWORD -Value 0x10000