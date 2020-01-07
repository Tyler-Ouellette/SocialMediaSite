import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExperience, getCurrentProfile } from '../../actions/profile';

const EditExperience = ({ editExperience, history, profile: { profile, loading }, getCurrentProfile }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    useEffect(() => {
        getCurrentProfile();

        try {
            profile.experience.forEach(exp => {
                if (exp._id === history.location.state.key) {
                    setFormData({
                        title: loading || !exp.title ? '' : exp.title,
                        company: loading || !exp.company ? '' : exp.company,
                        location: loading || !exp.location ? '' : exp.location,
                        from: loading || !exp.from ? '' : exp.from.split('T')[0],
                        to: loading || !exp.to ? '' : exp.to.split('T')[0],
                        current: loading || !exp.current ? '' : exp.current,
                        description: loading || !exp.description ? '' : exp.description,
                    });
                }
            });
        } catch (err) {
            console.log(err.msg);
        }
    }, [loading, getCurrentProfile]);

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">Edit Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the
                past
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();
                    editExperience(formData, history, history.location.state.key);
                }}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
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
                        Current Job
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
                        placeholder="Job Description"
                        value={description}
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

EditExperience.propTypes = {
    editExperience: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { editExperience, getCurrentProfile })(withRouter(EditExperience));
