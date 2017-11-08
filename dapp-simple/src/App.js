import React, { Component } from 'react';
import './App.css';
import getWeb3 from './utils/getWeb3';
import SystemMessage from './SystemMessage';
import Header from './Header';

/**
* Стартовый компонент в котором расположена логика работы со смарт-контраком
* Само собой в реальном приложении нужно использовать Redux и всю логику выносить в action
*/
class App extends Component {

    constructor(props) {
      super(props)

      this.state = {
        eth: {},
        web3: null,
        contract: null
      }
    }

    /**
    * Колбек срабатывающий после первичной отрисовки компонента
    */
    componentDidMount() {
        // Получение сетевого провайдера и web3 экземпляра
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    sendTransaction(key, value){
        console.log("Вызов тразнакционного метода");
        this.state.web3.personal.unlockAccount(this.state.web3.eth.coinbase, "123", 1000);
        this.state.eth.simpleContractInstance.setBasicData.sendTransaction(key, value,
          (err, result) => {
              console.log("Функция setBasicData выполнилась", err, result);
              console.log("Пробуем сразу получить данные из контракта методом, getBasicData", 
                  this.state.eth.simpleContractInstance.getBasicData(key));
        });
    }

    /**
    * Собирает разную информацию из сети и сохраняет в state
    * Можно запускать когда мы захотим обновить информацию об аккаунте
    */
    readState(simpleContractInstance){
        var web3     = this.state.web3;
        var eth      = {};
        eth.accounts = web3.eth.accounts;
        eth.coinbase = web3.eth.coinbase;
        eth.balance  = web3.eth.getBalance(web3.eth.coinbase);
        eth.simpleContractInstance = simpleContractInstance 
            ? simpleContractInstance 
            : this.state.eth.simpleContractInstance;
        eth.owner = simpleContractInstance.getOwner();
        eth.address = simpleContractInstance.address;

        this.setState({eth: eth});
    }

    /**
    * Производим первоначальную настроку подключения к контракту (один раз при запуске)
    */
    instantiateContract(){
        console.log("===== can instantiate contract =====");

        var web3     = this.state.web3;
        console.log("Все аккауты", web3.eth.accounts);
        console.log("Coinbase and Balance", web3.eth.coinbase, web3.eth.getBalance(web3.eth.coinbase));

        //api контракта
        var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"setBasicData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"arg","type":"string"}],"name":"getBasicData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"key","type":"string"},{"indexed":false,"name":"value","type":"string"}],"name":"BasicDataEvent","type":"event"}]');
        var contractAdress = '0xea07E5e72ef3d2FBDE860e5999A58De872BFe136';
        var simpleContractInterface = web3.eth.contract(abi);
        simpleContractInterface.eth.defaultAccount = simpleContractInterface.eth.coinbase;
        console.log("SimpleContractInterface", simpleContractInterface);
        var simpleContractInstance = simpleContractInterface.at(contractAdress);
        console.log("SimpleContractInsctance", simpleContractInstance);

        this.readState(simpleContractInstance);

        //Обработчик события
        simpleContractInstance.BasicDataEvent((error, result) => {
            if(! error){
                console.log("Транзакция попала в блок", result);
                this.setState({contract: {key: result.args.key, value: result.args.value} });
                this.changeGetHandler();
            }else{
              console.log("Ошибка при обработке транзакции", error);
            }
        });

    }

    clickHandler(){
        this.sendTransaction(this.refs.keyInput.value,this.refs.valueInput.value);
    }

    changeGetHandler(){
      var value = this.state.eth.simpleContractInstance.getBasicData(this.refs.keyGetInput.value);
      this.setState({value: value});
    }

    render() {
        return (
            <div className="App">
                <Header account={this.state.eth.coinbase} balance={this.state.eth.balance} />

                <div className="App-intro">
                  <div>Адрес владельца контракта: 
                      {this.state.eth.owner ? this.state.eth.owner : "-"}
                  </div>
                  <div>Адрес контракта: 
                      {this.state.eth.address ? this.state.eth.address : "-"}
                  </div>
                  <div className="App-title">
                    Функции контракта
                  </div>
                  <div>
                    Ключ: <input type="text" ref="keyInput"/>
                    Значение: <input type="text" ref="valueInput"/>
                    <a href="#" onClick={this.clickHandler.bind(this)}>Послать транзакцию</a>
                  </div>
                  <div>                  
                    Получить значение по ключу: <input type="text" ref="keyGetInput" onChange={this.changeGetHandler.bind(this)}/>
                    {this.state.value}
                  </div>

                  <SystemMessage contract={this.state.contract}/>
                </div>

            </div>
        );
    }
}

export default App;
