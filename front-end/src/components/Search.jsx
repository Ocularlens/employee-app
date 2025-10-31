import { Form } from "react-bootstrap";

export default function SearchBox({ query, setQuery }) {
  return (
    <Form.Control
      type="text"
      placeholder="Search by fullname, username, or email"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}