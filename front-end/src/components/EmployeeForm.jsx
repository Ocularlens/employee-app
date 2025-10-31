import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createEmployee, updateEmployeeById } from "../api/employee";
import ErrorMessage from "./ErrorMessage";

const COUNTRIES = ["PHILIPPINES", "USA", "JAPAN"];
const ACCOUNT_TYPES = ["ADMIN", "REPORTER", "VIEWER"];

export default function EmployeeForm({ employee }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      setValue("country", employee.country);
      setValue("accountType", employee.accountType);
      setValue("username", employee.username);
      setValue("firstname", employee.firstname);
      setValue("lastname", employee.lastname);
      setValue("email", employee.email);
      setValue("phonenumber", employee.phonenumber);
    }
  }, [employee, setValue]);

  const onSubmit = async (data) => {
    const { photo } = data;
    const formData = new FormData();
    formData.append("country", data.country);
    formData.append("accountType", data.accountType);
    formData.append("username", data.username);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("phonenumber", data.phonenumber);

    if (photo && photo.length > 0) {
      formData.append("photo", photo[0]);
    }

    if (employee) {
      await updateEmployeeById(employee.id, formData);
    } else {
      await createEmployee(formData);
    }
    navigate("/dashboard");
  };

  const {
    country: countryError,
    accountType: accountTypeError,
    username: usernameError,
    firstname: firstnameError,
    lastname: lastnameError,
    email: emailError,
    phonenumber: phonenumberError,
    photo: photoError,
  } = errors;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select
          {...register("country", { required: "Country is required" })}
          isInvalid={countryError}
        >
          {COUNTRIES.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </Form.Select>
        {countryError && <ErrorMessage text={countryError.message} />}
      </Form.Group>
      <Form.Group>
        <Form.Label>Account Type</Form.Label>
        <Form.Select
          {...register("accountType", { required: "Account Type is required" })}
          isInvalid={accountTypeError}
        >
          {ACCOUNT_TYPES.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </Form.Select>
        {accountTypeError && <ErrorMessage text={accountTypeError.message} />}
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          {...register("username", { required: "Username is required" })}
          isInvalid={usernameError}
        />
        {usernameError && <ErrorMessage text={usernameError.message} />}
      </Form.Group>
      <Form.Group>
        <Form.Label>Firstname</Form.Label>
        <Form.Control
          {...register("firstname", { required: "Firstname is required" })}
          type="text"
          isInvalid={firstnameError}
        />
        {firstnameError && <ErrorMessage text={firstnameError.message} />}
      </Form.Group>
      <Form.Group>
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          {...register("lastname", { required: "Lastname is required" })}
          type="text"
          isInvalid={lastnameError}
        />
        {lastnameError && <ErrorMessage text={lastnameError.message} />}
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          {...register("email", { required: "Email is required" })}
          type="email"
          isInvalid={emailError}
        />
        {emailError && <ErrorMessage text={emailError.message} />}
      </Form.Group>
      <Form.Group>
        <Form.Label>Phonenumber</Form.Label>
        <Form.Control
          {...register("phonenumber", { required: "Phonenumber is required" })}
          type="text"
          isInvalid={phonenumberError}
        />
        {phonenumberError && <ErrorMessage text={phonenumberError.message} />}
      </Form.Group>
      <Form.Group>
        <Form.Label>Photo</Form.Label>
        <Form.Control
          {...register("photo", {
            required: !employee ? "Photo is required" : false,
          })}
          type="file"
          isInvalid={photoError}
        />
        {photoError && <ErrorMessage text={photoError.message} />}
      </Form.Group>
      <br />
      <Form.Control className="btn btn-success" type="submit" />
    </Form>
  );
}
