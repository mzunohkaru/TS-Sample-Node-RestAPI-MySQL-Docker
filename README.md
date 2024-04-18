## OpenAPI Swagger Viewer
option + shift + P

## Docker内のMySQLに簡単に接続するコマンド
$ chmod +x ./bin/connect_mysql.sh
$ ./bin/connect_mysql.sh

## Docker Command
$ docker-compose up --build
$ docker-compose build --no-cache && docker-compose up

## データベース (MySQL) へのアクセス
$ docker-compose exec mysql mysql -uuser -ppassword dev

$ npx prisma generate