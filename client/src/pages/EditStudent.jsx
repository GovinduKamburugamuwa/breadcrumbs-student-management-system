// pages/EditStudent.jsx
import StudentForm from '../components/Students/StudentForm';
import Layout from '../components/Layout/Layout';

const EditStudent = () => {
  return (
    <Layout>
      <StudentForm mode="edit" />
    </Layout>
  );
};

export default EditStudent;