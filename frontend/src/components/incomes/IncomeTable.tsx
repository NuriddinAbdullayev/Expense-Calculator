import Card from '../ui/Card';
import Button from '../ui/Button';
import Money from '../ui/Money';

export default function IncomeTable({
  data,
  onEdit,
  onDelete,
}: any) {
  return (
    <Card title="Income">
      <table className="w-full">
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((income: any) => (
            <tr key={income.id}>
              <td>{income.source}</td>

              <td>
                <Money
                  amount={income.amount}
                />
              </td>

              <td>
                {income.description}
              </td>

              <td className="space-x-2">
                <Button
                  onClick={() =>
                    onEdit(income)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    onDelete(income.id)
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