import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
      .get('/colors')
      .then(res => {
        setColors(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    fetchColorService()
      .put(`/colors/${editColor.id}`, editColor)
      .then(res => {
        let updatedColors = colors.map(item => {
          if (item.id === res.data.id) {
            item = res.data;
          }
          return item;
        })
        setColors(updatedColors);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteColor = (colorToDelete) => {
    fetchColorService()
      .delete(`/colors/${colorToDelete.id}`)
      .then(res => {
        setColors(colors.filter((item) => item.id !== colorToDelete.id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
