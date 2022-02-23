import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const Home = () => {
  const [initData, setInitData] = useState({
    data: [],
  });

  const [keySearch, setKeySearch] = useState('');

  const getData = useCallback(() => {
    axios
      .get(
        `https://simple-mern-eduwork.herokuapp.com/api/v2/product?search=${keySearch}`
      )
      .then((result) => setInitData({ data: result.data }))
      .catch((error) => console.log(error));
  }, [keySearch]);

  const dropData = (data_id) => {
    axios
      .delete(
        `https://simple-mern-eduwork.herokuapp.com/api/v2/product/${data_id}`
      )
      .then((result) => {
        alert('data berhasil dihapus!');
        getData();
      })
      .catch((error) => alert(error));
  };

  useEffect(() => getData(), [getData]);

  return (
    <div className='main'>
      <Link to='/tambah' className='btn btn-primary'>
        Tamah Produk
      </Link>
      <div className='search'>
        <input
          type='text'
          placeholder='Masukan kata kunci...'
          onChange={(e) => setKeySearch(e.target.value)}
        />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className='text-right'>Price</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            /* <tr>
            <td>1</td>
            <td>Laptop</td>
            <td className='text-right'>RP. 20.000.000</td>
            <td className='text-center'>
              <Link to='/detail' className='btn btn-sm btn-info'>
                Detail
              </Link>
              <Link to='/edit' className='btn btn-sm btn-warning'>
                Edit
              </Link>
              <Link to='#' className='btn btn-sm btn-danger'>
                Delete
              </Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Monitor</td>
            <td className='text-right'>RP. 10.000.000</td>
            <td className='text-center'>
              <Link to='/detail' className='btn btn-sm btn-info'>
                Detail
              </Link>
              <Link to='/edit' className='btn btn-sm btn-warning'>
                Edit
              </Link>
              <Link to='#' className='btn btn-sm btn-danger'>
                Delete
              </Link>
            </td>
          </tr> */
            initData.data.map((data, index) => {
              return (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td className='text-right'>
                    RP.{' '}
                    {data.price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                  <td className='text-center'>
                    <Link
                      to={{
                        pathname: '/detail',
                        state: {
                          data,
                        },
                      }}
                      className='btn btn-sm btn-info'>
                      Detail
                    </Link>
                    <Link
                      to={{ pathname: '/edit', state: { data } }}
                      className='btn btn-sm btn-warning'>
                      Edit
                    </Link>
                    <Link
                      to='#'
                      className='btn btn-sm btn-danger'
                      onClick={() => {
                        if (
                          window.confirm(
                            'Apakah anda yakin akan menghapus data ini?'
                          )
                        ) {
                          dropData(data._id);
                        }
                      }}>
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Home;
