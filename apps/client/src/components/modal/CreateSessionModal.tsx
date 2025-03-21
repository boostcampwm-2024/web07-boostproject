import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { useModalContext } from '@/features/modal';
import { postSession } from '@/features/session/session.api';
import { useToastStore } from '@/features/toast';

import Button from '@/components/Button';
import InputField from '@/components/modal/InputField';
import Modal from '@/components/modal/Modal';

function CreateSessionModal() {
  const addToast = useToastStore((state) => state.addToast);

  const { closeModal } = useModalContext();

  const [sessionName, setSessionName] = useState('');

  const navigate = useNavigate();

  const { mutate: postSessionQuery, isPending } = useMutation({
    mutationFn: postSession,
    onSuccess: (res) => {
      closeModal();
      addToast({
        type: 'SUCCESS',
        message: `세션(${sessionName})이 생성되었습니다.`,
        duration: 3000,
      });
      navigate({
        to: '/session/$sessionId',
        params: { sessionId: res.sessionId },
      });
    },
    onError: console.error,
  });

  const enableCreateSession = sessionName.trim().length >= 3 && sessionName.trim().length <= 20;

  const handleCreateSession = () => {
    if (!enableCreateSession || isPending) return;
    postSessionQuery({ title: sessionName });
  };

  return (
    <Modal>
      <div className='flex h-fit flex-col items-center justify-start gap-4 self-stretch rounded p-4'>
        <div className='font-header text-2xl'>
          <span className='text-indigo-600'>A</span>
          <span className='text-black'>sk-It</span>
        </div>
        <InputField
          label='세션 이름'
          type='text'
          value={sessionName}
          onChange={setSessionName}
          validationStatus={{
            status: sessionName.trim().length === 0 || enableCreateSession ? 'INITIAL' : 'INVALID',
            message: enableCreateSession ? '세션 이름을 입력해주세요' : '세션 이름은 3자 이상 20자 이하로 입력해주세요',
          }}
          placeholder='세션 이름을 입력해주세요'
        />
      </div>
      <div className='mt-4 inline-flex items-start justify-start gap-2.5'>
        <Button className='bg-gray-500' onClick={closeModal}>
          <div className='w-[150px] text-sm font-medium text-white'>취소하기</div>
        </Button>
        <Button
          className={`transition-colors duration-200 ${enableCreateSession ? 'bg-indigo-600' : 'cursor-not-allowed bg-indigo-300'}`}
          onClick={handleCreateSession}
        >
          <div className='w-[150px] text-sm font-medium text-white'>세션 생성하기</div>
        </Button>
      </div>
    </Modal>
  );
}

export default CreateSessionModal;
