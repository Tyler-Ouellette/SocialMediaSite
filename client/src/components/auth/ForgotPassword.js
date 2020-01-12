import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ForgotPassword = () => {
    return (
        <form action="/account/forgot" method="POST">
            <h2>I Forgot My Password!</h2>
            <label for="email">Email</label>
            <input type="email" name="email" />
            <button type="submit" value="Send a Reset">
                Submit
            </button>
        </form>
    );
};

// ForgotPassword.propTypes = {};

export default connect()(ForgotPassword);
