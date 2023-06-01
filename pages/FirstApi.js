import React, { useEffect, useState } from "react";

const ApiData = () => {
  const [data, setData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(-1);

  useEffect(() => {
    const storedData = localStorage.getItem("apiData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.publicapis.org/entries");
      const { entries } = await response.json();
      setData(entries);
      localStorage.setItem("apiData", JSON.stringify(entries));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    setEditRowIndex(index);
  };

  const handleSave = (index) => {
    setEditRowIndex(-1);
    localStorage.setItem("apiData", JSON.stringify(data));
  };

  const handleInputChange = (index, key, value) => {
    const updatedData = [...data];
    updatedData[index][key] = value;
    setData(updatedData);
  };

  return (
    <div className="container">
      <h1 className="text-center text-primary">API Data</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Auth</th>
            <th>HTTPS</th>
            <th>CORS</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={entry.API}
                    onChange={(e) =>
                      handleInputChange(index, "API", e.target.value)
                    }
                  />
                ) : (
                  entry.API
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={entry.Description}
                    onChange={(e) =>
                      handleInputChange(index, "Description", e.target.value)
                    }
                  />
                ) : (
                  entry.Description
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={entry.Category}
                    onChange={(e) =>
                      handleInputChange(index, "Category", e.target.value)
                    }
                  />
                ) : (
                  entry.Category
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={entry.Auth}
                    onChange={(e) =>
                      handleInputChange(index, "Auth", e.target.value)
                    }
                  />
                ) : (
                  entry.Auth
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="checkbox"
                    checked={entry.HTTPS}
                    onChange={(e) =>
                      handleInputChange(index, "HTTPS", e.target.checked)
                    }
                  />
                ) : entry.HTTPS ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={entry.Cors}
                    onChange={(e) =>
                      handleInputChange(index, "Cors", e.target.value)
                    }
                  />
                ) : (
                  entry.Cors
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiData;
