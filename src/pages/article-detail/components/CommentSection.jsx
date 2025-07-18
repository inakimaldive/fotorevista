import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentSection = ({ comments: initialComments, articleId }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: {
        name: 'Usuario Invitado',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      author: {
        name: 'Usuario Invitado',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      content: replyText,
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setReplyText('');
    setReplyTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { 
                      ...reply, 
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      ));
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `hace ${minutes} min`;
    if (hours < 24) return `hace ${hours}h`;
    return `hace ${days}d`;
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'popular':
        return b.likes - a.likes;
      default:
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-surface border border-border rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-heading font-semibold text-text-primary">
            Comentarios ({comments.length})
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-border rounded-md px-2 py-1 bg-surface text-text-primary"
            >
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="popular">Más populares</option>
            </select>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-3">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Tu avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Escribe tu comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">
                  Sé respetuoso y constructivo en tus comentarios
                </p>
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={!newComment.trim()}
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Comentar
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {sortedComments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              {/* Main Comment */}
              <div className="flex space-x-3">
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-primary">
                        {comment.author.name}
                      </h4>
                      <span className="text-xs text-text-secondary">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-text-primary leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  
                  {/* Comment Actions */}
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center space-x-1 text-sm transition-smooth ${
                        comment.isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'
                      }`}
                    >
                      <Icon name="Heart" size={14} className={comment.isLiked ? 'fill-current' : ''} />
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="text-sm text-text-secondary hover:text-accent transition-smooth"
                    >
                      <Icon name="MessageCircle" size={14} className="mr-1" />
                      Responder
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyTo === comment.id && (
                    <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-3">
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          placeholder="Escribe tu respuesta..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="sm" disabled={!replyText.trim()}>
                          <Icon name="Send" size={14} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setReplyTo(null)}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-3 ml-6">
                          <Image
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="bg-background rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="text-sm font-medium text-text-primary">
                                  {reply.author.name}
                                </h5>
                                <span className="text-xs text-text-secondary">
                                  {formatTimeAgo(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-text-primary leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3 mt-1">
                              <button
                                onClick={() => handleLike(reply.id, true, comment.id)}
                                className={`flex items-center space-x-1 text-xs transition-smooth ${
                                  reply.isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'
                                }`}
                              >
                                <Icon name="Heart" size={12} className={reply.isLiked ? 'fill-current' : ''} />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Comments */}
        {comments.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              <Icon name="ChevronDown" size={16} className="mr-2" />
              Cargar más comentarios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;