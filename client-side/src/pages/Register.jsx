import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../features/users/usersSlice";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Nama tidak boleh kosong"),
    username: Yup.string().required("Username tidak boleh kosong"),
    email: Yup.string().email("Format email salah").required("Email tidak boleh kosong"),
    password: Yup.string().min(3, "Password haris lebih dari 3 karakter").required("Password tidak boleh kosong"),
  });
  return (
    <div className="bg-[#0d1117] min-h-screen py-9">
      <Formik
        initialValues={{ email: "", password: "", name: "", username: "" }}
        validationSchema={LoginSchema}
        onSubmit={(value) => {
          // alert("testing");
          dispatch(registerUser(value));
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <div className="w-1/3 mx-auto bg-white p-6 rounded-md">
              <p className="text-xl font-bold text-center mb-6">Page Register</p>
              <Form>
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" className="border-2" />
                  <ErrorMessage component="div" name="name" style={{ color: "red" }} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="username">Username</label>
                  <Field type="text" name="username" className="border-2" />
                  <ErrorMessage component="div" name="username" style={{ color: "red" }} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field type="text" name="email" className="border-2" />
                  <ErrorMessage component="div" name="email" style={{ color: "red" }} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" className="border-2" />
                  <ErrorMessage component="div" name="password" style={{ color: "red" }} />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-3 rounded-md mt-10">
                  Submit
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
