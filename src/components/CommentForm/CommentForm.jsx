import { useState } from 'react';



const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='author-input'>Your Name:</label>
      <textarea
        required
        type='text'
        name='author'
        id='author-input'
        value={formData.author}
        onChange={handleChange}
      />
      <label htmlFor='rating-input'>Your Rating:</label>
      <textarea
        required
        type='text'
        name='rating'
        id='rating-input'
        value={formData.rating}
        onChange={handleChange}
      />
      <label htmlFor='text-input'>Your Comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
