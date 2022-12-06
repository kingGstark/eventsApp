import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import LeafletMap from "../components/LeafletMap";
const Events = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="text-danger">{error}</div>;
    }
  };
  const renderInput = ({ input, label, meta }) => {
    return (
      <div className="field">
        <label className="form-label">{label}</label>
        <input className="form-control" {...input} autoComplete="false" />
        {renderError(meta)}
      </div>
    );
  };

  return (
    <form>
      <div className="container mt-5">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Give your event some basic info
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="mb-3">
                  <Field
                    name="title"
                    component={renderInput}
                    label="Enter Title"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name="description"
                    component={renderInput}
                    label="short event description"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Point your event in the map
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <LeafletMap />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                give it some cool topics
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body"></div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "you most enter a title";
  }
  if (!formValues.description) {
    errors.description = "you most enter a description";
  }
  return errors;
};
const mapStateToProps = (states, ownProps) => {
  return { events: states.events };
};

export default reduxForm({ form: "eventForm", validate })(Events);
