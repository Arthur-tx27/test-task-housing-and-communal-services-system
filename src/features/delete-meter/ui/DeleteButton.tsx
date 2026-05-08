import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
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
      className="delete-button"
      type="button"
      disabled={store.metersStore.isLoading}
      onClick={() => store.deleteMeter(meterId)}
    >
      <TrashIcon src="/icons/trash.svg" alt="Удалить" />
    </StyledDeleteButton>
  );
});
