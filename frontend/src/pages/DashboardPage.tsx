import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(`/projects?search=${search}&page=${page}&limit=5`);
      setProjects(response.data.projects);
      console.log(response)
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching projects");
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProjects();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 flex justify-between">
        <button
          onClick={() => navigate("/create-project")}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Project
        </button>

        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-gray-700 text-white px-4 py-2">
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 && <p>No projects found.</p>}
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
            <p className="text-sm text-gray-500 mb-2">Status: {project.status}</p>

            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/tasks/${project._id}`)}
                className="bg-purple-500 text-white px-2 py-1"
              >
                View Tasks
              </button>

              <button
                onClick={() => navigate(`/edit-project/${project._id}`)}
                className="bg-yellow-500 text-white px-2 py-1"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-300 px-4 py-2"
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="bg-gray-300 px-4 py-2"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
