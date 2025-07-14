import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const statusFilters = ["all", "active", "pending", "completed"];

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      let url = `/projects?search=${search}&page=${page}&limit=5`;
      if (statusFilter !== "all") {
        url += `&status=${statusFilter}`;
      }
      const response = await axiosInstance.get(url);
      setProjects(response.data?.projects || []);
      setTotalPages(response.data?.totalPages);
    } catch (error) {
      console.error("Error fetching projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, [page, statusFilter]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/projects/${id}`);
      // After deletion, refresh project list
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProjects();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Project Dashboard</h1>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/create-project")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle size={18} />
          Add Project
        </button>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex items-center">
            <Filter className="absolute left-3 text-gray-400" size={18} />
            <select
              aria-label="Filter projects by status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
            >
              {statusFilters?.map((filter) => (
                <option key={filter} value={filter}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </form>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : projects?.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">
            No projects found. Create your first project!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white line-clamp-1">
                  {project.title}
                </h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${project.status === "active"
                    ? "bg-green-900 text-green-300"
                    : project.status === "pending"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-gray-700 text-gray-300"
                    }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-gray-400 mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/tasks/${project._id}`)}
                  className="flex-1 min-w-[100px] whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  View Tasks
                </button>
                <button
                  onClick={() => navigate(`/edit-project/${project._id}`)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex-1 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg ${page === 1
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            disabled={page === 1}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <span className="px-4 py-2 text-gray-300">{`${page} of ${totalPages}`}</span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg ${page === totalPages
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
