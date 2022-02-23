import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../../components/Input';

const Edit = () => {
  const location = useLocation();
  const { data } = location.state;

  const initData = {
    name: data.name,
    price: data.price,
    stock: data.stock,
    status: data.status,
  };

  const [formValues, setFormValues] = useState(initData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    if (e.target.type === 'checkbox') {
      setFormValues({ ...formValues, [name]: e.target.checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    // console.log(values);
    const errors = {};
    if (!values.name) {
      errors.name = ['Name tidak boleh kosong'];
    }
    if (!values.price) {
      errors.price = ['Price tidak boleh kosong'];
    }
    if (!values.stock) {
      errors.stock = ['Stock tidak boleh kosong'];
    }
    return errors;
  };

  const updataData = useCallback(() => {
    console.log(formValues);
    axios
      .put(
        `https://simple-mern-eduwork.herokuapp.com/api/v2/product/${data._id}`,
        {
          name: formValues.name,
          price: formValues.price,
          stock: formValues.stock,
          status: formValues.status,
        }
      )
      .then((response) => {
        alert('Update data berhasil!');
        console.log(response);
      })
      .catch((err) => {
        alert(
          `Update data gagal!
        Error : ${err}`
        );
      });
  }, [formValues, data._id]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      updataData();
    }
  }, [formErrors, isSubmit, updataData]);

  return (
    <div className='main'>
      <div className='card'>
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name='name'
            type='text'
            placeholder='Nama Produk...'
            label='Nama'
            // defaultValue={data.name}
            value={formValues.name}
            error={formErrors.name}
            onChange={handleChange}
          />
          <Input
            name='price'
            type='number'
            placeholder='Harga Produk...'
            label='Harga'
            // defaultValue={data.price}
            value={formValues.price}
            error={formErrors.price}
            onChange={handleChange}
          />
          <Input
            name='stock'
            type='number'
            placeholder='Stock Produk...'
            label='Stock'
            // defaultValue={data.stock}
            value={formValues.stock}
            error={formErrors.stock}
            onChange={handleChange}
          />
          <Input
            name='status'
            type='checkbox'
            label='Active'
            onClick={(e) =>
              e.target.checked
                ? (e.target.checked = true)
                : (e.target.checked = false)
            }
            onChange={handleChange}
            defaultChecked={data.status}
          />
          <button type='submit' className='btn btn-primary'>
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
