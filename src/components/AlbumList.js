import {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} from "../store";
import PhotosList from "./PhotosList";
import { FaTrash } from "react-icons/fa";

export default ({ user }) => {
  const { data, error, isLoading, refetch } = useFetchAlbumsQuery(user);

  console.log(data, error, isLoading);
  const [addAlbum, results] = useCreateAlbumMutation();

  const [deleteAlbum, resultsD] = useRemoveAlbumMutation();

  const handleCreation = () => {
    addAlbum(user.id);
  };

  const handleDeletion = (userId) => {
    deleteAlbum(userId).then(() => refetch());
  };
  const renderList = () => {
    return data?.map((album) => {
      return (
        <div
          className="accordion mb-3"
          id={`accordion-${album.id}`}
          key={album.id}
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id={`headingOne-${album.id}`}>
              <div
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${album.id}`}
                aria-expanded="false"
                aria-controls={`collapse-${album.id}`}
                style={{ cursor: "pointer" }}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleDeletion(album.id);
                  }}
                  className="btn btn-danger me-3"
                >
                  <FaTrash />
                </button>
                {album.title}
              </div>
            </h2>
            <div
              id={`collapse-${album.id}`}
              className="accordion-collapse collapse "
              aria-labelledby={`headingOne-${album.id}`}
              data-bs-parent={`#accordion-${album.id}`}
            >
              <div className="accordion-body">
                <PhotosList album={album} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="d-flex justify-content-between mb-3 text-center">
        <div>
          <h6>Albums by {user.name}</h6>
        </div>
        <div>
          <button
            type="button"
            onClick={handleCreation}
            className="btn btn-primary"
          >
            Create album
          </button>
        </div>
      </div>
      {renderList()}
    </div>
  );
};
