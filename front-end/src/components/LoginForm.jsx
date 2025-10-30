import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    const {
        username: usernameError,
        password: passwordError
    } = errors;

    return <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                {...register('username', { required: 'Username is required' })}
                isInvalid={usernameError}
            />
            {usernameError && <ErrorMessage text={usernameError.message} />}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                {...register('password', { required: 'Password is required' })}
                isInvalid={passwordError}
            />
            {passwordError && <ErrorMessage text={passwordError.message} />}
        </Form.Group>
        <Form.Control className="btn btn-success" type="submit" />
    </Form>
}