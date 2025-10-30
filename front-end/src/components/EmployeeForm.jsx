import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form"
import ErrorMessage from "./ErrorMessage";

const COUNTRIES = ['PHILIPPINES', 'USA', 'JAPAN']
const ACCOUNT_TYPES = ['ADMIN', 'REPORTER', 'VIEWER']

export default function EmployeeForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    const {
        country: countryError,
        accountType: accountTypeError,
        username: usernameError,
        firstname: firstnameError,
        lastname: lastnameError,
        email: emailError,
        phonenumber: phonenumberError,
        photo: photoError
    } = errors

    return <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Select
                {...register('country', { required: 'Country is required' })}
                isInvalid={countryError}
            >
                {COUNTRIES.map((c, i) => <option key={i}>{c}</option>)}
            </Form.Select>
            {countryError && <ErrorMessage text={countryError.message} />}
        </Form.Group>
        <Form.Group>
            <Form.Label>Account Type</Form.Label>
            <Form.Select
                {...register('accountType', { required: 'Account Type is required' })}
                isInvalid={accountTypeError}
            >
                {ACCOUNT_TYPES.map((c, i) => <option key={i}>{c}</option>)}
            </Form.Select>
            {accountTypeError && <ErrorMessage text={accountTypeError.message} />}
        </Form.Group>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                {...register('username', { required: 'Username is required' })}
                isInvalid={usernameError}
            />
            {usernameError && <ErrorMessage text={usernameError.message} />}
        </Form.Group>
        <Form.Group>
            <Form.Label>Firstname</Form.Label>
            <Form.Control
                {...register('firstname', { required: 'Firstname is required' })}
                type="text"
                isInvalid={firstnameError}
            />
            {firstnameError && <ErrorMessage text={firstnameError.message} />}
        </Form.Group>
        <Form.Group>
            <Form.Label>Lastname</Form.Label>
            <Form.Control
                {...register('lastname', { required: 'Lastname is required' })}
                type="text"
                isInvalid={lastnameError}
            />
            {lastnameError && <ErrorMessage text={lastnameError.message} />}
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
                {...register('email', { required: 'Email is required' })}
                type="email"
                isInvalid={emailError}
            />
            {emailError && <ErrorMessage text={emailError.message} />}
        </Form.Group>
        <Form.Group>
            <Form.Label>Phonenumber</Form.Label>
            <Form.Control
                {...register('phonenumber', { required: 'Phonenumber is required' })}
                type="text"
                isInvalid={phonenumberError}
            />
            {phonenumberError && <ErrorMessage text={phonenumberError.message} />}
        </Form.Group>
        <Form.Group>
            <Form.Label>Photo</Form.Label>
            <Form.Control
                {...register('photo', { required: 'Photo is required' })}
                type="file"
                isInvalid={photoError}
            />
            {photoError && <ErrorMessage text={photoError.message} />}
        </Form.Group>
        <Form.Control className="btn btn-success" type="submit" />
    </Form>
}