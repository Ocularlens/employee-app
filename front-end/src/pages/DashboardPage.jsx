import { Outlet, useLocation, Link } from "react-router"
import { Breadcrumb } from "react-bootstrap"

const DEFINED_SUB_PATHS = [
    { key: 'create', text: 'Add Employee' },
    { key: 'edit', text: 'Update Employee' },
    { key: '', text: 'Dashboard' }
];

export default function DashboardPage() {
    const location = useLocation();
    const currentPath = location.pathname.split('/')[2];
    const pageText = DEFINED_SUB_PATHS.find(val => val.key === currentPath)?.text;
    const isDashboardActive = !pageText;

    console.log({ isDashboardActive, currentPath })

    return <div className='dashboard-container'>
        <div className="breadcrumb-container">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/dashboard' }} active={isDashboardActive}>Dashboard</Breadcrumb.Item>
                {pageText && <Breadcrumb.Item active>{pageText}</Breadcrumb.Item>}
            </Breadcrumb>
        </div>
        <Outlet />
    </div>
}