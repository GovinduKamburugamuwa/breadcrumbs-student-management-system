// pages/AddStudent.jsx
import StudentForm from '../components/Students/StudentForm';
import Layout from '../components/Layout/Layout';

const AddStudent = () => {
  return (
    <Layout>
      <StudentForm mode="add" />
    </Layout>
  );
};

export default AddStudent;