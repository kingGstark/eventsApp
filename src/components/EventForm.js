import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCreateEventMutation } from "../store";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { useMap } from "react-leaflet";
import { useMapEvent } from "react-leaflet/hooks";
import { ListBox } from "primereact/listbox";
import { Calendar } from "primereact/calendar";

export default (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(props);
  const [addEvent, result] = useCreateEventMutation();
  const map = useMap();

  const icons = [
    {
      name: "drink a coffee",
      code: "coffee",
      color: "blue",
      colorCode: "#36a1d1",
    },
    {
      name: "talking",
      code: "commenting",
      color: "green",
      colorCode: "#6ca624",
    },
    {
      name: "social group reunion",
      code: "users",
      color: "darkblue",
      colorCode: "#225f99",
    },
    {
      name: "go out for drinks",
      code: "glass",
      color: "lightred",
      colorCode: "#ea7d81",
    },
  ];

  const iconTemplate = (option) => {
    return (
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "20px" }}
      >
        <div
          className="d-flex align-items-center p-3 "
          style={{
            height: "100%",
            background: option.colorCode,
            borderRadius: "15px",
            color: "white",
          }}
        >
          <i className={`fa fa-${option.code}`}></i>
        </div>
        <div>{option.name}</div>
      </div>
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: null,
      icon: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.description) {
        errors.description = "Password is required.";
      }
      if (!data.icon) {
        errors.description = "icon is required.";
      }
      if (!data.date) {
        errors.description = "date is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);

      const event = data;
      data.position = props.position;
      addEvent(event).then(() => setShowMessage(true));
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => {
          setShowMessage(false);
          props.markers?.clearLayers();
          map.closePopup();
        }}
      />
    </div>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => {
          setShowMessage(false);
        }}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "60px": "70vw" }}
        style={{ width: "30vw" }}
      >
        <div className="dialog-style">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5 className="my-3">Event Created Successfully</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your event is now visible to the public, sit and relax while the
            event start getting participants
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card form-card">
          <h5 className="text-center text-white">Create Event </h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="row">
              <div className="col">
                <div className="field">
                  <span className="p-label text-white fw-semibold">
                    <label
                      htmlFor="name"
                      className={classNames({
                        "p-error": isFormFieldValid("name"),
                      })}
                    >
                      Name*
                    </label>
                  </span>
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />

                  {getFormErrorMessage("name")}
                </div>
              </div>
              <div className="col">
                <div className="field">
                  <span className="p-label fw-semibold text-white">
                    <label
                      htmlFor="date"
                      className={classNames({
                        "p-error": isFormFieldValid("date"),
                      })}
                    >
                      Date*
                    </label>
                  </span>
                  <Calendar
                    id="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    dateFormat="dd/mm/yy"
                    mask="99/99/9999"
                    showIcon
                    className={classNames({
                      "p-invalid": isFormFieldValid("date"),
                    })}
                  />
                  {getFormErrorMessage("date")}
                </div>
              </div>

              <div className="field">
                <span className="p-label fw-semibold text-white">
                  <label
                    htmlFor="description"
                    className={classNames({
                      "p-error": isFormFieldValid("description"),
                    })}
                  >
                    Description*
                  </label>
                </span>
                <InputTextarea
                  rows={5}
                  cols={30}
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  autoFocus
                  className={classNames({
                    "p-invalid": isFormFieldValid("description"),
                  })}
                />

                {getFormErrorMessage("description")}
              </div>
            </div>
            <div className="field fw-semibold text-white">
              <label
                htmlFor="icon"
                className={classNames({
                  "p-error": isFormFieldValid("icon"),
                })}
              >
                Topic*
              </label>
              <ListBox
                name="icon"
                value={formik.values.icon}
                options={icons}
                onChange={formik.handleChange}
                optionLabel="name"
                itemTemplate={iconTemplate}
                style={{ width: "100%" }}
                listStyle={{ maxHeight: "250px" }}
              />
              {getFormErrorMessage("icon")}
            </div>
            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};
