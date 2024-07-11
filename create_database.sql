CREATE DATABASE IF NOT EXISTS harmoniSync_db;
CREATE USER IF NOT EXISTS 'harmoniSync_dev'@'localhost' IDENTIFIED BY 'dev';
GRANT ALL PRIVILEGES ON harmoniSync_db.* TO 'harmoniSync_dev'@'localhost';
FLUSH PRIVILEGES;