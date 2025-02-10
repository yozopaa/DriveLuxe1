// TestimonialCard.jsx
import React, { useState, useEffect } from 'react';
import Heading from '../common/Heading';
import './testimonial.css';

const TestimonialCard = () => {
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState({
       name: '',
       comment: ''
   });

   useEffect(() => {
       fetchComments();
   }, []);

   const fetchComments = async () => {
       try {
           const response = await fetch('http://localhost:5000/api/comments');
           const data = await response.json();
           setComments(data);
       } catch (error) {
           console.error('Error fetching comments:', error);
       }
   };

   const handleCommentSubmit = async (e) => {
       e.preventDefault();
       try {
           const response = await fetch('http://localhost:5000/api/comments', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(newComment)
           });
           if (response.ok) {
               setNewComment({ name: '', comment: '' });
               fetchComments();
           }
       } catch (error) {
           console.error('Error submitting comment:', error);
       }
   };

   return (
       <>
           <div className="testimonial container">
               <Heading title='TÉMOIGNAGES' subtitle='Ce que nos clients disent !' />
               
               <form onSubmit={handleCommentSubmit} className="comment-form">
                   <input
                       type="text"
                       placeholder="Votre nom"
                       value={newComment.name}
                       onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                       required
                   />
                   <textarea
                       placeholder="Votre commentaire"
                       value={newComment.comment}
                       onChange={(e) => setNewComment({...newComment, comment: e.target.value})}
                       required
                   />
                   <button type="submit">Envoyer le commentaire</button>
               </form>

               <div className="comments-list">
                   {comments.map(comment => (
                       <div key={comment._id} className="comment">
                           <div className="comment-header">
                               <h4>{comment.name}</h4>
                               <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                           </div>
                           <p>{comment.comment}</p>
                       </div>
                   ))}
               </div>
           </div>
       </>
   );
};

export default TestimonialCard;