import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


const CreateUser = () => {
  const [responseError, setResponseError] = useState(null);
  const [requestError, setRequestError] = useState(null);

  return (
    <Formik
      initialValues={{
        name: '',
        last_name: '',
        pesel: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(30, "The value in this field must be less than or equal 30")
          .min(3, "The value in this field must be greater than or equal 3")
          .required("This field is required.")
          .matches(/^[\s\p{L}]+$/u, "This field can contain only letters."),
        last_name: Yup.string()
          .max(30, "The value in this field must be less than or equal 150")
          .min(3, "The value in this field must be greater than or equal 3")
          .required("This field is required.")
          .matches(/^[\s\p{L}]+$/u, "This field can contain only letters."),
        pesel: Yup.string()
          .max(11, "The value in this field must be less than or equal 11")
          .min(11, "The value in this field must be greater than or equal 11")
          .required("This field is required."),
      }
    )}
    onSubmit={async (values) => {
      try {
        await axios.post(
          "http://127.0.0.1:8005/api-auth/users/",
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      } catch (error) {
        if (error.response) {
          setResponseError(error.response.data)
        }
        else if (error.request) {
          setRequestError(error.request)
        }
      }
    }}
    >
      <Form>
        <label htmlFor="name">First Name</label>
        <Field name="name" type="text" />
        <div className="error">
          <ErrorMessage name="name" />
          {responseError ? responseError.name: null}
        </div>
        <label htmlFor="last_name">Last Name</label>
        <Field name="last_name" type="text" />
        <div className="error">
          <ErrorMessage name="last_name" />
          {responseError ? responseError.last_name: null}
        </div>
        <label htmlFor="pesel">Pesel</label>
        <Field name="pesel" type="text" />
        <div className="error">
            <ErrorMessage name="pesel" />
            {responseError ? responseError.pesel: null}
        </div>
        <div className="error">
          {requestError ? requestError: null}
        </div>
        <button type="submit">Create</button>
      </Form>
    </Formik>
  );
}


const DeleteUser = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getMethod = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8005/api-auth/users/",
        );
        setUsers(response.data)
      } catch (error) {
        alert(JSON.stringify(error))
      }
    }
    if (!users){
      getMethod();
    }
  })
  return (
    <Formik
    initialValues={{
      pesel: ''
    }}
    onSubmit= {
      async (values) => {
        try {
          for (let user of users) {
            if (user.pesel === values.pesel) {
              await axios.delete(
                "http://localhost:8005/api-auth/users/" + user.id + '/',
                JSON.stringify(values),
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
            }
          }
        } catch (error) {
          alert(JSON.stringify(error))
        }
      }
    }
    >
      <Form>
        <label htmlFor="pesel">Pesel</label>
        <Field name="pesel" type="text" />
        <button type="submit">Delete</button>
      </Form>
    </Formik>
  )
}


const Users = () => {
  return (
    <div>
      <CreateUser/>
      <br/>
      <br/>
      <br/>
      <DeleteUser/>
    </div>
  )
  
}

export default Users;


