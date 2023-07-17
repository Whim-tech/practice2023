import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <div className="info">
                    <strong>User</strong> - U: user P: user<br />
                    <strong>Admin</strong> - U: admin P: admin<br />
                    <strong>Student</strong> - U: student P: student<br />
                    <strong>Professor</strong> - U: professor P: professor<br />
                </div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Имя пользователя неверное'),
                        password: Yup.string().required('Пароль не верный')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={(errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div"/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={(errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div"/>
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting}>Login</button>

                            </div>
                            {status &&
                                <div>{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export { LoginPage }; 