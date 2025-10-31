import { Form } from "react-bootstrap";

export default function SizeDropdown({ size, setSize }) {
  return (
    <Form.Select
      value={size}
      onChange={(e) => setSize(Number(e.target.value))}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
    </Form.Select>
  );
}