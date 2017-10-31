# hackakrista2017
Документ содержит информацию по хакатону "Умный город с использованием технологии blockchain"
 
# Мастер-класс
Перед хакатоном будут проведены мастерклассы по blockchain, а вернее по смарт-контрактам на платформе Ethereum.

## Что нужно для мастер-класса
Ноутбук, можно один на двоих.
На ноутбук лучше установить требуемое программное обеспечение (см. ниже) еще дома, т.к. это может занять длительное время.

### Установка Geth - command line клиента Ethereum
Мы возьмем geth. Инструкции по установке под разные ОС https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum
Не запускайте geth без параметров - он синхронизацию с основной веткой Ethereum, день другой может занять.
Запустите с параметром -dev и -console
`geth --dev console`

Для проверки попробуйте в geth следующие команды:

`> personal.newAccount("123") // Создаем новый аккаунт с паролем "123"`
`"0x07ae7ebb7b9c65b51519fc6561b8a78ad921ed13" // Его адрес`
`> eth.accounts // Смотрим список аккаунтов`
`["0x07ae7ebb7b9c65b51519fc6561b8a78ad921ed13"]`
`miner.setEtherbase(eth.accounts[0]) // Устанавливаем его в качестве аккаунта для майнинга`
`true`
`eth.coinbase // Проверяем`
`"0x07ae7ebb7b9c65b51519fc6561b8a78ad921ed13" // Все верно`
`miner.start() // Запускаем майнер, подзаработаем криптоманет`
`//Пойдет майнинг, "много буков"`
`> miner.stop()`
`true`
`> eth.getBalance(eth.coinbase)`
`//Покажеться ваш баланс`

Убиваем консоль, в таком виде она нам больше не понадобиться.

### Установка Mist wallet
Mist — один из самых распространенных кошельков для Ethereum. Так же он позволяет работать со смарт-контрактами.
Страница релизов https://github.com/ethereum/mist/releases
Вам нужно установить то что называется _Ethereum-Wallet-операционка-версия.xxx_
(Просто _Mist-операционка-версия.xxx_ сейчас не потребуется).

Что бы потом было проще сразу создайте для себя два исполняемых файла (.bat или .sh)
Для запуска geth
`geth --dev --rpc --rpccorsdomain "*" --rpcapi "admin,debug,miner,shh,txpool,personal,eth,net,web3" console`
Для запуска кошелька (путь до кошелька прописать не забудьте)
`"Ethereum Wallet.exe" --rpc http://localhost:8545`

### Подготовка для написания приложения
Поставте **NodeJS**
https://nodejs.org/en/

Если у вас Windows на всякий случай поставте набор компиляторов и прочего софта, который по умолчанию есть на линуксах
`npm install -g --production windows-build-tools`

Кто не в курсе npm - часть NodeJS, если операционка его не находит, надо прописать в переменных окружения или полный путь

Загрузим пакет для создания шаблона приложения на react
`npm install -g create-react-app`

Создадим приложение
`create-react-app my-first-dapp`

Зайдем в созданный каталог 
`cd my-first-dapp`

Добавим зависимость на web3 - библиотека для взаимодействия из javascript с Ethereum
'npm i web3@^0.20 --save'

## Ссылки

Онлайн редактор для Solidity
https://remix.ethereum.org