'use client';

import {useStoreModal} from '@/hooks/use-store-modal';
import Modal from '@/components/ui/modal';

export const StoreModal = () => {
  const {isOpen, onClose} = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Some Store description"
      isOpen={isOpen}
      onClose={onClose}
    >
      Future create store form
    </Modal>
  );
};
