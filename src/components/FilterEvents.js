import React, { useState, useEffect, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import * as _ from "lodash";
import { Checkbox } from "primereact/checkbox";

export default ({ events, exclude }) => {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const op = useRef(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  const eventsCopy = _.uniqBy(events, "icon.code");
  const [checkboxs, setCheckboxs] = useState(
    _.chain(eventsCopy)
      .map((e) => {
        return { key: e.icon.code, checked: true };
      })
      .keyBy("key")
      .mapValues("checked")
      .value()
  );

  useEffect(() => {
    const filtered = _.omitBy(checkboxs, (value, key) => value === true);
    exclude(_.keys(filtered));
  }, [checkboxs]);

  const renderButton = (rowData) => {
    return (
      <div className="field-checkbox">
        <Checkbox
          inputId="binary"
          checked={checkboxs[rowData.icon.code]}
          onChange={(e) => {
            triggerChange(rowData);
          }}
        />
      </div>
    );
  };

  const triggerChange = (rowData) => {
    setCheckboxs({
      ...checkboxs,
      [rowData.icon.code]: !checkboxs[rowData.icon.code],
    });
  };

  return (
    <div>
      <Toast ref={toast} />

      <div className="card filter-box">
        <Button
          type="button"
          icon="pi pi-eye"
          onClick={(e) => op.current.toggle(e)}
          aria-haspopup
          aria-controls="overlay_panel"
          className="select-product-button"
          style={{ width: "30px", padding: "15px", height: "30px" }}
        />

        <OverlayPanel
          ref={op}
          showCloseIcon
          id="overlay_panel"
          style={{ width: "450px" }}
          className="overlaypanel-demo"
        >
          <DataTable
            value={eventsCopy}
            selectionMode="single"
            paginator
            rows={5}
            selection={selectedProduct}
          >
            <Column header="show" body={renderButton} />
            <Column
              header="icon"
              sortable
              body={(rowData) => (
                <i className={`fa fa-${rowData.icon.code}`}></i>
              )}
            />
            <Column field="icon.code" header="type" />
          </DataTable>
        </OverlayPanel>
      </div>
    </div>
  );
};
