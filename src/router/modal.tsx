import { ReactNode } from 'react';
import { Modal } from '@components';
import { useNavigate } from 'react-router-dom';

export type TRModalProps = {
  title: string;
  children?: ReactNode;
  backUrl?: string;
};

export const RModal = ({ title, children, backUrl }: TRModalProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        title={title}
        onClose={() => {
          if (backUrl) {
            navigate(backUrl);
          } else {
            navigate(-1);
          }
        }}
      >
        {children}
      </Modal>
    </>
  );
};
