import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEducation, getCurrentProfile } from '../../actions/profile';

const EditEducation = ({ editEducation, history, profile: { profile, loading }, getCurrentProfile }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    useEffect(() => {
        getCurrentProfile();
        try {
            profile.education.forEach(edu => {
                if (edu._id === history.location.state.key) {
                    setFormData({
                        school: loading || !edu.school ? '' : edu.school,
                        degree: loading || !edu.degree ? '' : edu.degree,
                        fieldofstudy: loading || !edu.fieldofstudy ? '' : edu.fieldofstudy,
                        from: loading || !edu.from ? '' : edu.from.split('T')[0],
                        to: loading || !edu.to ? '' : edu.to.split('T')[0],
                        current: loading || !edu.current ? '' : edu.current,
                        description: loading || !edu.description ? '' : edu.description,
                    });
                }
            });
        } catch (err) {
            console.log(err.msg);
        }
    }, [loading, getCurrentProfile]);

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();
                    editEducation(formData, history, history.location.state.key);
                }}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={() => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }}
                        />{' '}
                        Current School
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        wrap="hard"
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

EditEducation.propTypes = {
    editEducation: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { editEducation, getCurrentProfile })(withRouter(EditEducation));
