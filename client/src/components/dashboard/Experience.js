import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteExperience } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Experience = ({ experience, deleteExperience }) => {
    const sortedExp = experience.sort((a, b) => (a.from > b.from ? 1 : -1));
    const experiences = sortedExp
        .map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td>
                    <Moment format="MMM YYYY">{moment.utc(exp.from)}</Moment> -{' '}
                    {exp.to === null ? ' Current' : <Moment format="MMM YYYY">{moment.utc(exp.to)}</Moment>}
                </td>
                <td>
                    <Link to={{ pathname: '/edit-experience', state: { key: exp._id } }} className="btn btn-primary">
                        Edit
                    </Link>
                    <button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>
                        Delete
                    </button>
                </td>
            </tr>
        ))
        .sort((a, b) => (a.to < b.to ? 1 : -1));
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Employment</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
