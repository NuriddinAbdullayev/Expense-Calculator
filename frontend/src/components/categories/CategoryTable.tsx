import type { Category } from '../../types/category';

import Button from '../ui/Button';
import Card from '../ui/Card';

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card title="Categories">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-3 text-left">
              Name
            </th>

            <th className="py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b"
            >
              <td className="py-3">
                {category.name}
              </td>

              <td className="flex justify-end gap-2 py-3">
                <Button
                  onClick={() =>
                    onEdit(category)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => onDelete(category.id)}
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