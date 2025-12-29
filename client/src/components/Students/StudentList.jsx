import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import SearchBar from '../Common/SearchBar';
import Pagination from '../Common/Pagination';
import Loader from '../Common/Loader';
import DeleteConfirmation from '../Students/DeleteConfirmation';
import { Edit, Trash2, Eye, Download, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [currentPage, searchTerm, showDeleted]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/students', {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm,
          showDeleted,
        },
      });
      setStudents(data.data);
      setTotalPages(data.pagination.pages);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch students');
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/students/${deleteModal.id}`);
      toast.success('Student deleted successfully');
      setDeleteModal({ show: false, id: null, name: '' });
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete student');
    }
  };

  const handleRestore = async (id) => {
    try {
      await API.put(`/students/${id}/restore`);
      toast.success('Student restored successfully');
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to restore student');
    }
  };

  const handleExport = async (format) => {
    try {
      setExporting(true);
      const response = await API.get(`/students/export/${format}`, {
        responseType: 'blob',
        params: { showDeleted },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `students.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Students exported to ${format.toUpperCase()} successfully`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to export students');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('csv')}
            disabled={exporting || students.length === 0}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={exporting || students.length === 0}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            <Download size={18} />
            Export PDF
          </button>
          <Link
            to="/students/add"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            Add Student
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <SearchBar onSearch={handleSearch} placeholder="Search by name or email..." />
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => {
              setShowDeleted(e.target.checked);
              setCurrentPage(1);
            }}
            className="rounded"
          />
          Show Deleted
        </label>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {student.phoneNumber || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{student.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.isDeleted
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {student.isDeleted ? 'Deleted' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/students/${student._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        {!student.isDeleted && (
                          <>
                            <Link
                              to={`/students/edit/${student._id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() =>
                                setDeleteModal({
                                  show: true,
                                  id: student._id,
                                  name: `${student.firstName} ${student.lastName}`,
                                })
                              }
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                        {student.isDeleted && (
                          <button
                            onClick={() => handleRestore(student._id)}
                            className="text-green-600 hover:text-green-900"
                            title="Restore"
                          >
                            <RotateCcw size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DeleteConfirmation
        show={deleteModal.show}
        studentName={deleteModal.name}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ show: false, id: null, name: '' })}
      />
    </div>
  );
};

export default StudentList;