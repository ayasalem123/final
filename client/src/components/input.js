import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { changetreatment, addtreatment } from '../redux/slices/AdminReducer';
import { useDispatch } from 'react-redux';
function EditTreatment({ el }) {
  const [newel, setNewel] = useState(el);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    console.log(event.target.title);
    console.log(newel);
    setNewel({ ...newel, [event.target.title]: event.target.value });
  };
  const handleclick = (newel) => {
    if (newel._id) {
      dispatch(changetreatment({ newel }));
    } else {
      dispatch(addtreatment({ newel }));
      window.location.reload();
    }
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
      <FileBase
        multiple={false}
        type="file"
        onDone={({ base64 }) => {
          setNewel({ ...newel, DesktopImg: base64 });
        }}
      />

      <button
        onClick={(event) => {
          event.preventDefault();
          handleclick(newel);
        }}
      >
        submit
      </button>
    </>
  );
}

export default EditTreatment;
