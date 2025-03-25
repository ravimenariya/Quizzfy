import PageTitle from "./PageTitle";
import FilterSection from "./FilterSection";
import QuizList from "./QuizList";

const MainContent = ({ isListView, toggleView }) => {
  return (
      <main className="flex-1 ml-0 lg:ml-48 p-5 dark:bg-gray-900 transition-colors duration-200">
          <PageTitle />
          <FilterSection toggleView={toggleView} isListView={isListView} />
          <QuizList isListView={isListView} />
      </main>
  );
};
export default MainContent;
