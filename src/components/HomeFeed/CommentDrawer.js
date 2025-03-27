import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentDrawer = ({ postId, isOpen, onClose }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchComments();
        }
    }, [isOpen]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comments/?post=${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            try {
                const response = await axios.post('/api/comments/', {
                    post: postId,
                    content: newComment,
                });
                setComments((prev) => [response.data, ...prev]);
                setNewComment('');
            } catch (error) {
                console.error('Failed to post comment:', error);
            }
        }
    };

    return (
        <div className={`comment-drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer-header">
                <h3>Comments</h3>
                <button onClick={onClose}>×</button>
            </div>
            <div className="comment-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <strong>{comment.user_name}</strong>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="comment-input">
                <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                    Post
                </button>
            </div>
        </div>
    );
};

export default CommentDrawer;
