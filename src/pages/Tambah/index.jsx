import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {
  const initValue = {
    name: '',
    price: '',
    Stock: '',
    status: true,
  };

  const [formValues, setFormValues] = useState(initValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = ['Name tidak boleh kosong'];
    }
    if (!values.price) {
      errors.price = ['Price tidak boleh kosong'];
    }
    if (values.Stock <= 0) {
      errors.Stock = ['Stock tidak boleh kosong'];
    }
    return errors;
  };

  const postData = useCallback(() => {
    axios
      .post(`https://simple-mern-eduwork.herokuapp.com/api/v2/product`, {
        name: formValues.name,
        price: formValues.price,
        stock: formValues.Stock,
        status: formValues.status,
      })
      .then((response) => {
        alert('Tambah data berhasil !');
        console.log(response);
      })
      .catch((error) =>
        alert(
          `Tambah data gagal
           Error : ${error}`
        )
      );
  }, [formValues]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      postData();
    }
  }, [isSubmit, formErrors, postData]);

  return (
    <div className='main'>
      <div className='card'>
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name='name'
            type='text'
            placeholder='Nama Produk...'
            label='Nama'
            value={formValues.name}
            error={formErrors.name}
            onChange={handleChange}
          />
          <Input
            name='price'
            type='number'
            placeholder='Harga Produk...'
            label='Harga'
            value={formValues.price}
            error={formErrors.price}
            onChange={handleChange}
          />
          <Input
            name='Stock'
            type='number'
            placeholder='Stock Produk...'
            label='Stock'
            value={formValues.Stock}
            error={formErrors.Stock}
            onChange={handleChange}
          />
          <Input
            name='status'
            type='checkbox'
            label='Active'
            checked
            readOnly
          />
          <button type='submit' className='btn btn-primary'>
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
