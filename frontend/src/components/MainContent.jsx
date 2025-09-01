import PageTitle from "./PageTitle";
import FilterSection from "./FilterSection";
import QuizList from "./QuizList";

const MainContent = ({ isListView, toggleView }) => {
  return (
    <main className="flex-1 min-h-full  border-red-800 border-0  p-5 dark:bg-gray-900 transition-colors duration-200">
      <PageTitle />
      {/* <FilterSection toggleView={toggleView} isListView={isListView} /> */}
      <QuizList isListView={isListView} />
    </main>
  );
};
export default MainContent;
