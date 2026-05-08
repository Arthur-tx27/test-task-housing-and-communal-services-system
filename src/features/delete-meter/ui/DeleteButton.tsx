import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';

interface DeleteButtonProps {
  meterId: string;
}

export const DeleteButton = observer(function DeleteButton({
  meterId,
}: DeleteButtonProps) {
  const store = useRootStore();

  return (
    <button
      type="button"
      disabled={store.metersStore.isLoading}
      onClick={() => store.deleteMeter(meterId)}
    >
      <img src="/icons/trash.svg" alt="Удалить" width={20} height={20} />
    </button>
  );
});
