import { Link, useLocation } from 'react-router-dom';
import './index.scss';

const Detail = () => {
  const location = useLocation();
  const { data } = location.state;
  return (
    <div className='main'>
      <Link to='/' className='btn btn-primary'>
        Kembali
      </Link>

      <table className='table'>
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {data._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {data.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              : Rp.
              {data.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            </td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {data.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
