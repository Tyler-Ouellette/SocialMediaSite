import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgotPass } from '../../actions/auth';

const ForgotPassword = ({ forgotPass }) => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        forgotPass(email);
    };

    return (
        <Fragment>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <h2>I Forgot My Password!</h2>
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button type="submit" value="Send a Reset" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </Fragment>
    );
};

ForgotPassword.propTypes = {
    forgotPass: PropTypes.func.isRequired,
};

export default connect(null, { forgotPass })(ForgotPassword);
