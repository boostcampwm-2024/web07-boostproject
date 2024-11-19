import { Button, CreateQuestionModal } from '@/components';
import QuestionItem from '@/components/qna/QuestionItem';
import { useModal } from '@/features/modal';
import { useSessionStore } from '@/features/session';
import { useQnAContext } from '@/features/session/qna';

function QuestionList() {
  const { questions } = useSessionStore();

  const { Modal, openModal } = useModal(<CreateQuestionModal />);

  const { handleSelectQuestionId } = useQnAContext();

  const sortedQuestions = questions.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (a.closed && !b.closed) return 1;
    if (!a.closed && b.closed) return -1;
    if (a.likesCount > b.likesCount) return -1;
    if (a.likesCount < b.likesCount) return 1;
    return 0;
  });

  const pinnedQuestions = sortedQuestions.filter(
    (question) => question.pinned && !question.closed,
  );

  const unpinnedQuestions = sortedQuestions.filter(
    (question) => !question.pinned && !question.closed,
  );

  const closedQuestions = sortedQuestions.filter((question) => question.closed);

  return (
    <>
      <div className='inline-flex h-full w-4/5 flex-grow flex-col items-center justify-start rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>질문 목록</div>
          <Button className='bg-indigo-600' onClick={openModal}>
            <div className='text-sm font-bold text-white'>질문하기</div>
          </Button>
        </div>
        <div className='inline-flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto px-8 py-4'>
          {pinnedQuestions.map((question) => (
            <QuestionItem
              key={question.questionId}
              question={question}
              onQuestionSelect={() => {
                handleSelectQuestionId(question.questionId);
              }}
            />
          ))}
          {pinnedQuestions.length > 0 && (
            <hr className='mb-4 mt-4 w-full rounded-3xl border-t-[1px] border-indigo-200' />
          )}
          {unpinnedQuestions.map((question) => (
            <QuestionItem
              key={question.questionId}
              question={question}
              onQuestionSelect={() => {
                handleSelectQuestionId(question.questionId);
              }}
            />
          ))}
          {closedQuestions.length > 0 && (
            <hr className='mb-4 mt-4 w-full rounded-3xl border-t-[1px] border-indigo-200' />
          )}
          {closedQuestions.map((question) => (
            <QuestionItem
              key={question.questionId}
              question={question}
              onQuestionSelect={() => {
                handleSelectQuestionId(question.questionId);
              }}
            />
          ))}
        </div>
      </div>
      {Modal}
    </>
  );
}

export default QuestionList;
