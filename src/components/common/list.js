import React from "react";

const List = ({ items, itemsTitle }) => {
  if (items === null) return null;

  // function formatBookingDate(str) {
  //   let formattedDate = str.replace(/([A-Z])/g, " $1").trim();
  //   formattedDate = formattedDate.replace(/([a-z])([A-Z])/g, "$1 $2");
  //   formattedDate = formattedDate.replace(/^./, formattedDate[0].toUpperCase());

  //   return formattedDate;
  // }

  const formatFieldName = (fieldName) => {
    return fieldName.replace(/([A-Z])/g, " $1").trim();
  };

  const formatTime = (value) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleString();
  };

  const shouldSkipEntry = (field) => {
    return (
      /Url|imageUrl/i.test(field) ||
      field === "id" ||
      field.includes("id") ||
      typeof field === "object" ||
      field === null ||
      field === undefined ||
      field.includes("Id") ||
      Array.isArray(items[field])
    );
  };

  return (
    <div className="mt-3">
      {itemsTitle && <h5 className="text-capitalize fs-4">{itemsTitle}</h5>}
      <ul className="list-group">
        {Object.entries(items).map(([field, value]) => {
          if (shouldSkipEntry(field)) {
            return null;
          }

          if (field === "dateofbooking" || field === "date") {
            value = formatTime(value);
          }

          return (
            value && (
              <li className="list-group-item text-capitalize" key={field}>
                {formatFieldName(field)}
                <span className="opacity-75 d-block ms-2">
                  {value === true ? "true" : value}
                </span>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default List;
