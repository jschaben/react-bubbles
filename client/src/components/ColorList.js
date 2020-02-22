import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setcolorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit )
    .then(res => {
      console.log(res)
      console.log(colorToEdit)
      updateColors([...colors.filter(color => color.id !== colorToEdit.id), res.data]);
      setEditing(false);
    })
    .catch(err => {
      console.log('edit failed', err)
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res)
        updateColors(colors.filter(color => color.id !== res.data))
      })
      .catch(err => {
        console.log('could not delete' ,err)
      })
  };
  const addColor = event => {
    event.preventDefault();

    console.log("Adding color", colorToAdd);

    axiosWithAuth()
      .post("http://localhost:5000/api/colors", colorToAdd)
      .then(response => {
        console.log("Color added:", response);

        updateColors([...colors, colorToAdd]);
      })
      .catch(error => {
        console.log("Couldn't add color:", error);
      });
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      
      <div className="addColorDiv">
        <form name="addColor">
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setcolorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setcolorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button onClick={addColor}>add</button>
          </div>
        </form>
      </div>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
