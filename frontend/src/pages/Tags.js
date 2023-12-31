import React, { useState, useEffect, useContext } from 'react';
import { QuestionsContext } from '../context/QuestionsContext';
import { Link } from 'react-router-dom';

const Tags = () => {
  const { fetchTags, tags, fetchQuestions } = useContext(QuestionsContext);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const [selectedTag, setSelectedTag] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    // Fetch questions related to the selected tag using fetchQuestions function
    fetchQuestions(tag.id)
      .then((response) => {
        console.log('API Response:', response)
        // Update the state with the fetched questions
        setQuestions(response);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  };
  

  return (
    <>
      {/* Intro to Tags section */}
      <div className='gap-4 mx-20 py-10'>
        <h2 className="text-4xl font-extrabold dark:text-white">Tags</h2>
        <p className="my-4 text-lg">A tag is a keyword or label that categorizes your question with other, similar questions.</p>
      </div>

      {/* Cards section to be fetched from the backend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mx-20 py-10">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <div className='mb-2' key={tag.id}>
              <Link to={`/ViewTag/${tag.id}`}
                // href="#"
                className={`text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  inline-flex items-center px-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ${selectedTag === tag ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name} 
              </Link>
              <p className='text-gray-600 text-sm font-medium'>{tag.questions.length} questions</p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{tag.description}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Render the related questions */}
      {selectedTag && questions.length > 0 ? (
        <div>
          <h3>Questions related to {selectedTag.name}:</h3>
          {questions.map((question) => (
            <div key={question.id}>
              <h4>{question.title}</h4>
              <p>{question.body}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Tags;
