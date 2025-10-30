import { useLoaderData, useNavigate } from "react-router"
import { Button, Table } from "react-bootstrap"
import { useEffect, useState } from "react";

export default function EmployeePage() {
    const { records } = useLoaderData();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState();

    useEffect(() => {
        console.log(records)
        if (records) setEmployees(records);
    }, [records])

    return <div>
        <Button
            onClick={() => {
                navigate('create')
            }}
        >Twa</Button>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fullname</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {employees && employees.map((record, i) => <tr key={i}>
                    <td>{record.id}</td>
                    <td>{record.fullName}</td>
                    <td>{record.type}</td>
                </tr>)}
            </tbody>
        </Table>
    </div>
}