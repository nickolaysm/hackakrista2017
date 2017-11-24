pragma solidity ^0.4.4; 
/**
* Простой контракт с конструктором и двумя внутренними переменными.
* owner - устанавливается в конструкторе,
* basic_data - маппа для работы с которой есть два метода на установку и чтение
*/
contract SimpleContract {
	address owner;
	mapping (string => string) basic_data;
	
	/**
	* Конструктор
	* msg - служебное слово, передает параметры, которые можно передать любому методу
	* Подробнее про msg
	* http://solidity.readthedocs.io/en/develop/units-and-global-variables.html#block-and-transaction-properties
	*/
	function SimpleContract() public{
		owner = msg.sender;
	}

	/**
	* Событие срабатывает на прохождение транзакции 
	* по записи данных в мапу
	*/
	event BasicDataEvent(
		string key,
		string value
	);

    function getOwner() public constant returns (address){
        return owner;
    }

	function getBasicData(string arg) public constant returns (string){
		return basic_data[arg];
	}

	/**
	* По факту этот метод произведет транзакцию записи в блокчейн
	* BasicDataEvent - событие сработает не в момент вызова функции,
	* а в момент когда транзакция попадет в блок
	*/
	function setBasicData(string key, string value) public{
		basic_data[key] = value;
		BasicDataEvent(key, value);
	}

} 