import { useDoctors } from "../../hooks/useDoctors";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function UDoctorsTable() {
  const { data } = useDoctors();

  return (
    <div>
      {data && (
        <table className="w-full table-auto">
          <thead className="overflow-hidden rounded-md bg-dry">
            <tr>
              <th className={thclass}>#</th>
              <th className={thclass}>Doctor</th>
              <th className={thclass}>Phone Number</th>
              <th className={thclass}>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={tdclass}>{index + 1}</td>
                <td className={tdclass}>{item.fullName}</td>
                <td className={tdclass}>
                  <p className="text-textGray">{item.phoneNumber}</p>
                </td>
                <td className={tdclass}>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
