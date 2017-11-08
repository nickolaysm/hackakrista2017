import React, { Component } from 'react';

/**
* Выводит информацию в случае обнаружения новой транзакции
*/
class SystemMessage extends Component{
	render(){
		return(
			<div>
				{this.props.contract
					? <h2>Обнаружена транзакция: 
						({this.props.contract.key}, 
						{this.props.contract.value}) </h2>
					: ""}
			</div>			
		);
	}
}

export default SystemMessage;