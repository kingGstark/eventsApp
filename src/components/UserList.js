import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { removeUser } from "../store/thunks/deleteUser";
import AlbumList from "./AlbumList";
import { FaTrash } from "react-icons/fa";
export default () => {
  const dispatch = useDispatch();

  const { isLoading, error, data } = useSelector((states) => {
    return states.users;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAddUser = () => {
    dispatch(addUser());
  };

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };
  const renderList = () => {
    return data.map((user) => {
      return (
        <div
          className="accordion mb-3"
          id={`accordion-${user.id}-${user.name.replace(/\s+/g, "")}`}
          key={user.id}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={`headingOne-${user.id}-${user.name.replace(/\s+/g, "")}`}
            >
              <div
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${user.id}-${user.name.replace(
                  /\s+/g,
                  ""
                )}`}
                aria-expanded="false"
                aria-controls={`collapse-${user.id}-${user.name.replace(
                  /\s+/g,
                  ""
                )}`}
                style={{ cursor: "pointer" }}
              >
                <button
                  type="button"
                  onClick={() => handleRemoveUser(user.id)}
                  className="btn btn-danger me-3"
                >
                  <FaTrash />
                </button>
                {user.name}
              </div>
            </h2>
            <div
              id={`collapse-${user.id}-${user.name.replace(/\s+/g, "")}`}
              className="accordion-collapse  collapse"
              aria-labelledby={`headingOne-${user.id}-${user.name.replace(
                /\s+/g,
                ""
              )}`}
              data-bs-parent={`#accordion-${user.id}-${user.name.replace(
                /\s+/g,
                ""
              )}`}
            >
              <div className="accordion-body">
                <AlbumList user={user} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  if (isLoading) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3 text-center">
        <div>
          <h3>List of Users</h3>
        </div>
        <div>
          <button
            type="button"
            onClick={handleAddUser}
            className="btn btn-primary"
          >
            Create user
          </button>
        </div>
      </div>
      {renderList()}
    </div>
  );
};
