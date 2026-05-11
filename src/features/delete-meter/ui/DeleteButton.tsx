import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/app/providers/useRootStore';
import { DELETE_BUTTON_CLASS } from '@/shared/constants/cssClasses';
import { StyledDeleteButton, TrashIcon } from './DeleteButton.styles';

interface DeleteButtonProps {
  meterId: string;
}

export const DeleteButton = observer(function DeleteButton({
  meterId,
}: DeleteButtonProps) {
  const store = useRootStore();

  return (
    <StyledDeleteButton
      className={DELETE_BUTTON_CLASS}
      type="button"
      disabled={store.metersStore.isLoading}
      onClick={() => store.deleteMeter(meterId)}
    >
      <TrashIcon />
    </StyledDeleteButton>
  );
});
