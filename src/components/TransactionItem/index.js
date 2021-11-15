import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="table-row">
      <p className="table-cell">{title}</p>

      <p className="table-cell">Rs {amount}</p>
      <p className="table-cell">{type}</p>
      <div className="delete-container">
        <button
          type="button"
          className="delete-button"
          testid="delete"
          onClick={onDeleteTransaction}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
