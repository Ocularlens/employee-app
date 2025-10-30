import { Form } from "react-bootstrap"

export default function ErrorMessage({ text }) {
    return <Form.Control.Feedback type="invalid">{text}</Form.Control.Feedback>
}