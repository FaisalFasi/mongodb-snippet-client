import SnippetCreationForm from "./SnippetCreationForm";
import SnippetList from "./SnippetList";

function Home() {
  return (
    <div>
      <h1>Welcome Home </h1>
      <SnippetCreationForm />
      <SnippetList />
    </div>
  );
}

export default Home;
