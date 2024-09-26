import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";
import axiosInstance from "../../utils/axiosInstance";
import "./Blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editBlog, setEditBlog] = useState({});
  const [addShow, setAddShow] = useState(false);
  const [newBlog, setNewBlog] = useState({ headline: "", date: "", text: "", fullText: "" });
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Fetch blogs from the server
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axiosInstance.get("/blogs");
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  // Monitor localStorage for logout
  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedInUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleShow = (blog) => {
    setSelectedBlog(blog);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleEditShow = (blog) => {
    setEditBlog(blog);
    setEditShow(true);
  };

  const handleEditClose = () => setEditShow(false);

  const handleEditChange = (e) => {
    setEditBlog({ ...editBlog, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const updatedBlogs = blogs.map((blog) => (blog.id === editBlog.id ? editBlog : blog));
    setBlogs(updatedBlogs);
    await axiosInstance.put(`/blogs/${editBlog.id}`, editBlog);
    setEditShow(false);
  };

  const handleDelete = async (id) => {
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(filteredBlogs);
    await axiosInstance.delete(`/blogs/${id}`);
  };

  const handleBackToBlog = () => setShow(false);

  const handleAddShow = () => setAddShow(true);

  const handleAddClose = () => setAddShow(false);

  const handleNewBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleAddNewBlog = async () => {
    const blogToAdd = { ...newBlog, id: Date.now(), userId: loggedInUser.id, userName: loggedInUser.firstName };
    const updatedBlogs = [...blogs, blogToAdd];
    setBlogs(updatedBlogs);
    await axiosInstance.post("/blogs", blogToAdd);
    setAddShow(false);
  };

  return (
    <div className="blog-container">
      <div className="header">
        <h1 className="page-title">Blogs</h1>
        {loggedInUser && (
          <Button variant="primary" onClick={handleAddShow}>Add New Blog</Button>
        )}
      </div>

      <div className="blogs-list">
        {blogs.map((blog) => (
          <Card className="blog-card mb-4" key={blog.id}>
            <Card.Body>
              <h4 className="card-title">{blog.headline}</h4>
              <h6 className="text-muted">Posted by {blog.userName} on {blog.date}</h6>
              <p>{blog.text}</p>
              <div className="blog-buttons">
                <Button variant="link" className="btn-link" onClick={() => handleShow(blog)}>
                  Read More
                </Button>
                {loggedInUser?.id === blog.userId && (
                  <>
                    <Button variant="outline-primary" className="edit-btn" onClick={() => handleEditShow(blog)}>Edit</Button>
                    <Button variant="outline-danger" className="delete-btn" onClick={() => handleDelete(blog.id)}>Delete</Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Read More Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{selectedBlog?.headline}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-muted">{selectedBlog?.date}</h6>
          <p>{selectedBlog?.fullText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleBackToBlog}>Back to Blog</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Blog Modal */}
      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHeadline">
              <Form.Label>Headline</Form.Label>
              <Form.Control
                type="text"
                name="headline"
                value={editBlog.headline}
                onChange={handleEditChange}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={editBlog.date}
                onChange={handleEditChange}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Label>Summary Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="text"
                value={editBlog.text}
                onChange={handleEditChange}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formFullText">
              <Form.Label>Full Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="fullText"
                value={editBlog.fullText}
                onChange={handleEditChange}
                className="input-field"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Update Blog</Button>
        </Modal.Footer>
      </Modal>

      {/* Add New Blog Modal */}
      <Modal show={addShow} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHeadline">
              <Form.Label>Headline</Form.Label>
              <Form.Control
                type="text"
                name="headline"
                value={newBlog.headline}
                onChange={handleNewBlogChange}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={newBlog.date}
                onChange={handleNewBlogChange}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Label>Summary Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="text"
                value={newBlog.text}
                onChange={handleNewBlogChange}
                className="input-field"
              />
            </Form.Group>

            <Form.Group controlId="formFullText">
              <Form.Label>Full Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="fullText"
                value={newBlog.fullText}
                onChange={handleNewBlogChange}
                className="input-field"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>Close</Button>
          <Button variant="primary" onClick={handleAddNewBlog}>Add Blog</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blog;
