import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { composePage } from '../../store/pages';
import { useSelector } from 'react-redux';

import './MakePage.css'


const MakePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [postImage, setPostImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      imageUrl: postImage,
      items: [{ name: '', url: '' }],
    });
  
    const handleSubmit = async e => {
      e.preventDefault();
        
      debugger
      const items = formData.items.map(item => ({
        name: item.name,
        url: item.url
      }));
  
      const itemGroups = [
        {
          groupName: '',
          items: items
        }
      ];
  
      debugger
      const pageData = {
        author: currentUser._id,
        // book: '',
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        itemGroups: itemGroups,
        likes: ""
      };
      debugger
  
      try {
        await dispatch(composePage(pageData));
        setFormData({
          title: '',
          description: '',
          postImage: '',
          items: [{ name: '', url: '' }],
        });
      } catch (err) {
        setErrors(err.response.data.errors);
      }
    };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleItemChange = (e, groupIdx, itemKey) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const items = [...prevFormData.items];
      const itemIdx = groupIdx;
      items[itemIdx] = {
        ...items[itemIdx],
        [itemKey]: value,
      };
      return {
        ...prevFormData,
        items,
      };
    });
  };

  const handleAddItem = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      items: [
        ...prevFormData.items,
        { name: '', url: '' },
      ],
    }));
  };

  const handleRemoveItem = idx => {
    setFormData(prevFormData => ({
      ...prevFormData,
      items: prevFormData.items.filter((item, i) => i !== idx),
    }));
  };
  
  const updateFile = e => setPostImage(e.target.files[0]);


return (
    <div id="makepageform">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="imageUrl">Image URL</label>
        <input id="postImage" type="file" accept=".jpg, .jpeg, .png" onChange={updateFile} />
        <br />

        {formData.items.map((item, idx) => (
          <div key={idx}>
            <label htmlFor={`itemName${idx}`}>Item Name</label>
            <input
              type="text"
              id={`itemName${idx}`}
              name={`items[${idx}][name]`}
              value={item.name}
              onChange={(e) => handleItemChange(e, idx, "name")}
            />

            <label htmlFor={`itemUrl${idx}`}>Item URL</label>
            <input
              type="text"
              id={`itemUrl${idx}`}
              name={`items[${idx}][url]`}
              value={item.url}
              onChange={(e) => handleItemChange(e, idx, "url")}
            />
            <br></br>
            <br></br>
            <div>
              <button id="makebutton" type="button" onClick={() => handleRemoveItem(idx)}>
                Remove Item
              </button>
              <br></br>
              <button id="makebutton" type="button" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
          </div>
        ))}
        <br></br>

        <button type="submit">Create Page</button>
      </form>

      <div className="error-message">
        {errors.title && <span>{errors.title}</span>}
        {errors.description && <span>{errors.description}</span>}
      </div>
    </div>
  );
}

export default MakePage;