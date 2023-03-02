import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "../../store/pages";
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import './ShowPage.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import EditPage from "../Edit/EditPage";
import LikePage from "../Likes/Like";
import like from "../../images/like.png"


function ShowPage() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  let page = useSelector((state) => state && state.pages ? state.pages : null);
  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    dispatch(fetchPage(pageId))
  }, [isEditing, pageId, dispatch])



  if (isEditing) {
    return <EditPage page={page} isUpdating={true} setIsEditing={setIsEditing} />;
  }

  // const profileLink = () => {
  //   return "/profile/" + page.author._id;
  // }

  const toProfilePage = (e) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/profile/${page.author._id}`;
    }
  }

  const hasEditButton = (
    <div className="buttons">
      <DeleteButton pageId={page.id}  className="pic-buttons"/>
      <button id="editPageButton" onClick={handleUpdateClick} className="pic-buttons">Edit</button>
      <LikePage pageId={pageId} src={like} className="likeButton pic-buttons" />
    </div>
  )

  const hasNoEditButton = (
    <div className="buttons">
      <DeleteButton pageId={page.id} className="pic-buttons"/>
      <LikePage pageId={pageId} src={like} className="likeButton pic-buttons" />
    </div>
  )

  return page.author && (
    <div className="page-container">
      <div className="page">
        <div id="pics">
          <img src={page.imageUrl} alt={page.title} />
          <div className="buttons-container">
            {page.author._id === currentUser._id ? hasEditButton : hasNoEditButton}
          </div>

        </div>

        <div id="textz">
          <h1>{page.title}</h1>
          <hr />
          <div className="profile-link" onClick={toProfilePage}>
            👤 <span className="profile-link-text"> {page.author.username}</span>
          </div>
          <p>{page.description}</p>

        </div>

      </div>
    </div>
  );

}



export default ShowPage;