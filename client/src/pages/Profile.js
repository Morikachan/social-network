import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createPost, getPosts } from "../redux/actions/userActions";

function Profile() {
  const [postText, setPostText] = useState("");
  const { user, posts } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  console.log(posts);

  const formSubmit = (e) => {
    e.preventDefault();
    if (postText.length === 0) {
      return;
    }
    dispatch(createPost(postText));
    setPostText('')
  };

  return (
    <div>
      <p>{user.login}</p>
      {!user.isVerified && <div>Verify your account, please</div>}

      <form onSubmit={formSubmit}>
        <textarea
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          placeholder="Type here..."
        />
        <button>Create</button>
      </form>

      {posts.map((post) => {
        const fullDate = new Date(post.createdAt)
        const date = fullDate.toLocaleDateString().split('/').join('.')
        const hours = fullDate.getHours()
        const minutes = fullDate.getMinutes()
        const time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`

        return (
          <div key={post._id}>
            <div className="post_header">
              {post.author.login}
              {date} - {time}
              {/* date, avatar */}
            </div>
            <div className="post_body">{post.text}</div>
            <div className="post_footer">&#x2661; {post.likes.length}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
