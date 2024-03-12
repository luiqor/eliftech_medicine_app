import Spinner from 'react-bootstrap/Spinner'

export default function LoadingBox() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner animation='border' role='status'/>
    </div>
  )
}