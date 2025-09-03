import PageTitle from "./PageTitle";
import FilterSection from "./FilterSection";
import QuizList from "./QuizList";

const MainContent = ({ isListView, toggleView }) => {
  return (
    <main className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageTitle />
        <QuizList isListView={isListView} />
      </div>
    </main>
  );
};
export default MainContent;
