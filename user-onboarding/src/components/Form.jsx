import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


const NewUser = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="users-form">
      <h1>User registration Form</h1>
      <Form>
        <Field type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <Field type="text" name="password" placeholder="password" />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}

        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termsofservice"
            checked={values.termsofservice}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>

      {users.map(user => (
        <p key={user.id}>User Name: {user.name}  |  User E-mail: {user.email}   |  Date created: {user.createdAt}</p>
      ))}
    </div>
  );
};


const Users = withFormik({
  mapPropsToValues({ name, email, password, termsofservice }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      termsofservice: termsofservice || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    termsofservice: Yup.bool()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(data => {
        setStatus(data.data);
      })
      .catch(err => console.log(err.response));
  }
})(NewUser);

export default Users;
