import React, { useEffect, useState } from "react";

const UniversitiesData = () => {
  const [data, setData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(-1);

  useEffect(() => {
    const storedData = localStorage.getItem("universitiesData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://universities.hipolabs.com/search?country=pakistan"
      );
      const universities = await response.json();
      setData(universities);
      localStorage.setItem("universitiesData", JSON.stringify(universities));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    setEditRowIndex(index);
  };

  const handleSave = (index) => {
    setEditRowIndex(-1);
    localStorage.setItem("universitiesData", JSON.stringify(data));
  };

  const handleInputChange = (index, key, value) => {
    const updatedData = [...data];
    updatedData[index][key] = value;
    setData(updatedData);
  };

  return (
    <div className="container">
      <h1 className="text-center text-primary">Universities Data</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Web Pages</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((university, index) => (
            <tr key={index}>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={university.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                ) : (
                  university.name
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={university.country}
                    onChange={(e) =>
                      handleInputChange(index, "country", e.target.value)
                    }
                  />
                ) : (
                  university.country
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={university.web_pages.join(", ")}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "web_pages",
                        e.target.value.split(", ")
                      )
                    }
                  />
                ) : (
                  university.web_pages.join(", ")
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

export default UniversitiesData;
