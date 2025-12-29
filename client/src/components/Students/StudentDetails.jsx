import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../Common/Loader';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, User } from 'lucide-react';
import DeleteConfirmation from '../Students/DeleteConfirmation';
import toast from 'react-hot-toast';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false });

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const { data } = await API.get(`/students/${id}`);
      setStudent(data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch student details');
      navigate('/students');
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/students/${id}`);
      toast.success('Student deleted successfully');
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete student');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!student) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/students')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
        >
          <ArrowLeft size={20} />
          Back to Students
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {student.firstName} {student.lastName}
              </h1>
              <p className="text-indigo-100 flex items-center gap-2">
                <Mail size={16} />
                {student.email}
              </p>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  student.isDeleted
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {student.isDeleted ? 'Deleted' : 'Active'}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Phone size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.phoneNumber || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 p-3 rounded-full">
                <User size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="text-lg font-semibold text-gray-800">{student.gender}</p>
              </div>
            </div>

            {/* Birthdate */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Calendar size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Birthdate</p>
                <p className="text-lg font-semibold text-gray-800">
                  {student.birthdate
                    ? new Date(student.birthdate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Not provided'}
                </p>
              </div>
            </div>

            {/* Age */}
            {student.birthdate && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Calendar size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {Math.floor(
                      (new Date() - new Date(student.birthdate)) /
                        (365.25 * 24 * 60 * 60 * 1000)
                    )}{' '}
                    years
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="text-gray-800">
                  {new Date(student.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-gray-800">
                  {new Date(student.updatedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!student.isDeleted && (
            <div className="mt-8 flex gap-4">
              <Link
                to={`/students/edit/${student._id}`}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
              >
                <Edit size={18} />
                Edit Student
              </Link>
              <button
                onClick={() => setDeleteModal({ show: true })}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
              >
                <Trash2 size={18} />
                Delete Student
              </button>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmation
        show={deleteModal.show}
        studentName={`${student.firstName} ${student.lastName}`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ show: false })}
      />
    </div>
  );
};

export default StudentDetails;