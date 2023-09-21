import SnippetCreationForm from "./SnippetCreationForm";
import SnippetList from "./SnippetList";

function Home() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Welcome to FR-PasteBin{" "}
      </h1>
      <SnippetCreationForm />
      <SnippetList />
    </div>
  );
}

export default Home;
