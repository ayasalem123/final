import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import axios from 'axios';
import { changetreatment, addtreatment } from '../redux/slices/AdminReducer';
import { useDispatch } from 'react-redux';
function EditTreatment({ el }) {
  const [newel, setNewel] = useState(el);
  const [formData, setFormData] = useState(new FormData());
  const dispatch = useDispatch();
  const handleChange = (event) => {
    console.log(event.target.title);
    console.log(newel);
    setNewel({ ...newel, [event.target.title]: event.target.value });
  };
  const handleclick = (formData) => {
    console.log(formData);
    if (newel.id) {
      dispatch(changetreatment(formData));
    } else {
      dispatch(addtreatment(formData));
      //window.location.reload();
    }
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [res, setRes] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(file);
    formData.append('image', file);
    formData.append('id', newel._id);
    formData.append('title', newel.title);
    formData.append('body', newel.body);
    formData.append('img', newel.img);
    formData.append('ved', newel.ved);
    console.log(newel);
  };
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">title</InputGroup.Text>
        <Form.Control
          value={newel.title}
          title="title"
          onChange={handleChange}
          placeholder={el.title}
          aria-label="title"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          as="textarea"
          value={newel.body}
          placeholder={el.body}
          aria-label="body"
          title="body"
          onChange={handleChange}
        />
      </InputGroup>

      <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">image url</InputGroup.Text>
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          title="img"
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>vedio url</InputGroup.Text>
        <Form.Control
          aria-label="Amount (to the nearest dollar)"
          title="ved"
          onChange={handleChange}
        />
      </InputGroup>

      <h2>Upload an Image</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {imageSrc && <img src={imageSrc} alt="Uploaded Image" />}
      <button
        onClick={(event) => {
          event.preventDefault();
          handleclick(formData);
        }}
      >
        submit
      </button>
    </>
  );
}

export default EditTreatment;
