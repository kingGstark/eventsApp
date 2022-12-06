import {
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useRemovePhotoMutation,
} from "../store";
import { FaTrash, FaAd } from "react-icons/fa";

export default ({ album }) => {
  const { data, error, isLoading, refetch } = useFetchPhotosQuery(album);

  console.log(data, error, isLoading);
  const [addPhoto, results] = useCreatePhotoMutation();

  const [deletePhoto, resultsD] = useRemovePhotoMutation();

  const handleCreation = () => {
    addPhoto(album.id);
  };

  const handleDeletion = (userId) => {
    deletePhoto(userId).then(() => refetch());
  };
  const renderList = () => {
    return data?.map((photo) => {
      return (
        <div
          key={photo.id}
          className="col-4 mb-2 d-flex text-center justify-content-center"
        >
          <div class="card" style={{ width: "18rem" }}>
            <img src={photo.imageUrl} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{photo.title}</h5>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleDeletion(photo.id);
                }}
                className="btn btn-danger me-3"
              >
                Remove Photo
              </button>
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
          <h6>Photos in {album.title}</h6>
        </div>
        <div>
          <button
            type="button"
            onClick={handleCreation}
            className="btn btn-primary"
          >
            <FaAd />
          </button>
        </div>
      </div>
      <div className="row">{renderList()}</div>
    </div>
  );
};
