import Card from '../ui/Card';
import Button from '../ui/Button';
import Money from '../ui/Money';

export default function ExpenseTable({
  data,
  onEdit,
  onDelete,
}: any) {
  return (
    <Card title="Expenses">
      <table className="w-full">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((expense: any) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>

              <td>
                {expense.category.name}
              </td>

              <td>
                <Money
                  amount={expense.amount}
                />
              </td>

              <td className="space-x-2">
                <Button
                  onClick={() =>
                    onEdit(expense)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    onDelete(expense.id)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}