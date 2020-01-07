import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteEducation } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Education = ({ education, deleteEducation }) => {
    const sortedEdu = education.sort((a, b) => (a.from < b.from ? 1 : -1));
    const educations = sortedEdu.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="MMM YYYY">{moment.utc(edu.from)}</Moment> -{' '}
                {edu.to === null ? ' Current' : <Moment format="MMM YYYY">{moment.utc(edu.to)}</Moment>}
            </td>
            <td>
                <Link to={{ pathname: '/edit-education', state: { key: edu._id } }} className="btn btn-primary">
                    Edit
                </Link>
                <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years Attended</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
