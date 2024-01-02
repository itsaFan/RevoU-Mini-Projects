import { Breadcrumb } from "flowbite-react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function BreadcrumbNav() {
  const location = useLocation();
  const params = useParams();
  const forumTitle = params.title;
  const forumId = params.forumId;
  const forumPage = params.page;
  const postTitle = params.postTitle;
  const postPage = params.postPage;

  const displayForum = location.pathname === `/forum/${forumTitle}/${forumId}/${forumPage}`;
  const displayPost = location.pathname === `/forum/post/${postTitle}/${postPage}`;

  return (
    <Breadcrumb aria-label="Navigation breadcrumb" className="bg-secondary-navy px-5 py-3 ">
      <Breadcrumb.Item>
        <Link to="/" className="text-white">
          Home
        </Link>
      </Breadcrumb.Item>
      {displayForum && (
        <Breadcrumb.Item>
          <Link to={`/forum/${forumTitle}/${forumId}/${forumPage}`} className="text-white">
            Forum
          </Link>
        </Breadcrumb.Item>
      )}
      {displayPost && (
        <>
          <Breadcrumb.Item>
            <Link to={`/forum/post/${postTitle}/${postPage}`} className="text-white">
              Posts
            </Link>
          </Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
}
