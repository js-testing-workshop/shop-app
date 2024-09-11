import React, { useState, useEffect, useRef } from 'react';
import { signin } from '../../api/auth';
import './login-form.css';
import userStore from '../../storage/user';
import { useAlert } from '../alert/useAlert';


interface LoginFormProps {
  onSuccessCallback?: () => void;
  onErrorCallback?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccessCallback = () => {return;},
  onErrorCallback = () => {return;},
}) => {
  const { showAlert } = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);


  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      setEmail(emailRef.current.value);
      setPassword(passwordRef.current.value);
    }
  }, []);

  const showValidationErrors = () => {
    if (formRef.current) {
      formRef.current.classList.add('was-validated');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!formRef.current?.checkValidity()) {
      showValidationErrors();
      return;
    }
  
    const formData = {
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    };
  
    setIsLoading(true);
    signin({ body: JSON.stringify(formData) })
      .then(() => {
        showAlert('success', 'Login success');
        userStore.login();
        onSuccessCallback();
      })
      .catch(() => {
        showAlert('danger', 'Login error');
        if (formRef.current) {
          formRef.current.classList.remove('was-validated');
        }
        setIsInvalid(true);
        onErrorCallback();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-form-wrapper">
      <form
        ref={formRef}
        className="login-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset disabled={isLoading}>
          <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    name="email"
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-cy="email"
                  />
                  <div className="invalid-feedback">Please fill email</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-cy="password"
                  />
                  <div className="invalid-feedback">Please fill password</div>
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${isInvalid ? 'is-invalid' : ''}`}
                  data-cy="login-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status">Loading...</span>
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
                <div className="invalid-feedback" data-cy="invalid-credentials">Invalid Credentials</div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;