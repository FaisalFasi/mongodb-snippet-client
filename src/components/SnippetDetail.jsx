import { useParams } from "react-router-dom";

function SnippetDetail() {
  let { snippet_id } = useParams();
  return <h1>SNIPPET_ID: {snippet_id}</h1>;
}

export default SnippetDetail;
