import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({transactionsList: updatedTransactionsList})
  }

  getIncomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalanceAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    let balanceAmount = 0
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  getExpensesAmount = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalanceAmount()
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpensesAmount()

    return (
      <div className="money-manager-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="header-heading">Hi !!</h1>
            <p className="header-description">
              Welcome back to your
              <span className="app-name"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transactions-and-history-container">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <label htmlFor="titleInput" className="input-label">
                TITLE
              </label>
              <input
                type="text"
                id="titleInput"
                placeholder="TITLE"
                value={titleInput}
                className="input"
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amountInput" className="input-label">
                AMOUNT
              </label>
              <input
                type="text"
                id="amountInput"
                placeholder="AMOUNT"
                value={amountInput}
                className="input"
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="typeSelect" className="input-label">
                TYPE
              </label>
              <select
                id="typeSelect"
                className="input"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <div className="transaction-table-container">
                <ul className="history-table">
                  <li className="list-header-item">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
