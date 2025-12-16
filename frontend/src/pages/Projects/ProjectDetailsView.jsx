import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetails, addProjectComment } from "../../services/api/ProjectsApi";
import { useAuth } from "../../auth/useAuth";

const ProjectDetailsView = () => {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const project = await getProjectDetails(projectId);
      setProject(project);
      setLoading(false);
    })();
  }, [projectId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const { content } = e.target;

    const comment = await addProjectComment(projectId, { content: content.value });

    setProject({
      ...project,
      comments: [
        ...project.comments,
        {
          content: comment.content,
          userId: user?.sub,
          createdAt: new Date().toISOString(),
        },
      ],
    });

    setComment("");
  };

  if (loading) {
    return <div className="p-6 text-gray-400">Loading ..</div>;
  }

  if (!project) {
    return <div className="p-6 text-red-400">Project not found</div>;
  }

  const {
    name,
    description,
    status,
    createdAt,
    updatedAt,
    comments,
  } = project || {}
  

  return (
    <div className="p-6 space-y-6">
      {/* Project Info */}
      <button
        onClick={() => navigate("/projects")}
        className="text-sm text-slate-400 hover:text-white"
      >
        ← Back to projects
      </button>
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <h1 className="text-2xl font-semibold text-white">
          {name}
        </h1>
        <p className="mt-2 text-slate-400">{description}</p>

        <div className="mt-4 flex gap-6 text-sm text-slate-400">
          <span>
            Status:{" "}
            <span className="text-white font-medium">
              {status}
            </span>
          </span>
          <span>
            Created:{" "}
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <span>
            Updated:{" "}
            {new Date(updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Comments */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Comments
        </h2>

        <div className="space-y-4">
          {comments && comments.length > 0 ? (
            comments.map(({ id, content, user, createdAt}) => (
              <div
                key={id}
                className="rounded-lg bg-slate-800 p-4"
              >
                <p className="text-slate-200">{content}</p>
                <div className="mt-2 text-xs text-slate-400">
                  {user?.name ?? "User"} •{" "}
                  {new Date(createdAt).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">
              No comments yet.
            </p>
          )}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleAddComment} className="mt-6">
          <textarea
            name="content"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Write a comment..."
            className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectDetailsView;