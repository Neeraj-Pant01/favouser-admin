import { useEffect, useState } from "react";
import { getUserFeedbacks } from "../utils/users";
import { useSelector } from "react-redux";
import { FiMail, FiPhone, FiUser, FiMessageSquare, FiClock, FiSearch, FiFilter } from "react-icons/fi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface Feedback {
  _id: string;
  fullName: string;
  email: string;
  message: string;
  subject: string;
  phone_Number: string;
  createdAt: string;
  status?: 'pending' | 'resolved';
}

const Feedback = () => {
  const token = useSelector((state: any) => state.user.loggedUser.token);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "resolved">("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);


  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await getUserFeedbacks(token) as {
          status: number,
          data: any[]
        };
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    getFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch =
      feedback.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || feedback.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const markAsResolved = (id: string) => {
    setFeedbacks(feedbacks.map(feedback =>
      feedback._id === id ? { ...feedback, status: "resolved" } : feedback
    ));
    setSelectedFeedback(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Feedback</h1>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search feedbacks..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <div className="min-w-[600px] grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
            <div className="col-span-3 md:col-span-2">Customer</div>
            <div className="col-span-5 md:col-span-3">Subject</div>
            <div className="hidden md:block md:col-span-4">Message Preview</div>
            <div className="col-span-4 md:col-span-2">Date</div>
            <div className="col-span-3 md:col-span-1">Status</div>
          </div>
          {filteredFeedbacks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No feedbacks found matching your criteria
            </div>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="min-w-[600px] grid grid-cols-12 p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => setSelectedFeedback(feedback)}
              >
                <div className="col-span-3 md:col-span-2 flex items-center min-w-0">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 shrink-0">
                    <FiUser className="text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{feedback.fullName}</div>
                    <div className="text-sm text-gray-500 truncate">{feedback.email}</div>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-3 flex items-center min-w-0">
                  <div className="bg-purple-100 p-2 rounded-full mr-3 shrink-0">
                    <FiMail className="text-purple-600" />
                  </div>
                  <div className="font-medium truncate">{feedback.subject}</div>
                </div>
                <div className="hidden md:flex md:col-span-4 items-center min-w-0">
                  <div className="bg-green-100 p-2 rounded-full mr-3 shrink-0">
                    <FiMessageSquare className="text-green-600" />
                  </div>
                  <div className="text-gray-600 truncate">{feedback.message.substring(0, 50)}...</div>
                </div>
                <div className="col-span-4 md:col-span-2 flex items-center text-sm text-gray-500 min-w-0">
                  <FiClock className="mr-2 shrink-0" />
                  <span className="truncate">{formatDate(feedback.createdAt)}</span>
                </div>
                <div className="col-span-3 md:col-span-1 flex items-center min-w-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${feedback.status === "resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {"View"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Feedback Detail Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Feedback Details</h2>
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FiUser className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Customer</h3>
                      <p className="text-gray-900">{selectedFeedback.fullName}</p>
                      <p className="text-gray-600">{selectedFeedback.email}</p>
                      <p className="text-gray-600 mt-1 flex items-center">
                        <FiPhone className="mr-2" size={14} />
                        {selectedFeedback.phone_Number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FiMail className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Subject</h3>
                      <p className="text-gray-900">{selectedFeedback.subject}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FiMessageSquare className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Message</h3>
                      <p className="text-gray-900 whitespace-pre-line">{selectedFeedback.message}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <FiClock className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Received</h3>
                      <p className="text-gray-900">{formatDate(selectedFeedback.createdAt)}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                    {selectedFeedback.status === "pending" && (
                      <button
                        onClick={() => markAsResolved(selectedFeedback._id)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <AiOutlineCheck className="mr-2" />
                        Mark as Resolved
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedFeedback(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;