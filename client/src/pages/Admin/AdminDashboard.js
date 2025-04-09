import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid dashboard p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex justify-content-center">
            <div className="card admin-card shadow-lg border-0 rounded-3 mt-5">
              <div className="card-body text-center">
                <h2 className="mb-4 text-primary fw-bold">Admin Dashboard</h2>
                <hr />
                <h4><strong>Name:</strong> {auth?.user?.name}</h4>
                <h4><strong>Email:</strong> {auth?.user?.email}</h4>
                <h4><strong>Contact:</strong> {auth?.user?.phone}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
