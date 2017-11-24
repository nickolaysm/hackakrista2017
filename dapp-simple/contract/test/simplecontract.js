// Specifically request an abstraction for MetaCoin
var SimpleContract = artifacts.require("SimpleContract");

contract('SimpleContract', function(accounts) {

    it("Check mapping", function() {
        var contract;
        return SimpleContract.deployed().then(function(instance) {

            contract = instance;
            return contract.setBasicData("lang", "C++" ,  {from: accounts[0]});
        }).then(function(result) {

            return contract.setBasicData("1", "value 1" , {from: accounts[0]});                        
        }).then(function() {

            return contract.getBasicData("lang");
        }).then(function(value) {      
                  
            assert.equal(value, "C++", "key lang should contain C++");
        });
    });


    it("Check BasicDataEvent", function() {

        return SimpleContract.deployed().then(function(instance) {

            return instance.setBasicData("1", "value 1" , {from: accounts[0]});                        
        }).then(function(result) {
            // result is an object with the following values:
            //
            // result.tx      => transaction hash, string
            // result.logs    => array of decoded events that were triggered within this transaction
            // result.receipt => transaction receipt object, which includes gas used

            // We can loop through result.logs to see if we triggered the Transfer event.
            var eventCount = 0;
            for (var i = 0; i < result.logs.length; i++) {
              var log = result.logs[i];

              if (log.event == "BasicDataEvent") {
                return ;
              }
            }
            assert.isOk(false, 'We should catch BasicDataEvent after setBasicData().');
        })
    });

});
