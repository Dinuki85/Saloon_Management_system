$sqlFile = "backend/src/main/resources/add_audit_columns.sql"
$content = Get-Content $sqlFile -Raw
mysql -u root saloon_db -e $content
