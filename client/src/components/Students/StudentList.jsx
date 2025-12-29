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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Students Directory</h2>
          <p className="text-gray-600 mt-1">Manage and view all student records</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleExport('csv')}
            disabled={exporting || students.length === 0}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Download size={18} />
            CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={exporting || students.length === 0}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Download size={18} />
            PDF
          </button>
          <Link
            to="/students/add"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition shadow-md hover:shadow-lg font-medium"
          >
            + Add Student
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchBar onSearch={handleSearch} placeholder="Search by name or email..." />
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => {
              setShowDeleted(e.target.checked);
              setCurrentPage(1);
            }}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          Show Deleted Records
        </label>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-lg font-medium">No students found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student._id} className={`hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-bold text-sm">
                            {student.firstName[0]}{student.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {student.firstName} {student.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {student.phoneNumber || <span className="text-gray-400 italic">Not provided</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{student.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          student.isDeleted
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-green-100 text-green-700 border border-green-200'
                        }`}
                      >
                        {student.isDeleted ? 'Deleted' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/students/${student._id}`}
                          className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 p-2 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        {!student.isDeleted && (
                          <>
                            <Link
                              to={`/students/edit/${student._id}`}
                              className="text-blue-600 hover:text-blue-900 hover:bg-blue-100 p-2 rounded-lg transition-all"
                              title="Edit Student"
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
                              className="text-red-600 hover:text-red-900 hover:bg-red-100 p-2 rounded-lg transition-all"
                              title="Delete Student"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                        {student.isDeleted && (
                          <button
                            onClick={() => handleRestore(student._id)}
                            className="text-green-600 hover:text-green-900 hover:bg-green-100 p-2 rounded-lg transition-all"
                            title="Restore Student"
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